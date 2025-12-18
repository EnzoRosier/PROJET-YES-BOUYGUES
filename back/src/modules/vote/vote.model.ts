import { WorksiteEntity } from '../database/entities/worksite.entity';

// modèle d'un Vote
export type VoteModel = {
  id: string;
  numQuestion: string;
  reponse: string;
  commentaire: string;
  date: Date;
  dateCloture: Date;
  worksite: WorksiteEntity;
};

// modèle pour créer un vote
export type CreateVoteModel = {
  numQuestion: string;
  reponse: string;
  commentaire: string;
  dateCloture: Date;
  worksite: WorksiteEntity;
};

// modèle pour mettre à jour un worksite
export type UpdateVoteModel = Partial<CreateVoteModel>;
