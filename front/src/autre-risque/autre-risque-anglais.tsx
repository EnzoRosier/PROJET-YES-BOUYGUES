import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './autre-risque.css';

const AutreRisqueAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Others',
  };

  // Harmonisation du chemin vers le dossier Anglais - Piste 16
  const getAudioPath = () => '/ressources/audios/Anglais/Anglais_Diapo_16.mp3';

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
    <div className="autre-risque-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="autre-risque-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="Other risks" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                Specific risks not classified elsewhere (presence of asbestos, site traffic, 
                biological risks, etc.)
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

export default AutreRisqueAnglais;