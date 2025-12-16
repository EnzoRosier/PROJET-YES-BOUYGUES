import { Body, Controller, Get, Param, Post } from '@nestjs/common';
//import { patch } from 'axios';
import { CreateAdminDto, LoginDto } from './admins.dto';
import { AdminService } from './admins.service';
import { AdminModel, CreateAdminModel } from './admins.model';
import { Throttle } from '@nestjs/throttler';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async listAdmins(): Promise<AdminModel[]> {
    return this.adminService.getAdmins();
  }

  @Get(':id')
  public async getAdmin(@Param('id') id: string): Promise<AdminModel | null> {
    return this.adminService.getAdminById(id);
  }

  @Post()
  public async createAdmin(
    @Body() input: CreateAdminDto,
  ): Promise<CreateAdminModel> {
    return this.adminService.createAdmin(input);
  }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(
      loginDto.mail,
      loginDto.password,
    );
  }
}
