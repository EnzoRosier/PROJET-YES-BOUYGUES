import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialePolonais: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'pl';
    navigate(`/riskeval?lang=${returnLang}`);
  };


  const handleAudioClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="ambiance-sociale-container">
      <audio ref={audioRef} src="/audio/Polonais/Polonais Diapo 13 audio.mp3" />
      
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
            <h1>Środowisko społeczne</h1>
            <div className="description">
              <p>
                Ryzyko napięć, stresu lub konfliktów między pracownikami, które mogą zaszkodzić bezpieczeństwu i wydajności zespołowej
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Wstecz
      </button>
    </div>
  );
};

export default AmbianceSocialePolonais;
