import { Module } from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
