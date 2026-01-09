import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto, ResetJourAccidentDto, SetCurrentWorksiteDto } from './worksite.dto';
import { WorksiteService } from './worksite.service';
import { AppConfigModel } from '../appconfig/appconfig.model';

@Controller('worksite')
export class WorksiteController {
  constructor(private readonly worksiteService: WorksiteService) {}

  @Get()
  public async listWorksite(): Promise<WorksiteModel[]> {
    return this.worksiteService.getWorksites();
  }

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

  @Get('currentWorksite')
  public async getCurrWorksite(): Promise<AppConfigModel | null> {
    return this.worksiteService.getCurrWorksite();
  }

  @Post('changeRespo')
  public async changeRespoChantier(
    @Body() input: ChangeRespoChantierDto,
  ): Promise<WorksiteModel> {
    return this.worksiteService.changeRespoChantier(input);
  }

  @Get('resetAccident/:id')
  public async resetJourAccident(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteService.resetJourAccident(id);
  }

  @Get(':id')
  public async getWorksiteById(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteService.getWorksiteById(id);
  }
}
