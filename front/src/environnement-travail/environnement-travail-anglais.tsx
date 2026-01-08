import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
    }
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
            <h1>Work environment</h1>
            <div className="description">
              <p>
                    All risks related to the conditions of the site (noise, dust, weather, lighting, limited space, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Audio element */}
      <audio ref={audioRef} src="/audio/Anglais/Anglais_Diapo_12.mp3" />
    </div>
  );
};

export default EnvironnementTravailAnglais;
