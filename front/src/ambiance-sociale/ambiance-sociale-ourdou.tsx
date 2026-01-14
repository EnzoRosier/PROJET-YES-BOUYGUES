import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialeOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'سماجی ماحول',
  };

  // Harmonisation du chemin vers le dossier Ourdou (index 13, format .m4a)
  const getAudioPath = (index = 13) => {
    return `/ressources/audios/Ourdou/${index}.m4a`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(13);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale Ourdou (ur-PK)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ur;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ur-PK';
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
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                کارکنوں کے درمیان تناؤ، تناؤ یا تنازعہ کا خطرہ، جو حفاظت اور اجتماعی کارکردگی کو نقصان پہنچا سکتا ہے۔
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

export default AmbianceSocialeOurdou;