// back/src/auth.module.ts

import { Module } from '@nestjs/common'; // 👈 Vérifiez l'importation de 'Module'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({ // 👈 Le décorateur ESSENTIEL qui le définit comme un module
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}