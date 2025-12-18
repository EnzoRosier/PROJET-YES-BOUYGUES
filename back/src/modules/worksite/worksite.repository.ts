import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WorksiteEntity } from '../database/entities/worksite.entity';
import { WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';
import { AdminEntity } from '../database/entities/admin.entity';

@Injectable()
export class WorksiteRepository {
  private readonly worksiteRepository =
    this.dataSource.getRepository(WorksiteEntity);
  private readonly adminRepository = this.dataSource.getRepository(AdminEntity);

  constructor(private readonly dataSource: DataSource) {}

  private worksites: WorksiteModel[] = [];

  //liste des worksites
  public async getWorksites(): Promise<WorksiteModel[]> {
    return this.worksiteRepository.find({ relations: { respoChantier: true } });
  }
  //récupère un worksite par son ID
  public async getWorksiteById(id: string): Promise<WorksiteModel | null> {
    return this.worksiteRepository.findOneOrFail({
      where: { id },
      relations: { respoChantier: true },
    });
  }

  //création d'un worksite
  public async createWorksite(
    worksite: CreateWorksiteDto,
  ): Promise<WorksiteModel> {
    let admin = undefined;

    if (typeof worksite.adminId === 'string') {
      admin = await this.adminRepository.findOneOrFail({
        where: { id: worksite.adminId },
      });
    }

    const newAdmin = this.worksiteRepository.create({
      nom: worksite.nom,
      addresse: worksite.addresse,
      description: worksite.description,
      dateFin: worksite.dateFin,
      nomClient: worksite.nomClient,
      nomRespoSec: worksite.nomRespoSec,
      nbCollaborateur: worksite.nbCollaborateur,
      joursSansAccident: worksite.joursSansAccident,
      respoChantier: admin,
    });
    const returnedAdmin = this.worksiteRepository.save(newAdmin);

    return returnedAdmin;
  }

  public async changeRespoChantier(
    change: ChangeRespoChantierDto,
  ): Promise<WorksiteModel> {
    if (typeof change.idAdmin !== 'string') {
      throw new BadRequestException('adminID not specified');
    }

    if (typeof change.idWorksite !== 'string') {
      throw new BadRequestException('worksiteID not specified');
    }

    const admin = await this.adminRepository.findOneOrFail({
      where: { id: change.idAdmin },
    });

    const worksite = await this.worksiteRepository.findOneOrFail({
      where: { id: change.idWorksite },
      relations: { respoChantier: true },
    });

    worksite.respoChantier = admin;
    return this.worksiteRepository.save(worksite);
  }
}
