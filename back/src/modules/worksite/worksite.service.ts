import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';
import { AdminService } from '../admins/admins.service';
import { MeModel } from '../admins/admins.model';

@Injectable()
export class WorksiteService {
  constructor(private readonly worksiteReposisory: WorksiteRepository, private readonly adminService: AdminService) {}

  public async getWorksites(): Promise<WorksiteModel[]> {
    return this.worksiteReposisory.getWorksites();
  }

  public async getWorksiteById(id: string): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.getWorksiteById(id);
  }

  public async createWorksite(
    admin: CreateWorksiteDto,
    req
  ): Promise<CreateWorksiteModel> {
    const infoMe = await this.adminService.getMeFromToken(req);
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
