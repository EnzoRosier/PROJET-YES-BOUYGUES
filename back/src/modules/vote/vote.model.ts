import { WorksiteEntity } from '../database/entities/worksite.entity';

// modèle d'un Vote
export type VoteModel = {
  id: string;
  numQuestion: string;
  reponse: string;
  commentaire: string;
  reponseCommentaire:string;
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

// modèle pour stats worksite
export type StatsWorksiteModel = {
  questionHumeur: {
    bien: number,
    moyen: number,
    mauvais: number,
  }
  questionRisque: {
    levage: number,
    cohesion: number,
    environement: number,
    equipement: number,
    hauteur: number,
    stabilite: number,
    ambiance: number,
    energie: number,
    autre: number,
  }
}

// modèle pour mettre à jour un worksite
export type UpdateVoteModel = Partial<CreateVoteModel>;
