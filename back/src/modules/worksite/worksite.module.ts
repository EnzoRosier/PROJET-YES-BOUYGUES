import { forwardRef, Module } from '@nestjs/common';
import { WorksiteController } from './worksite.controller';
import { WorksiteService } from './worksite.service';
import { WorksiteRepository } from './worksite.repository';
import { AdminService } from '../admins/admins.service';
import { AdminRepository } from '../admins/admins.repository';
import { AdminModule } from '../admins/admins.module';
import { AppConfigModule } from '../appconfig/appconfig.module';

@Module({
  imports: [forwardRef(() => AdminModule), AppConfigModule],
  controllers: [WorksiteController],
  providers: [WorksiteService, WorksiteRepository],
  exports: [WorksiteService]
})
export class WorksiteModule {}
