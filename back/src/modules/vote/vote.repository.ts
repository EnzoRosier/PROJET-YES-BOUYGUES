import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, IsNull, Not } from 'typeorm';
import { WorksiteEntity } from '../database/entities/worksite.entity';
import { VoteEntity } from '../database/entities/vote.entity';
import { CreateVoteModel, StatsWorksiteModel, VoteModel } from './vote.model';
import { CreateVoteDto, GetStatWorksiteDto, RespondVoteDto } from './vote.dto';
import { WorksiteModel } from '../worksite/worksite.model';
import { contains } from 'class-validator';

@Injectable()
export class VoteRepository {
  private readonly worksiteRepository =
    this.dataSource.getRepository(WorksiteEntity);
  private readonly voteRepository = this.dataSource.getRepository(VoteEntity);

  constructor(private readonly dataSource: DataSource) {}

  private worksites: WorksiteModel[] = [];

  //liste des votes
  public async getVotes(): Promise<VoteModel[]> {
    return this.voteRepository.find();
  }

  //récupère un worksite par son ID
  public async getVoteById(id: string): Promise<VoteModel | null> {
    return this.voteRepository.findOneOrFail({
      where: { id },
      relations: { worksite: true },
    });
  }

  //récupère tout les vote d'un worksite
  public async getVoteWorksiteId(input: string): Promise<VoteModel[]> {
    const worksite = await this.worksiteRepository.findOne({
      where: { id: input },
    });
    if (worksite == null) {
      throw new BadRequestException('worksite not found');
    }
    return this.voteRepository.find({
      where: {
        worksite: {
          id: input,
        },
      },
      relations: { worksite: true },
    });
  }

  //récupère tout les vote d'un worksite
  public async getTicketWorksiteId(input: string): Promise<VoteModel[]> {
    const worksite = await this.worksiteRepository.findOne({
      where: { id: input },
    });
    if (worksite == null) {
      throw new BadRequestException('worksite not found');
    }
    return this.voteRepository.find({
      where: {
        worksite: {
          id: input,
        },
      },
      relations: { worksite: true },
    });
  }

  //création d'un vote
  public async createVote(vote: CreateVoteDto): Promise<CreateVoteModel> {
    if (typeof vote.worksiteId !== 'string') {
      throw new BadRequestException('worksiteId not specified');
    }

    const worksite = await this.worksiteRepository.findOneOrFail({
      where: { id: vote.worksiteId },
    });

    const newVote = this.voteRepository.create({
      numQuestion: vote.numQuestion,
      reponse: vote.reponse,
      commentaire: vote.commentaire,
      date: vote.date,
      dateCloture: vote.dateCloture,
      worksite: worksite,
    });
    const returnedVote = this.voteRepository.save(newVote);

    return returnedVote;
  }

  public async respondToTicket(input: RespondVoteDto): Promise<VoteModel> {
    const vote = await this.voteRepository.findOne({
      where:{id:input.idVote}
    })

    if (vote == null || vote.dateCloture != null) {
      throw new BadRequestException('Opened ticket not found');
    }
    vote.reponseCommentaire = input.reponse
    vote.dateCloture = new Date(Date.now())
    return this.voteRepository.save(vote)
  }

  //récupère tout les vote d'un worksite
  public async getStatOf(id: string, input: GetStatWorksiteDto): Promise<StatsWorksiteModel> {
    const worksite = await this.worksiteRepository.findOne({
      where: { id: id },
    });
    if (input.date == null) {
      input.date = new Date(1999, 1, 1)
    }
    if (worksite == null) {
      throw new BadRequestException('worksite not found');
    }

    let res: StatsWorksiteModel = {
      questionHumeur: null,
      questionRisque: null,
    }

    res.questionHumeur = await this.voteRepository.createQueryBuilder('vote')
    .select([
      'COUNT(CASE WHEN vote.reponse LIKE "%BIEN%" THEN 1 END) as bien',
      'COUNT(CASE WHEN vote.reponse LIKE "%MOYEN%" THEN 1 END) as moyen',
      'COUNT(CASE WHEN vote.reponse LIKE "%MAUVAIS%" THEN 1 END) as mauvais',
    ])
    .where('vote.numQuestion = 1')
    .andWhere('vote.worksiteId = :worksiteId', {worksiteId: id})
    .andWhere('vote.date >= :selectDate', {selectDate: input.date})
    .getRawOne();

    res.questionRisque = await this.voteRepository.createQueryBuilder('vote')
    .select([
      'COUNT(CASE WHEN vote.reponse LIKE "%LEVAGE%" THEN 1 END) as levage',
      'COUNT(CASE WHEN vote.reponse LIKE "%COHESION%" THEN 1 END) as cohesion',
      'COUNT(CASE WHEN vote.reponse LIKE "%ENVIRONEMENT%" THEN 1 END) as environement',
      'COUNT(CASE WHEN vote.reponse LIKE "%EQUIPEMENT%" THEN 1 END) as equipement',
      'COUNT(CASE WHEN vote.reponse LIKE "%HAUTEUR%" THEN 1 END) as hauteur',
      'COUNT(CASE WHEN vote.reponse LIKE "%STABILITE%" THEN 1 END) as stabilite',
      'COUNT(CASE WHEN vote.reponse LIKE "%AMBIANCE%" THEN 1 END) as ambiance',
      'COUNT(CASE WHEN vote.reponse LIKE "%ENERGIE%" THEN 1 END) as energie',
      'COUNT(CASE WHEN vote.reponse LIKE "%AUTRE%" THEN 1 END) as autre',
    ])
    .where('vote.numQuestion = 2')
    .andWhere('vote.worksiteId = :worksiteId', {worksiteId: id})
    .andWhere('vote.date >= :selectDate', {selectDate: input.date})
    .getRawOne();
    
    return res
  }
  
}
