import { Injectable } from '@nestjs/common';
import { AdminModel, CreateAdminModel } from './admins.model';
import { CreateAdminDto } from './admins.dto';
import { DataSource } from 'typeorm';
import { AdminEntity } from '../database/entities/admin.entity';

@Injectable()
export class AdminRepository {
  private readonly adminRepository = this.dataSource.getRepository(AdminEntity);

  constructor(private readonly dataSource: DataSource) {}

  private admins: AdminModel[] = [];

  //liste des admins
  public async getAdmins(): Promise<AdminModel[]> {
    return this.adminRepository.find();
  }
  //récupère un admin par son ID
  public async getAdminById(id: string): Promise<AdminModel | null> {
    return this.adminRepository.findOneOrFail({
      where: { id },
    });
  }

  //création d'un admin
  public async createAdmin(admin: CreateAdminModel): Promise<AdminModel> {
    // Maintenant on peut créer une nouvelle entrée d'un admin et la sauvegarder

    var hashedPassword = admin.password;
    const newAdmin = this.adminRepository.create({
      mail: admin.mail,
      password: admin.password,
      firstName: admin.firstName,
      lastName: admin.lastName,
      isSuperAdmin: admin.isSuperAdmin,
    });
    const returnedAdmin = this.adminRepository.save(newAdmin);

    return returnedAdmin;
  }
}
