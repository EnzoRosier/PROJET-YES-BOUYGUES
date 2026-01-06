import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './admins.dto';
import { AdminModel, CreateAdminModel, MeModel } from './admins.model';
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
    };
    //jwt token pour faire l'authetification
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

    async getMeFromToken(token: string): Promise<MeModel> {
    if (!token || typeof token !== 'string') {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

    const payload = this.jwtService.verify(token);

    const admin = await this.adminRepository.getAdminById(payload.sub);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return {
      id: admin.id,
      mail: admin.mail,
      isSuperAdmin: admin.isSuperAdmin,
      worksites: admin.worksites,
    };
  }




}
