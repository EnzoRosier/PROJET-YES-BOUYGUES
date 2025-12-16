import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WorksiteEntity } from '../database/entities/worksite.entity';
import { VoteEntity } from '../database/entities/vote.entity';
import { CreateVoteModel, VoteModel } from './vote.model';
import { CreateVoteDto } from './vote.dto';
import { WorksiteModel } from '../worksite/worksite.model';

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
      worksite: worksite,
    });
    const returnedVote = this.voteRepository.save(newVote);

    return returnedVote;
  }
}
