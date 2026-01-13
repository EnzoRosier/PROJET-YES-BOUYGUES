import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-collision.css';

const RisqueCohesionEspagnol: React.FC = () => {
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
    audioRef.current = new Audio('ressources/audios/Espagnol/Espagnol_Diapo_9.mp3');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="risque-cohesion-container">
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Cohésion d'équipe" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>Riesgo de Colisión</h1>
            <div className="description">
              <p>
                Debido a la circulación simultánea de máquinas, vehículos y peatones en zonas a veces restringidas, lo que puede provocar choques en caso de falta de visibilidad o coordinación. 
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={handleBackClick}>
        ← Volver
      </button>
    </div>
  );
};

export default RisqueCohesionEspagnol;
