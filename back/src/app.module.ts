import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AdminModule } from './modules/admins/admins.module';
import { WorksiteModule } from './modules/worksite/worksite.module';

@Module({
  imports: [DatabaseModule, AdminModule, WorksiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
