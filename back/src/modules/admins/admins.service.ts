import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './admins.dto';
import { AdminModel, CreateAdminModel, MeModel } from './admins.model';
import { AdminRepository } from './admins.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { WorksiteService } from '../worksite/worksite.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository,
    @Inject(forwardRef(() => WorksiteService))
    private worksiteService: WorksiteService,

    private readonly jwtService: JwtService) {}
  
  //Recupere les admins
  public async getAdmins(req): Promise<AdminModel[]> {
    //Check logged en super admin
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

  //Recupere un admin avec son id
  public async getAdminById(id: string, token: string): Promise<AdminModel | undefined> {
    //Check logged en superadmin
    const infoMe = await this.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    return this.adminRepository.getAdminById(id);
  }

  //Cree un admin
  public async createAdmin(Admin: CreateAdminDto, token:string): Promise<CreateAdminModel> {
    //Check logged en super admin
    const infoMe = await this.getMeFromToken(token);
    if (!infoMe.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    if (await this.adminRepository.findByMail(Admin.mail)) {
      throw new UnauthorizedException('mail already used');
    }

    let worksistes = []
    //récup info worksite
    if (Admin.worksiteIds != undefined) {
      for (let i = 0; i < Admin.worksiteIds.length; i++) {
      const worksiteId = Admin.worksiteIds[i];
      let found = await this.worksiteService.getWorksiteEntityRefById(worksiteId)
      if (found) {
        worksistes.push(found)
      }
    };
    }
    
    return this.adminRepository.createAdmin(Admin, worksistes);
  }

  //Permet de login
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

  //Recup info grace a token
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

  //Modifie un admin
  async editAdmin(id: string, input: UpdateAdminDto, token: string): Promise<AdminModel> {
    //Check logged super admin
    const currInfo = await this.getMeFromToken(token)
    
    if (!currInfo.isSuperAdmin) {
      throw new UnauthorizedException();
    }

    //Recup worksite
    let worksites = undefined
    if (typeof input.worksiteIds !== "undefined") {
      worksites = []
      for (let i = 0; i < input.worksiteIds.length; i++) {
        const currId = input.worksiteIds[i];
        worksites.push(await this.worksiteService.getWorksiteById(currId))
      }
    }

    return this.adminRepository.editAdmin(id, input, worksites)
  }

  //Suppr un admin
  async deleteAdmin(id: string, token:string) : Promise<void> {
    //Check logged super admin
    const currInfo = await this.getMeFromToken(token)
    
    if (!currInfo.isSuperAdmin) {
      throw new UnauthorizedException();
    }
    this.adminRepository.deleteAdmin(id)
  }
}
