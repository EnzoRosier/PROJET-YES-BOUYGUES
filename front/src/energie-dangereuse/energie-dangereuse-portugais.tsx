import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereusePortugais: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'pt';
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
    <div className="energie-dangereuse-container">
      <audio ref={audioRef} src="ressources/audios/Portugais/diapo-15.mp3" />
      
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
            <h1>Energia perigosa</h1>
            <div className="description">
              <p>
                Risco de lesão devido a fontes de energia não controladas (elétrica, hidráulica, pneumática, térmica, etc.)
                </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Voltar
      </button>
    </div>
  );
};

export default EnergieDangereusePortugais;
