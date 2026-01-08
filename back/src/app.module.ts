import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './modules/admins/admins.module';
import { WorksiteModule } from './modules/worksite/worksite.module';
import { VoteModule } from './modules/vote/vote.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseModule,

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ScheduleModule.forRoot(),
    AdminModule,
    WorksiteModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
