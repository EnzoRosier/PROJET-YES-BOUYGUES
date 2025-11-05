// src/components/SplashScreen/SplashScreen.tsx

import React from "react";
import "./SplashScreen.css";

// Interface pour communiquer l'événement de clic au parent (App.tsx)
interface SplashProps {
  onLogoClick: () => void; // Fonction appelée au clic sur le logo
}

const SplashScreen: React.FC<SplashProps> = ({ onLogoClick }) => { 
  return (
    <div className="splash-container">
      <div className="splash-content" onClick={onLogoClick}> {/* 👈 Ajout du gestionnaire de clic ici */}
        <img
          src="/bybat-industrie-v2.png" 
          alt="Bouygues Bâtiment Industrie"
          className="splash-logo"
        />
        <div className="splash-slogan">BÂTIR POUR VIVRE</div>
      </div>
    </div>
  );
};

export default SplashScreen;