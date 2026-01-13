import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-collision.css';

const RisqueCollisionAnglais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    en: 'Risk of Collision',
  };

  // Harmonisation du chemin vers le dossier Anglais (Index 9)
  const getAudioPath = () => `/ressources/audios/Anglais/Anglais_Diapo_9.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=en`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
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
    /* Utilisation des classes "cohesion" pour maintenir le CSS fonctionnel */
    <div className="risque-cohesion-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Collision" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.en}</h1>
            <div className="description">
              <p>
                Due to the simultaneous movement of machines, vehicles and pedestrians in sometimes restricted areas, which can lead to shocks in case of lack of visibility or coordination. 
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

export default RisqueCollisionAnglais;