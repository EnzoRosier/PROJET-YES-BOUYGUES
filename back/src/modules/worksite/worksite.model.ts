import { AdminModel } from '../admins/admins.model';

// modèle d'un worksite
export type WorksiteModel = {
  id: string;
  nom: string;
  addresse: string;
  description: string;
  dateFin: Date;
  nomClient: string;
  nomRespoSec: string;
  nbCollaborateur: number;
  joursSansAccident: number;
  respoChantier: AdminModel[];
};

// modèle pour créer un worksite
export type CreateWorksiteModel = {
  nom: string;
  addresse: string;
  description: string;
  dateFin: Date;
  nomClient: string;
  nomRespoSec: string;
  nbCollaborateur: number;
  joursSansAccident: number;
  respoChantier: AdminModel[];
};

// modèle pour mettre à jour un worksite
export type UpdateWorksiteModel = Partial<CreateWorksiteModel>;
