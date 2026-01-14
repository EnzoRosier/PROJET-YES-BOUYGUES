import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabiliteAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Stability Risk',
  };

  // Chemin vers le fichier audio anglais (index 10)
  const getAudioPath = (index = 10) => {
    return `/ressources/audios/Anglais/Anglais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=en`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(10);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale (en-GB)
        if ('speechSynthesis' in window) {
          const text = titleTexts.en;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-GB';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="risque-stabilite-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-stabilite-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-stabilite-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/instable.png" alt="Stability" className="instable-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                Danger of collapse, tipping or sliding of structural elements, terrain or equipment
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>
    </div>
  );
};

export default RisqueStabiliteAnglais;