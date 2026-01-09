import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

// Creation d'un worksite
export declare class CreateWorksiteDto {
  @IsString()
  nom: string;
  @IsString()
  addresse: string;
  @IsString()
  description: string;
  @IsDate()
  dateFin: Date;
  @IsString()
  nomClient: string;
  @IsString()
  nomRespoSec: string;
  @IsInt()
  nbCollaborateur: number;
  @IsInt()
  joursSansAccident: number;
  @IsString()
  adminIds: string[];
}

// Création de plusieurs worksites
export declare class CreateAdminsDto {
  @IsOptional()
  vote: CreateWorksiteDto;
  @IsOptional()
  votes: CreateWorksiteDto[];
}

// ajoute/change le respo chantier
export declare class ChangeRespoChantierDto {
  @IsString()
  idWorksite: string;
  @IsString()
  idAdmin: string;
}

export declare class ResetJourAccidentDto {
  @IsString()
  idWorksite: string;
}

// Mise à jour d'un worksite
export declare class UpdateAdminDto {
  @IsString()
  @IsOptional()
  nom: string;
  @IsOptional()
  @IsString()
  addresse: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsDate()
  @IsOptional()
  dateFin: Date;
  @IsString()
  @IsOptional()
  nomClient: string;
  @IsString()
  @IsOptional()
  nomRespoSec: string;
  @IsInt()
  @IsOptional()
  nbCollaborateur: number;
  @IsInt()
  @IsOptional()
  joursSansAccident: number;
  @IsString()
  worksiteId: string;
  @IsString()
  @IsOptional()
  adminIds: string[];
}
