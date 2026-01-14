import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Work environment',
  };

  // Harmonisation du chemin vers le dossier Anglais avec index 12
  const getAudioPath = (index = 12) => {
    return `/ressources/audios/Anglais/Anglais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=en`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(12);
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale en cas d'échec du fichier MP3
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
            <img src="/ressources/environnement.png" alt="Work Environment" className="environnement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                All risks related to the conditions of the site (noise, dust, weather, lighting, limited space, etc.)
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

export default EnvironnementTravailAnglais;