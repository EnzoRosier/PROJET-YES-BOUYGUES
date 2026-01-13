import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevageOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'اٹھانے کا خطرہ',
  };

  // Chemin vers le fichier audio Ourdou (format .m4a et index 8)
  const getAudioPath = (index = 8) => {
    return `/ressources/audios/Ourdou/${index}.m4a`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source
      audioRef.current.src = getAudioPath(8);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale Ourdou (ur-PK)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ur;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ur-PK';
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
            <img src="/ressources/grue.png" alt="Levage" className="grue-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                لفٹنگ آپریشنز (کرین، لہرانے، ٹرالیاں وغیرہ) سے وابستہ خطرہ، جو گرنے والی اشیاء، کچلنے یا تصادم کا باعث بن سکتا ہے۔
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← پیچھے
      </button>
    </div>
  );
};

export default RisqueLevageOurdou;