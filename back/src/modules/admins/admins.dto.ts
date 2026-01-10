import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
} from 'class-validator';

// Creation d'un admin
export declare class CreateAdminDto {
  @IsString()
  mail: string;
  @IsString()
  password: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsBoolean()
  isSuperAdmin: boolean;
  @IsOptional()
  @IsArray()
  worksiteIds?: string[];
}

// Création de plusieurs admins
export declare class CreateAdminsDto {
  @IsOptional()
  admin: CreateAdminDto;
  @IsOptional()
  admins: CreateAdminDto[];
}

// Mise à jour d'un admin
export declare class UpdateAdminDto {
  @IsString()
  @IsOptional()
  mail: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsBoolean()
  @IsOptional()
  isSuperAdmin: boolean;
}
//login
export class LoginDto {
  @IsEmail()
  mail: string;
  @IsString()
  @MinLength(8)
  password: string;
}
