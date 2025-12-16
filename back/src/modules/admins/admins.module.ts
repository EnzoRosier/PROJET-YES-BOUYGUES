import { Module } from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { AdminController } from './admins.controller';
import { AdminService } from './admins.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
