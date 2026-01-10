import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabilite: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'fr';
    navigate(`/riskeval?lang=${returnLang}`);
  };

  const handleAudioClick = () => {
    console.log("Audio button clicked");
  };

  return (
    <div className="risque-stabilite-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="risque-stabilite-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="risque-stabilite-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/instable.png" alt="Risque de stabilité" className="instable-image" />
          </div>
          <div className="text-section">
            <h1>Risque de Stabilité</h1>
            <div className="description">
              <p>
                Danger d’effondrement, de basculement ou de glissement d’éléments de structure, de terrain ou d’équipements.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Retour
      </button>
    </div>
  );
};

export default RisqueStabilite;
