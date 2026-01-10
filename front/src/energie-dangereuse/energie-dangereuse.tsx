import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuse: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'fr';
    navigate(`/riskeval?lang=${returnLang}`);
  };
  const handleAudioClick = () => {
    // Fonctionnalité audio à implémenter plus tard
    console.log("Audio button clicked");
  };

  return (
    <div className="energie-dangereuse-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="Énergie dangereuse" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>Énergie Dangereuse</h1>
            <div className="description">
              <p>
                Risque de blessure dû à des sources d’énergie non maîtrisées (électrique, hydraulique, pneumatique, thermique, etc.)
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

export default EnergieDangereuse;
