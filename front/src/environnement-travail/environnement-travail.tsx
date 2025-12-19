import React from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravail: React.FC = () => {
  const navigate = useNavigate();

  const handleAudioClick = () => {
    console.log("Audio button clicked");
  };

  return (
    <div className="environnement-travail-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="environnement-travail-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="environnement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/environnement.png" alt="Environnement de travail" className="environnement-image" />
          </div>
          <div className="text-section">
            <h1>Environnement de Travail</h1>
            <div className="description">
              <p>
                    Ensemble des risques liés aux conditions du chantier (bruit, poussières, météo, éclairage, espace restreint, etc.)
              </p>
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Exposition au bruit :</strong> Nuisances sonores pouvant causer des troubles auditifs</li>
                <li><strong>Poussières et particules :</strong> Inhalation de substances nocives pour les voies respiratoires</li>
                <li><strong>Conditions météorologiques :</strong> Travail sous forte chaleur, froid intense ou intempéries</li>
                <li><strong>Éclairage insuffisant :</strong> Risque accru d'accidents par mauvaise visibilité</li>
                <li><strong>Produits chimiques :</strong> Exposition à des substances dangereuses ou toxiques</li>
                <li><strong>Ergonomie inadaptée :</strong> Troubles musculo-squelettiques dus à de mauvaises postures</li>
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

export default EnvironnementTravail;
