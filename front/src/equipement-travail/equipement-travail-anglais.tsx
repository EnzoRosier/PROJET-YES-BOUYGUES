import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravailAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Work Equipment',
  };

  const getAudioPath = (index = 14) => {
    return `/ressources/audios/Anglais/Anglais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=en`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // On utilise l'élément du DOM directement
      audioRef.current.src = getAudioPath(14);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback en cas d'échec du fichier
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
    <div className="equipement-travail-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="equipement-travail-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="equipement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/equipement.jpg" alt="Equipment" className="equipement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                Risk of accident related to the use, failure or poor maintenance of machines and tools
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

export default EquipementTravailAnglais;