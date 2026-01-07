import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './admins.dto';
import { AdminModel, CreateAdminModel, MeModel } from './admins.model';
import { AdminRepository } from './admins.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository,private readonly jwtService: JwtService) {}

  public async getAdmins(req): Promise<AdminModel[]> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    const infoMe = await this.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return this.adminRepository.getAdmins();
  }

  public async getAdminById(id: string, token: string): Promise<AdminModel | undefined> {
    const infoMe = await this.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return this.adminRepository.getAdminById(id);
  }

  public createAdmin(Admin: CreateAdminDto): Promise<CreateAdminModel> {

    if (this.adminRepository.findByMail(Admin.mail)) {
      throw new UnauthorizedException('mail already used');
    }
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
