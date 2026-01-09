import { Module } from '@nestjs/common';
import { AppConfigService } from './appconfig.service';
import { AppConfigRepository } from './appconfig.repository';


@Module({
  imports: [],
  controllers: [],
  providers: [AppConfigService, AppConfigRepository],
  exports: [AppConfigService]
})
export class AppConfigModule {}
