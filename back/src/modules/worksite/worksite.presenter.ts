import { WorksiteModel } from './worksite.model';

export class WorksitePresenter {
  id: string;
  nom: string;
  addresse: string;
  description: string;
  dateFin: Date;
  nomClient: string;
  nomRespoSec: string;
  nbCollaborateur: number;
  joursSansAccident: number;
  respoChantier: {
    id: string;
    mail: string;
    firstName: string;
    lastName: string;
    isSuperAdmin: boolean;
  };

  private constructor(data: WorksitePresenter) {
    Object.assign(this, data);
  }

  public static from(data: WorksiteModel) {
    return new WorksitePresenter({
      id: data.id,
      nom: data.nom,
      addresse: data.addresse,
      description: data.description,
      dateFin: data.dateFin,
      nomClient: data.nomClient,
      nomRespoSec: data.nomRespoSec,
      nbCollaborateur: data.nbCollaborateur,
      joursSansAccident: data.joursSansAccident,
      respoChantier: data.respoChantier,
    });
  }
}
