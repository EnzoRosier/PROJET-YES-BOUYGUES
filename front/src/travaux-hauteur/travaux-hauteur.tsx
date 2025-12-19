import React from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteur: React.FC = () => {
  const navigate = useNavigate();

  const handleAudioClick = () => {
    console.log("Audio button clicked");
  };

  return (
    <div className="travaux-hauteur-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="Échafaudage" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>Travaux en Hauteur</h1>
            <div className="description">
              <p>
                Risque de chute de personnes ou de matériel lors d’interventions sur échafaudages, toitures ou plateformes
              </p>
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Chute de hauteur :</strong> Risque de chute depuis un échafaudage, une échelle ou une plateforme</li>
                <li><strong>Effondrement de structure :</strong> Rupture ou instabilité de l'échafaudage ou du support</li>
                <li><strong>Chute d'objets :</strong> Outils ou matériaux tombant depuis la hauteur</li>
                <li><strong>Conditions météorologiques :</strong> Vent, pluie ou gel augmentant les risques de glissade</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>
    </div>
  );
};

export default TravauxHauteur;
