import { AdminModel } from './admins.model';

export class AdminPresenter {
  id: string;
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  worksites: {
    id: string;
    nom: string;
    addresse: string;
    description: string;
    dateFin: Date;
    nomClient: string;
    nomRespoSec: string;
    nbCollaborateur: number;
    joursSansAccident: number;
  }[];

  private constructor(data: AdminPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AdminModel) {
    return new AdminPresenter({
      id: data.id,
      mail: data.mail,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      isSuperAdmin: data.isSuperAdmin,
      worksites:
        data.worksites?.map((w) => ({
          id: w.id,
          nom: w.nom,
          addresse: w.addresse,
          description: w.description,
          dateFin: w.dateFin,
          nomClient: w.nomClient,
          nomRespoSec: w.nomRespoSec,
          nbCollaborateur: w.nbCollaborateur,
          joursSansAccident: w.joursSansAccident,
        })) || [],
    });
  }

  
}
