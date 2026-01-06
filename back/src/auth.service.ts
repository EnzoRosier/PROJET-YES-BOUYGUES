// back/src/auth.service.ts

import { Injectable } from '@nestjs/common';

// --- SIMULATION DE LA BASE DE DONNÉES UTILISATEUR MISE À JOUR ---
const USERS_DB = {
    // Identifiant: superadmin | Mot de passe: superadmin
    'superadmin': { password: 'superadmin', role: 'SuperAdmin', name: 'Superviseur' }, 
    
    // Identifiant: admin | Mot de passe: admin
    'admin':      { password: 'admin',      role: 'Admin',      name: 'Chef de Chantier' },
};
// ------------------------------------------------------------------

@Injectable()
export class AuthService {
  
  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = USERS_DB[identifier as keyof typeof USERS_DB];

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null; 
  }
}