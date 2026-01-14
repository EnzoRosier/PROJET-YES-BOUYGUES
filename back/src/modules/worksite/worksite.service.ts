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

  //Cree app config au demarage
  async onModuleInit() {
    const exist = await this.appConfigService.getValue("initialized")
    if (!exist) {
      await this.appConfigService.create({key:"initialized", value:"true"})
      await this.appConfigService.create({key:"currWorksite", value:null})
    }
  }

  //Set worksite choisis
  async setCurrWorksite(input: SetCurrentWorksiteDto, req): Promise<AppConfigModel> {
    //Check si logged super admin
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

  //Recupere worksite choisis
  async getCurrWorksite(): Promise<AppConfigModel> {
    return await this.appConfigService.getValue("currWorksite")
  }

  //Recup tous les worksites
  public async getWorksites(): Promise<WorksiteModel[]> {
    return this.worksiteReposisory.getWorksites();
  }

  //Recup worksite par son id
  public async getWorksiteById(id: string): Promise<WorksiteModel | undefined> {
    return this.worksiteReposisory.getWorksiteById(id);
  }

  //recup entite par son id
  public async getWorksiteEntityRefById(id: string): Promise<WorksiteEntity | undefined> {
    return this.worksiteReposisory.getWorksiteEntityRefById(id);
  }

  //Cree worksite
  public async createWorksite(
    admin: CreateWorksiteDto,
    req
  ): Promise<CreateWorksiteModel> {
    //check logged super admin
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

  //Change respo
  public async changeRespoChantier(
    change: ChangeRespoChantierDto,
    req
  ): Promise<WorksiteModel | undefined> {
    //Check logged super admin
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

  //Reset jours sans accident
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

  //update jour sans accident tout les jours a 1h 
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async updateJourAccident() {
    console.log("Update jour sans accident")
    let worksites = await this.getWorksites()
    worksites.forEach(worksite => {
      this.worksiteReposisory.changeAccident(worksite.id, worksite.joursSansAccident + 1)
    }); 
  }
}
