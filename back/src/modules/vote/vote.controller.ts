import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VoteRepository } from './vote.repository';
import { CreateVoteModel, VoteModel } from './vote.model';
import { CreateVoteDto } from './vote.dto';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteRepository: VoteRepository) {}

  @Get()
  public async listVotes(): Promise<VoteModel[]> {
    return this.voteRepository.getVotes();
  }

  @Post('new')
  public async createVote(
    @Body() input: CreateVoteDto,
  ): Promise<CreateVoteModel> {
    return this.voteRepository.createVote(input);
  }

  @Get('getByWorksite/:id')
  public async getByWorksiteId(@Param('id') id: string): Promise<VoteModel[]> {
    return this.voteRepository.getVoteWorksiteId(id);
  }

  @Get(':id')
  public async getVote(@Param('id') id: string): Promise<VoteModel | null> {
    return this.voteRepository.getVoteById(id);
  }
}
