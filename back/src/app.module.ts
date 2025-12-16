import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './modules/admins/admins.module';

@Module({
  imports: [DatabaseModule,ThrottlerModule.forRoot([{ttl:60000,limit:10,}]), AdminModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


