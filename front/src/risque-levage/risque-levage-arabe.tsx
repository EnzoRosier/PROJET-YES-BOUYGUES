import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevageArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ar: 'مخاطر عمليات الرفع',
  };

  // Harmonisation du chemin : racine "/" + dossier spécifique Arabe Littéraire
  const getAudioPath = (index = 8) => {
    return `/ressources/audios/Arabe Littéraire/diapo ${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ar`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(8);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale (ar-SA)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ar;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ar-SA';
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
            <img src="/ressources/grue.png" alt="الرفع" className="grue-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ar}</h1>
            <div className="description">
              <p>
                الخطر المرتبط بعمليات الرفع (الرافعات، والأوناش، والعربات، وما إلى ذلك)، والذي يمكن أن يؤدي إلى سقوط الأشياء أو سحقها أو اصطدامها.
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

export default RisqueLevageArabe;