// back/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule], // 👈 Ajoutez-le ici
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}