import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './vote.dto';
import { VoteRepository } from './vote.repository';
import { CreateVoteModel, VoteModel } from './vote.model';

@Injectable()
export class VoteService {
  constructor(private readonly voteReposisory: VoteRepository) {}

  public async getVotes(): Promise<VoteModel[]> {
    return this.voteReposisory.getVotes();
  }

  public async getVoteById(id: string): Promise<VoteModel | undefined> {
    return this.voteReposisory.getVoteById(id);
  }

  public createVote(vote: CreateVoteDto): Promise<CreateVoteModel> {
    return this.voteReposisory.createVote(vote);
  }

  public async getVoteWorksiteId(input: string): Promise<VoteModel[]> {
    return this.voteReposisory.getVoteWorksiteId(input);
  }
}
