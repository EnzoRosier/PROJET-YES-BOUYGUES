import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'es';
    navigate(`/riskeval?lang=${returnLang}`);
  };

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    audioRef.current = new Audio('ressources/audios/Espagnol/Espagnol_Diapo_11.mp3');
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
            <h1>Trabajos en altura</h1>
            <div className="description">
              <p>
                Riesgo de caída de personas o material durante trabajos en andamios, techos o plataformas
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={handleBackClick}>
        ← Atrás
      </button>
    </div>
  );
};

export default TravauxHauteurEspagnol;
