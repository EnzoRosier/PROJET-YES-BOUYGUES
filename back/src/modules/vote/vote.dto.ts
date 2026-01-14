import { IsDate, IsOptional, IsString } from 'class-validator';

// Creation d'un vote
export declare class CreateVoteDto {
  @IsString()
  numQuestion: string;
  @IsString()
  reponse: string;
  @IsString()
  commentaire: string;
  @IsDate()
  date: Date;
  @IsDate()
  dateCloture: Date;
  @IsString()
  worksiteId: string;
}

// Creation d'un vote
export declare class RespondVoteDto {
  @IsString()
  idVote: string;
  @IsString()
  reponse: string;
}

// Création de plusieurs votes
export declare class CreateVotesDto {
  @IsOptional()
  vote: CreateVoteDto;
  @IsOptional()
  votes: CreateVoteDto[];
}

// donne tout les votes d'un site
export declare class GetAllVotesWorksiteDto {
  @IsString()
  idWorksite: string;
}

//recup stat worksite
export declare class GetStatWorksiteDto {
  @IsDate()
  date: Date;
}
