import { Injectable } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';

@Injectable()
export class WorksiteService {
  constructor(private readonly worksiteReposisory: WorksiteRepository) {}

  public async getWorksites(): Promise<WorksiteModel[]> {
    return this.worksiteReposisory.getWorksites();
  }

  public async getWorskiteById(id: string): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.getWorksiteById(id);
  }

  public createWorskite(
    Admin: CreateWorksiteDto,
  ): Promise<CreateWorksiteModel> {
    return this.worksiteReposisory.createWorksite(Admin);
  }

  public changeRespoChantier(
    change: ChangeRespoChantierDto,
  ): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.changeRespoChantier(change);
  }
}
