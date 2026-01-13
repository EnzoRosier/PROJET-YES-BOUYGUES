import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto, ResetJourAccidentDto, SetCurrentWorksiteDto } from './worksite.dto';
import { AdminService } from '../admins/admins.service';
import { MeModel } from '../admins/admins.model';
import { WorksiteEntity } from '../database/entities/worksite.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppConfigService } from '../appconfig/appconfig.service';
import { AppConfigModel } from '../appconfig/appconfig.model';

@Injectable()
export class WorksiteService implements OnModuleInit{
  constructor(private readonly worksiteReposisory: WorksiteRepository,
    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
    private appConfigService: AppConfigService
  ) {}

  async onModuleInit() {
    const exist = await this.appConfigService.getValue("initialized")
    if (!exist) {
      await this.appConfigService.create({key:"initialized", value:"true"})
      await this.appConfigService.create({key:"currWorksite", value:null})
    }
  }

  async setCurrWorksite(input: SetCurrentWorksiteDto, req): Promise<AppConfigModel> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const infoMe = await this.adminService.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return await this.appConfigService.set({key:"currWorksite", value:input.worksiteId})
  }

  async getCurrWorksite(): Promise<AppConfigModel> {
    return await this.appConfigService.getValue("currWorksite")
  }

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

  public async changeRespoChantier(
    change: ChangeRespoChantierDto,
    req
  ): Promise<WorksiteModel | undefined> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const infoMe = await this.adminService.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return this.worksiteReposisory.changeRespoChantier(change);
  }

  public async resetJourAccident(
    input: string,
    req
  ): Promise<WorksiteModel | undefined> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const infoMe = await this.adminService.getMeFromToken(token);
    return this.worksiteReposisory.changeAccident(input, 0);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async updateJourAccident() {
    console.log("Update jour sans accident")
    let worksites = await this.getWorksites()
    worksites.forEach(worksite => {
      this.worksiteReposisory.changeAccident(worksite.id, worksite.joursSansAccident + 1)
    }); 
  }
}
