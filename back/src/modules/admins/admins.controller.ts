import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAdminDto, LoginDto, UpdateAdminDto } from './admins.dto';
import { AdminService } from './admins.service';
import { AdminModel, CreateAdminModel, MeModel } from './admins.model';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { Req, UnauthorizedException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';


@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async listAdmins(
    @Req() req
  ): Promise<AdminModel[]> {
     const token = req.cookies?.access_token;
        if (!token) {
          throw new UnauthorizedException();
        }
    return this.adminService.getAdmins(req);
  }

  @Post()
  public async createAdmin(
    @Body() input: CreateAdminDto,
  ): Promise<CreateAdminModel> {
    return this.adminService.createAdmin(input);
  }

  @Post()
  public async updateAdmin(
    @Req() req,
    @Body() input: CreateAdminDto,
  ): Promise<CreateAdminModel> {
    return this.adminService.createAdmin(input);
  }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.adminService.login(
      loginDto.mail,
      loginDto.password,
    );
    res.cookie('access_token', accessToken, {  
      httpOnly: true,     
      secure: false,     
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    return { success: true };
  }

  @Get('me')
  async me(@Req() req): Promise<MeModel> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.adminService.getMeFromToken(token);
  }

  @Post('delete/:id')
  public async deleteAdmin(@Param('id') id: string, @Req() req): Promise<void> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.adminService.deleteAdmin(id, token);
  }

  @Post('edit/:id')
  public async editAdmin(@Param('id') id: string, @Req() req, @Body() input: UpdateAdminDto): Promise<AdminModel | null> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.adminService.editAdmin(id,input, token);
  }

  @Get(':id')
  public async getAdmin(@Param('id') id: string, @Req() req): Promise<AdminModel | null> {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.adminService.getAdminById(id, token);
  }

  


}
