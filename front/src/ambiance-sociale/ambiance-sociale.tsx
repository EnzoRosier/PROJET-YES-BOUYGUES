import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSociale: React.FC = () => {
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
    <div className="ambiance-sociale-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="ambiance-sociale-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="ambiance-sociale-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/social.png" alt="Ambiance sociale" className="social-image" />
          </div>
          <div className="text-section">
            <h1>Ambiance Sociale</h1>
            <div className="description">
              <p>
                Risque de tension, stress ou conflit entre travailleurs, pouvant nuire à la sécurité et à la performance collective
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

export default AmbianceSociale;
