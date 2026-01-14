import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevageEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    es: 'Riesgo de Elevación',
  };

  // Harmonisation du chemin vers le dossier Espagnol (index 8)
  const getAudioPath = (index = 8) => {
    return `/ressources/audios/Espagnol/Espagnol_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=es`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(8);
      
      audioRef.current.play().catch((error) => {
        console.error("Error de audio detallado:", error);
        
        // Fallback con síntesis de voz (es-ES)
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
    <div className="risque-levage-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-levage-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-levage-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/grue.png" alt="Elevación" className="grue-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.es}</h1>
            <div className="description">
              <p>
                Peligro asociado a las operaciones de elevación (grúas, polipastos, carros, etc.) que pueden provocar la caída de objetos, aplastamientos o colisiones.
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

export default RisqueLevageEspagnol;