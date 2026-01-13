import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVoteDto, GetStatWorksiteDto, RespondVoteDto } from './vote.dto';
import { VoteRepository } from './vote.repository';
import { CreateVoteModel, StatsWorksiteModel, VoteModel } from './vote.model';
import { AdminService } from '../admins/admins.service';

@Injectable()
export class VoteService {
  constructor(private readonly voteReposisory: VoteRepository, private readonly adminService: AdminService) {}

  public async getVotes(): Promise<VoteModel[]> {
    return this.voteReposisory.getVotes();
  }

  public async getVoteById(id: string, req): Promise<VoteModel | undefined> {
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getVoteById(id);
  }

  public createVote(vote: CreateVoteDto): Promise<CreateVoteModel> {
    return this.voteReposisory.createVote(vote);
  }

  public async getVoteWorksiteId(input: string, req): Promise<VoteModel[]> {
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getVoteWorksiteId(input);
  }

  public async getStatOf(id: string, input: GetStatWorksiteDto, req): Promise<StatsWorksiteModel> {
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getStatOf(id, input);
  }

  public async respondToTicket(input: RespondVoteDto, req): Promise<VoteModel> {
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
        }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.respondToTicket(input)
  }

  public async getTicketWorksiteId(input: string, req): Promise<VoteModel[]> {
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
        }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getTicketWorksiteId(input)
  }
}
