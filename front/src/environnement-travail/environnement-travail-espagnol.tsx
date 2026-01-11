import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailEspagnol: React.FC = () => {
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
            <h1>Ambiente de trabajo</h1>
            <div className="description">
              <p>
                    Todos los riesgos relacionados con las condiciones del lugar (ruido, polvo, clima, iluminación, espacio limitado, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Atrás
      </button>

      {/* Audio element */}
      <audio ref={audioRef} src="/audio/Espagnol/Espagnol_Diapo_12.mp3" />
    </div>
  );
};

export default EnvironnementTravailEspagnol;
