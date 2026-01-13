import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuse: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    fr: 'Énergie Dangereuse',
  };

  // Harmonisation du chemin vers le dossier Français (avec ç) - Piste 15
  const getAudioPath = () => `/ressources/audios/Français/Français_Diapo_15.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=fr`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        if ('speechSynthesis' in window) {
          const text = titleTexts.fr;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'fr-FR';
          window.speechSynthesis.cancel(); 
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
            <img src="/ressources/energie.png" alt="Énergie" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.fr}</h1>
            <div className="description">
              <p>
                Risque de blessure dû à des sources d’énergie non maîtrisées (électrique, hydraulique, pneumatique, thermique, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Retour
      </button>
    </div>
  );
};

export default EnergieDangereuse;