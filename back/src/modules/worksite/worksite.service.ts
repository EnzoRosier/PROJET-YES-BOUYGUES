import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';
import { AdminService } from '../admins/admins.service';
import { MeModel } from '../admins/admins.model';
import { WorksiteEntity } from '../database/entities/worksite.entity';

@Injectable()
export class WorksiteService {
  constructor(private readonly worksiteReposisory: WorksiteRepository,
    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
  ) {}

  public async getWorksites(): Promise<WorksiteModel[]> {
    return this.worksiteReposisory.getWorksites();
  }

  public async getWorksiteById(id: string): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.getWorksiteById(id);
  }

  public async getWorksiteEntityRefById(id: string): Promise<WorksiteEntity | undefined> {
    return this.worksiteReposisory.getWorksiteEntityRefById(id);
  }

  public async createWorksite(
    admin: CreateWorksiteDto,
    req
  ): Promise<CreateWorksiteModel> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const infoMe = await this.adminService.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return this.worksiteReposisory.createWorksite(admin);
  }

  public changeRespoChantier(
    change: ChangeRespoChantierDto,
  ): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.changeRespoChantier(change);
  }
}
