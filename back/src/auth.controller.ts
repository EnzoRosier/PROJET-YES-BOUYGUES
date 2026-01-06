// back/src/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// Interface pour la requête entrante (le body)
interface LoginDto {
  identifier: string;
  password: string;
}

@Controller('auth') // Route de base: /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // Route complète: POST /auth/login
  async login(@Body() loginDto: LoginDto) {
    
    const user = await this.authService.validateUser(loginDto.identifier, loginDto.password);

    if (!user) {
      // Renvoie une erreur 401 (Unauthorized) si la connexion échoue
      throw new UnauthorizedException('Identifiant ou mot de passe incorrect.');
    }

    // Connexion réussie, renvoie les données de l'utilisateur (nom et rôle)
    return {
      success: true,
      message: 'Connexion réussie',
      role: user.role,
      name: user.name,
    };
  }
}