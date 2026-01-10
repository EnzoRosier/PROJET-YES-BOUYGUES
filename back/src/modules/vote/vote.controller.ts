import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateVoteModel, StatsWorksiteModel, VoteModel } from './vote.model';
import { CreateVoteDto, GetStatWorksiteDto, RespondVoteDto } from './vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  public async listVotes(): Promise<VoteModel[]> {
    return this.voteService.getVotes();
  }

  @Post('new')
  public async createVote(
    @Body() input: CreateVoteDto,
  ): Promise<CreateVoteModel> {
    return this.voteService.createVote(input);
  }

  @Get('getByWorksite/:id')
  public async getByWorksiteId(@Param('id') id: string): Promise<VoteModel[]> {
    return this.voteService.getVoteWorksiteId(id);
  }

  @Post('getStatsOf/:id')
  public async getStatOf(
    @Param('id') id: string,
    @Body() input: GetStatWorksiteDto): Promise<StatsWorksiteModel> {
    return this.voteService.getStatOf(id, input);
  }

  @Get('ticket/:id')
  public async getTicketByWorksiteId(
    @Param('id') id: string,
  ): Promise<VoteModel[]> {
    return this.voteService.getTicketWorksiteId(id);
  }

  @Post('respond')
  public async respond(@Body() input: RespondVoteDto, @Req() req): Promise<VoteModel> {
    return this.voteService.respondToTicket(input, req);
    
  }

  @Get(':id')
  public async getVote(@Param('id') id: string): Promise<VoteModel | null> {
    return this.voteService.getVoteById(id);
  }

  
}
