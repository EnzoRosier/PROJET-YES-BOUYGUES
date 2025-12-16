import { WorksiteEntity } from '../database/entities/worksite.entity';

// modèle d'un admin
export type AdminModel = {
  id: string;
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  worksites?: WorksiteEntity[];
};

// modèle pour créer un admin
export type CreateAdminModel = {
  mail: string;
  password: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  worksites?: WorksiteEntity[];
};

// modèle pour mettre à jour un admin
export type UpdateAdminModel = Partial<CreateAdminModel>;
