import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksiteDto } from './worksite.dto';

@Controller('worksite')
export class WorksiteController {
  constructor(private readonly worksiteRepository: WorksiteRepository) {}

  @Get()
  public async listWorksite(): Promise<WorksiteModel[]> {
    return this.worksiteRepository.getWorksites();
  }

  @Post('new')
  public async createWorksite(
    @Body() input: CreateWorksiteDto,
  ): Promise<CreateWorksiteModel> {
    return this.worksiteRepository.createWorksite(input);
  }

  @Post('changeRespo')
  public async changeRespoChantier(
    @Body() input: ChangeRespoChantierDto,
  ): Promise<WorksiteModel> {
    return this.worksiteRepository.changeRespoChantier(input);
  }

  @Get(':id')
  public async getWorksiteById(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteRepository.getWorksiteById(id);
  }
}
