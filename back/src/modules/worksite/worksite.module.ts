import { Module } from '@nestjs/common';
import { WorksiteController } from './worksite.controller';
import { WorksiteService } from './worksite.service';
import { WorksiteRepository } from './worksite.repository';
import { AdminService } from '../admins/admins.service';
import { AdminRepository } from '../admins/admins.repository';
import { AdminModule } from '../admins/admins.module';

@Module({
  imports: [AdminModule],
  controllers: [WorksiteController],
  providers: [WorksiteService, WorksiteRepository],
})
export class WorksiteModule {}
