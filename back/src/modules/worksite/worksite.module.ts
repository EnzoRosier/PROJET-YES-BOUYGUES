import { Module } from '@nestjs/common';
import { WorksiteController } from './worksite.controller';
import { WorksiteService } from './worksite.service';
import { WorksiteRepository } from './worksite.repository';

@Module({
  imports: [],
  controllers: [WorksiteController],
  providers: [WorksiteService, WorksiteRepository],
})
export class WorksiteModule {}
