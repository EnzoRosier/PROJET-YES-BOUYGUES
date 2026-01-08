import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurPolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    audioRef.current = new Audio('/audio/Polonais/Polonais Diapo 11 audio.mp3');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="travaux-hauteur-container">
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="Échafaudage" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>Praca na wysokości</h1>
            <div className="description">
              <p>
                Ryzyko upadków ludzi lub sprzętu podczas pracy na rusztowaniach, dachach lub platformach
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Wstecz
      </button>
    </div>
  );
};

export default TravauxHauteurPolonais;
