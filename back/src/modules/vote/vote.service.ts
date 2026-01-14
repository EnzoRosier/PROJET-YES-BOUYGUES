import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVoteDto, GetStatWorksiteDto, RespondVoteDto } from './vote.dto';
import { VoteRepository } from './vote.repository';
import { CreateVoteModel, StatsWorksiteModel, VoteModel } from './vote.model';
import { AdminService } from '../admins/admins.service';

@Injectable()
export class VoteService {
  constructor(private readonly voteReposisory: VoteRepository, private readonly adminService: AdminService) {}

  //Recupere tout les votes
  public async getVotes(): Promise<VoteModel[]> {
    return this.voteReposisory.getVotes();
  }

  //Recupere vote par son id
  public async getVoteById(id: string, req): Promise<VoteModel | undefined> {
    //Check logged admin
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getVoteById(id);
  }

  //Cree un vote
  public createVote(vote: CreateVoteDto): Promise<CreateVoteModel> {
    return this.voteReposisory.createVote(vote);
  }

  //Recup worksite par son id
  public async getVoteWorksiteId(input: string, req): Promise<VoteModel[]> {
    //Check looged admin
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getVoteWorksiteId(input);
  }

  //Recup Stat d'un worksite
  public async getStatOf(id: string, input: GetStatWorksiteDto, req): Promise<StatsWorksiteModel> {
    //Check logged admin
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
    }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getStatOf(id, input);
  }

  //repond au ticket
  public async respondToTicket(input: RespondVoteDto, req): Promise<VoteModel> {
    //Check logged admin
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
        }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.respondToTicket(input)
  }

  //Recup tickets d'un worksite
  public async getTicketWorksiteId(input: string, req): Promise<VoteModel[]> {
    //Check logged admin
    const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
        }
    await this.adminService.getMeFromToken(token);
    return this.voteReposisory.getTicketWorksiteId(input)
  }
}
