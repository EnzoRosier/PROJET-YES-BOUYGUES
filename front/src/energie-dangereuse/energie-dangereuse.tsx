import React from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuse: React.FC = () => {
  const navigate = useNavigate();

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
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Électrocution :</strong> Contact avec des câbles ou installations électriques sous tension</li>
                <li><strong>Électrisation :</strong> Passage du courant électrique à travers le corps</li>
                <li><strong>Arc électrique :</strong> Explosion ou brûlures graves dues à un court-circuit</li>
                <li><strong>Énergie mécanique :</strong> Démarrage intempestif de machines ou équipements</li>
                <li><strong>Énergie hydraulique/pneumatique :</strong> Libération brutale de pression</li>
                <li><strong>Énergie thermique :</strong> Brûlures par surfaces chaudes ou fluides à haute température</li>
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

export default EnergieDangereuse;
