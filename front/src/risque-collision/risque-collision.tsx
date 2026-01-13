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
            <h1>Risque de Collision</h1>
            <div className="description">
              <p>
                Dû à la circulation simultanée des engins, des véhicules et des piétons dans des zones parfois restreintes, ce qui peut entraîner des chocs en cas de manque de visibilité ou de coordination. 
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
