import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './admins.dto';
import { AdminModel, CreateAdminModel } from './admins.model';
import { AdminRepository } from './admins.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  public async getAdmins(): Promise<AdminModel[]> {
    return this.adminRepository.getAdmins();
  }

  public async getAdminById(id: string): Promise<AdminModel | undefined> {
    return this.adminRepository.getAdminById(id);
  }

  public createAdmin(Admin: CreateAdminDto): Promise<CreateAdminModel> {
    return this.adminRepository.createAdmin(Admin);
  }
}
