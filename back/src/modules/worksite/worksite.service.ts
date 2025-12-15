import { Injectable } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksitenDto } from './worksite.dto';

@Injectable()
export class WorksiteService {
  constructor(private readonly worksiteReposisory: WorksiteRepository) {}

  public async getAdmins(): Promise<WorksiteModel[]> {
    return this.worksiteReposisory.getWorksites();
  }

  public async getAdminById(id: string): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.getWorksiteById(id);
  }

  public createAdmin(Admin: CreateWorksitenDto): Promise<CreateWorksiteModel> {
    return this.worksiteReposisory.createAdmin(Admin);
  }

  public changeRespoChantier(
    change: ChangeRespoChantierDto,
  ): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.changeRespoChantier(change);
  }
}
