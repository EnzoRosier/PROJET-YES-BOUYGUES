import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    es: 'Energía peligrosa',
  };

  // Harmonisation du chemin vers le dossier Espagnol - Piste 15
  const getAudioPath = () => `/ressources/audios/Espagnol/Espagnol_Diapo_15.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=es`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Error de audio detallado:", error);
        
        // Fallback con síntesis de voz (es-ES)
        if ('speechSynthesis' in window) {
          const text = titleTexts.es;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'es-ES';
          window.speechSynthesis.cancel(); // Limpia lecturas en curso
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="energie-dangereuse-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="Energía" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.es}</h1>
            <div className="description">
              <p>
                Riesgo de lesión debido a fuentes de energía no controladas (eléctrica, hidráulica, neumática, térmica, etc.)
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

export default EnergieDangereuseEspagnol;