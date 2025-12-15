import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsInt()
  @IsOptional()
  password: string;
  @IsString()
  adminId: string;
}
//login
export class LoginDto {
  @IsEmail()
  mail: string;
  @IsString()
  @MinLength(8)
  password: string;
}