import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Dangerous energy',
  };

  // Harmonisation du chemin vers le dossier Anglais - Piste 15
  const getAudioPath = () => '/ressources/audios/Anglais/Anglais_Diapo_15.mp3';

  const handleBackClick = () => {
    navigate(`/riskeval?lang=en`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
        
        // Fallback with speech synthesis (en-GB)
        if ('speechSynthesis' in window) {
          const text = titleTexts.en;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-GB';
          window.speechSynthesis.cancel(); // Clear any ongoing speech
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="energie-dangereuse-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="Dangerous energy" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                Risk of injury due to uncontrolled energy sources (electrical, hydraulic, pneumatic, thermal, etc.)
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

export default EnergieDangereuseAnglais;