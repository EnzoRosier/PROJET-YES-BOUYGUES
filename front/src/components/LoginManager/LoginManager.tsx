// src/components/LoginManager/LoginManager.tsx

import React from 'react';
import './LoginManager.css'; // Créez ce fichier CSS

const LoginManager: React.FC = () => {
  return (
    <div className="login-manager-container">
      <div className="flag-lock-container">
        <div className="flag">🇫🇷</div> {/* Drapeau français */}

        <div className="lock">🔒</div> {/* Icône de cadenas */}
      </div>
      
      <div className="login-box-wrapper">
        <div className="login-form-area">
          <h2 className="login-title">Connexion Manager</h2>
          
          <div className="input-group">
            <span className="icon">👤</span> {/* Icône de personne */}
            <input type="text" placeholder="Identifiant" className="input-field" />
          </div>
          
          <div className="input-group">
            <span className="icon">🔒</span> {/* Icône de cadenas */}
            <input type="password" placeholder="Mot de passe" className="input-field" />
          </div>
          
          <button className="connexion-button">Connexion</button>
        </div>
        
        <div className="logo-area">
          <img
            src="/bybat-industrie-v2.png" // Assurez-vous que le chemin est correct
            alt="Bouygues Bâtiment Industrie"
            className="login-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginManager;