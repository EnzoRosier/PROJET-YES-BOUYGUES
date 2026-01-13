import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './autre-risque.css';

const AutreRisqueEspagnol: React.FC = () => {
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
    <div className="autre-risque-container">
      <audio ref={audioRef} src="ressources/audios/Espagnol/Espagnol_Diapo_16.mp3" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="autre-risque-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="Autres risques" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>Otros</h1>
            <div className="description">
              <p>
                Riesgos específicos no clasificados en otras partes (presencia de amianto, circulación en el sitio, 
                riesgos biológicos, etc.)
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

export default AutreRisqueEspagnol;
