import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titleTexts: Record<string, string> = {
    ur: 'اونچائی پر کام',
  };

  // Chemin vers le fichier audio Ourdou (format .m4a et index 11)
  const getAudioPath = (index = 11) => {
    return `/ressources/audios/Ourdou/${index}.m4a`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source
      audioRef.current.src = getAudioPath(11);
      
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
    <div className="travaux-hauteur-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="اونچائی پر کام" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                سہاروں، چھتوں یا پلیٹ فارم پر کام کے دوران لوگوں یا سامان کے گرنے کا خطرہ
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

export default TravauxHauteurOurdou;