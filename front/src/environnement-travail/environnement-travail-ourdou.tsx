import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'کام کا ماحول',
  };

  // Format spécifique Ourdou : dossier Ourdou + extension .m4a
  const getAudioPath = (index = 11) => {
    return `/ressources/audios/Ourdou/${index}.m4a`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source (index 11 pour l'environnement en Ourdou)
      audioRef.current.src = getAudioPath(11);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale en cas d'échec
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
    <div className="environnement-travail-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="environnement-travail-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="environnement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/environnement.png" alt="Environnement" className="environnement-image" />
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

export default EnvironnementTravailOurdou;