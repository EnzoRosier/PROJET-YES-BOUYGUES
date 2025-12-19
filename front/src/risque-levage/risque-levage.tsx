import React from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevage: React.FC = () => {
  const navigate = useNavigate();

  const handleAudioClick = () => {
    console.log("Audio button clicked");
  };

  return (
    <div className="risque-levage-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="risque-levage-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="risque-levage-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/grue.png" alt="Grue" className="grue-image" />
          </div>
          <div className="text-section">
            <h1>Risque de Levage</h1>
            <div className="description">
              <p>
                Danger lié aux opérations de levage de charges (grues, palans, chariots, etc.).
              </p>
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Chute de charges :</strong> Risque d'écrasement si les charges ne sont pas correctement arrimées</li>
                <li><strong>Renversement de l'engin :</strong> Instabilité due à une surcharge ou un terrain inadapté</li>
                <li><strong>Contact avec des lignes électriques :</strong> Électrocution en cas de contact avec des câbles aériens</li>
                <li><strong>Heurt de personnes :</strong> Collision entre la charge et le personnel présent</li>
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

export default RisqueLevage;
