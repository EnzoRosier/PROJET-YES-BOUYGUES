import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './admins.dto';
import { AdminModel, CreateAdminModel } from './admins.model';
import { AdminRepository } from './admins.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository,private readonly jwtService: JwtService) {}

  public async getAdmins(): Promise<AdminModel[]> {
    return this.adminRepository.getAdmins();
  }

  public async getAdminById(id: string): Promise<AdminModel | undefined> {
    return this.adminRepository.getAdminById(id);
  }

  public createAdmin(Admin: CreateAdminDto): Promise<CreateAdminModel> {
    return this.adminRepository.createAdmin(Admin);
  }

  async login(mail: string, password: string) {
    const admin = await this.adminRepository.findByMail(mail);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: admin.id,
      role: admin.isSuperAdmin ? 'SUPER_ADMIN' : 'ADMIN',
    };
    //jwt token pour faire l'authetification
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }



}
