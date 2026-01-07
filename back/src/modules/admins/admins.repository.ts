import { Injectable } from '@nestjs/common';
import { AdminModel, CreateAdminModel } from './admins.model';
import { CreateAdminDto } from './admins.dto';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../database/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { WorksiteEntity } from '../database/entities/worksite.entity';

@Injectable()
export class AdminRepository {
  private readonly adminRepository = this.dataSource.getRepository(AdminEntity);

  constructor(private readonly dataSource: DataSource) {}

  private admins: AdminModel[] = [];

  //liste des admins
  public async getAdmins(): Promise<AdminModel[]> {
    return this.adminRepository.find({
      relations: {
        worksites: true,
      }
    });
  }
  //récupère un admin par son ID
  public async getAdminById(id: string): Promise<AdminModel | null> {
    return this.adminRepository.findOneOrFail({
      where: { id },
      relations: {
        worksites: true,
      }
    });
  }

  //création d'un admin
  public async createAdmin(admin: CreateAdminModel, worksistes: WorksiteEntity[]): Promise<AdminModel> {
    // Maintenant on peut créer une nouvelle entrée d'un admin et la sauvegarder

    const saltRounds=12;
    const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
    //var hashedPassword = admin.password;

    const newAdmin = this.adminRepository.create({
      mail: admin.mail,
      password: hashedPassword,
      firstName: admin.firstName,
      lastName: admin.lastName,
      isSuperAdmin: admin.isSuperAdmin,
      worksites: worksistes
    });
    const returnedAdmin = this.adminRepository.save(newAdmin);

    return returnedAdmin;
  }
  public async findByMail(mail: string) {
    return this.adminRepository.findOne({
      where: { mail },
    });
  }
}
