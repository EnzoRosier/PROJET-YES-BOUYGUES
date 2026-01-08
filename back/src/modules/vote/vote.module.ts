import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { VoteRepository } from './vote.repository';
import { AdminModule } from '../admins/admins.module';

@Module({
  imports: [AdminModule],
  controllers: [VoteController],
  providers: [VoteService, VoteRepository],
})
export class VoteModule {}
