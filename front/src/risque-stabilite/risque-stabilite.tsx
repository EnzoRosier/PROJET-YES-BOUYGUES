import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabilite: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    fr: 'Risque de Stabilité',
  };

  // Chemin vers le fichier audio français (index 10 pour la stabilité)
  const getAudioPath = (index = 10) => {
    return `/ressources/audios/Français/Français_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=fr`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(10);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale (fr-FR)
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
    <div className="risque-stabilite-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-stabilite-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-stabilite-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/instable.png" alt="Stabilité" className="instable-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.fr}</h1>
            <div className="description">
              <p>
                Danger d’effondrement, de basculement ou de glissement d’éléments de structure, de terrain ou d’équipements.
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

export default RisqueStabilite;