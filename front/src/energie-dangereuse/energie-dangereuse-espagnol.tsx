import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'es';
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
      <audio ref={audioRef} src="ressources/audios/Espagnol/Espagnol_Diapo_15.mp3" />
      
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
            <h1>Energía peligrosa</h1>
            <div className="description">
              <p>
                Riesgo de lesión debido a fuentes de energía no controladas (eléctrica, hidráulica, neumática, térmica, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Atrás
      </button>
    </div>
  );
};

export default EnergieDangereuseEspagnol;
