import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorksiteRepository } from './worksite.repository';
import { CreateWorksiteModel, WorksiteModel } from './worksite.model';
import { ChangeRespoChantierDto, CreateWorksitenDto } from './worksite.dto';

@Controller('worksite')
export class WorksiteController {
  constructor(private readonly worksiteRepository: WorksiteRepository) {}

  @Get()
  public async listAdmins(): Promise<WorksiteModel[]> {
    return this.worksiteRepository.getWorksites();
  }

  @Post('new')
  public async createAdmin(
    @Body() input: CreateWorksitenDto,
  ): Promise<CreateWorksiteModel> {
    return this.worksiteRepository.createAdmin(input);
  }

  @Post('changeRespo')
  public async changeRespoChantier(
    @Body() input: ChangeRespoChantierDto,
  ): Promise<WorksiteModel> {
    return this.worksiteRepository.changeRespoChantier(input);
  }

  @Get(':id')
  public async getAdmin(
    @Param('id') id: string,
  ): Promise<WorksiteModel | null> {
    return this.worksiteRepository.getWorksiteById(id);
  }
}
