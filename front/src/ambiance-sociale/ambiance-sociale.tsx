import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSociale: React.FC = () => {
  const navigate = useNavigate();

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
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Harcèlement et discrimination :</strong> Comportements inappropriés créant un climat hostile</li>
                <li><strong>Isolement social :</strong> Travailleurs exclus ou marginalisés au sein de l'équipe</li>
                <li><strong>Stress et pression excessive :</strong> Surcharge de travail et exigences irréalistes</li>
                <li><strong>Conflits interpersonnels :</strong> Tensions et disputes nuisant à la cohésion d'équipe</li>
                <li><strong>Manque de reconnaissance :</strong> Démotivation due à l'absence de valorisation du travail accompli</li>
                <li><strong>Communication défaillante :</strong> Incompréhensions et malentendus fréquents</li>
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

export default AmbianceSociale;
