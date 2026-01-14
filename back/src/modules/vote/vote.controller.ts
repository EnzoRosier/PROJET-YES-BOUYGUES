import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateVoteModel, StatsWorksiteModel, VoteModel } from './vote.model';
import { CreateVoteDto, GetStatWorksiteDto, RespondVoteDto } from './vote.dto';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  //Requete qui liste tous les votes
  @Get()
  public async listVotes(): Promise<VoteModel[]> {
    return this.voteService.getVotes();
  }

  //Requete qui cree un vote
  @Post('new')
  public async createVote(
    @Body() input: CreateVoteDto,
  ): Promise<CreateVoteModel> {
    return this.voteService.createVote(input);
  }

  //Requete qui recup les vote d'un worksite grace a l'id du worksite
  @Get('getByWorksite/:id')
  public async getByWorksiteId(@Param('id') id: string, @Req() req): Promise<VoteModel[]> {
    return this.voteService.getVoteWorksiteId(id, req);
  }

  //REquete qui renvoie les stats formate d'un worksite ave l'id du worksite
  @Post('getStatsOf/:id')
  public async getStatOf(
    @Param('id') id: string,
    @Body() input: GetStatWorksiteDto,
    @Req() req): Promise<StatsWorksiteModel> {
    return this.voteService.getStatOf(id, input, req);
  }

  //REquete qui renvoie les tickets d'un worksite avec l'id du worksite
  @Get('ticket/:id')
  public async getTicketByWorksiteId(
    @Param('id') id: string,
    @Req() req
  ): Promise<VoteModel[]> {
    return this.voteService.getTicketWorksiteId(id, req);
  }

  //REquete qui renvoie repond a un ticket
  @Post('respond')
  public async respond(@Body() input: RespondVoteDto, @Req() req): Promise<VoteModel> {
    return this.voteService.respondToTicket(input, req);
    
  }

  //REquete qui recup un vote grace a son id
  @Get(':id')
  public async getVote(@Param('id') id: string, @Req() req): Promise<VoteModel | null> {
    return this.voteService.getVoteById(id, req);
  }

  
}
