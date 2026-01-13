import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-collision.css';

const RisqueCohesion: React.FC = () => {
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
    <div className="risque-cohesion-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Cohésion d'équipe" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>Risque de Cohésion</h1>
            <div className="description">
              <p>
               Risque lié à un manque de coordination ou de communication entre équipes, pouvant provoquer des erreurs ou accidents
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

export default RisqueCohesion;
