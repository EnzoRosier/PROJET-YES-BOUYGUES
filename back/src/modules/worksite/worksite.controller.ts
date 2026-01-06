import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';
import { WorksiteService } from './worksite.service';

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

  @Post('changeRespo')
  public async changeRespoChantier(
    @Body() input: ChangeRespoChantierDto,
  ): Promise<WorksiteModel> {
    return this.worksiteService.changeRespoChantier(input);
  }

  @Get(':id')
  public async getWorksiteById(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteService.getWorksiteById(id);
  }
}
