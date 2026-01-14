import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-collision.css';

const RisqueCohesionEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titleTexts: Record<string, string> = {
    es: 'Riesgo de Colisión',
  };

  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'es';
    navigate(`/riskeval?lang=${returnLang}`);
  };

  // Harmonisation du chemin audio (Index 9)
  const getAudioPath = () => `/ressources/audios/Espagnol/Espagnol_Diapo_9.mp3`;

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Error de audio:", error);
        
        // Fallback avec synthèse vocale (es-ES)
        if ('speechSynthesis' in window) {
          const text = titleTexts.es;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'es-ES';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="risque-cohesion-container">
      {/* L'élément audio invisible */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={speakQuestion}>
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
            <h1>{titleTexts.es}</h1>
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