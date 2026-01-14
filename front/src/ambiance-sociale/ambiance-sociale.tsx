import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSociale: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    fr: 'Ambiance Sociale',
  };

  // Harmonisation du chemin vers le dossier Français (index 13)
  const getAudioPath = (index = 13) => {
    return `/ressources/audios/Français/Français_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=fr`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(13);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale (fr-FR)
        if ('speechSynthesis' in window) {
          const text = titleTexts.fr;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'fr-FR';
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
            <h1>{titleTexts.fr}</h1>
            <div className="description">
              <p>
                Risque de tension, stress ou conflit entre travailleurs, pouvant nuire à la sécurité et à la performance collective
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

export default AmbianceSociale;