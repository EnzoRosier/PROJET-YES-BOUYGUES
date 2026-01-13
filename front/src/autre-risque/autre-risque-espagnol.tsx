import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './autre-risque.css';

const AutreRisqueEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    es: 'Otros',
  };

  // Harmonisation du chemin vers le dossier Espagnol - Piste 16
  const getAudioPath = () => `/ressources/audios/Espagnol/Espagnol_Diapo_16.mp3`;

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
    <div className="autre-risque-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="autre-risque-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="Otros" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.es}</h1>
            <div className="description">
              <p>
                Riesgos específicos no clasificados en otras partes (presencia de amianto, circulación en el sitio, 
                riesgos biológicos, etc.)
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

export default AutreRisqueEspagnol;