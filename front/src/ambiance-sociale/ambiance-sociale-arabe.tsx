import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialeArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ar: 'البيئة الاجتماعية',
  };

  // Harmonisation du chemin vers le dossier Arabe Littéraire (index 13)
  const getAudioPath = (index = 13) => {
    return `/ressources/audios/Arabe Littéraire/diapo ${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ar`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(13);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale (ar-SA)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ar;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ar-SA';
          window.speechSynthesis.cancel(); // Nettoie les lectures en cours
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="ambiance-sociale-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="ambiance-sociale-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="ambiance-sociale-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/social.png" alt="Social" className="social-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ar}</h1>
            <div className="description">
              <p>
                خطر التوتر أو الإجهاد أو النزاع بين العمال، مما قد يضر بالسلامة والأداء الجماعي.
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← خلف
      </button>
    </div>
  );
};

export default AmbianceSocialeArabe;