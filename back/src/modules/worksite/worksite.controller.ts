import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto, ResetJourAccidentDto, SetCurrentWorksiteDto } from './worksite.dto';
import { WorksiteService } from './worksite.service';
import { AppConfigModel } from '../appconfig/appconfig.model';

@Controller('worksite')
export class WorksiteController {
  constructor(private readonly worksiteService: WorksiteService) {}

  //REquete qui Recup list des worksite
  @Get()
  public async listWorksite(): Promise<WorksiteModel[]> {
    return this.worksiteService.getWorksites();
  }
  
  //REquete pour cree un worksite
  @Post('new')
  public async createWorksite(
    @Body() input: CreateWorksiteDto,
    @Req() req
  ): Promise<CreateWorksiteModel> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.worksiteService.createWorksite(input, req);
  }

  //REquete qui set le worksite choisis
  @Post('currentWorksite')
  public async setCurrWorksite(
    @Body() input: SetCurrentWorksiteDto,
    @Req() req
  ): Promise<AppConfigModel> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.worksiteService.setCurrWorksite(input, req);
  }

  //REquete qui recup le worksite choisis
  @Get('currentWorksite')
  public async getCurrWorksite(): Promise<AppConfigModel | null> {
    return this.worksiteService.getCurrWorksite();
  }

  //Requete qui permet de changer les respos du site
  @Post('changeRespo')
  public async changeRespoChantier(
    @Body() input: ChangeRespoChantierDto,
    @Req() req
  ): Promise<WorksiteModel> {
    return this.worksiteService.changeRespoChantier(input, req);
  }

  //REquete qui reset les jours sans accident d'un site
  @Get('resetAccident/:id')
  public async resetJourAccident(
    @Param('id') id: string,
    @Req() req
  ): Promise<WorksiteModel | null> {
    return this.worksiteService.resetJourAccident(id, req);
  }

  //Requete qui recupere les infos d'un site grace a son id
  @Get(':id')
  public async getWorksiteById(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteService.getWorksiteById(id);
  }
}
