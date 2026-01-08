import React from 'react';
import { useNavigate } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravail: React.FC = () => {
  const navigate = useNavigate();

  const handleAudioClick = () => {
    // Fonctionnalité audio à implémenter plus tard
    console.log("Audio button clicked");
  };

  return (
    <div className="equipement-travail-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="equipement-travail-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="equipement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/equipement.jpg" alt="Équipement de travail" className="equipement-image" />
          </div>
          <div className="text-section">
            <h1>Équipement de Travail</h1>
            <div className="description">
              <p>
                Risque d’accident lié à l’utilisation, la défaillance ou la mauvaise maintenance des machines et outils
              </p>
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

export default EquipementTravail;
