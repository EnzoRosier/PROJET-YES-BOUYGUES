import React from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabilite: React.FC = () => {
  const navigate = useNavigate();

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
                Danger d’effondrement, de basculement ou de glissement d’éléments de structure, de terrain ou d’équipement
              </p>
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Effondrement de structures :</strong> Rupture ou affaissement de structures temporaires ou permanentes</li>
                <li><strong>Renversement d'engins :</strong> Basculement de véhicules ou d'équipements sur sol instable</li>
                <li><strong>Glissement de terrain :</strong> Mouvement du sol suite à des excavations ou des intempéries</li>
                <li><strong>Chute de matériaux empilés :</strong> Effondrement de stocks mal stabilisés</li>
                <li><strong>Déformation de coffrages :</strong> Rupture sous la pression du béton frais</li>
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

export default RisqueStabilite;
