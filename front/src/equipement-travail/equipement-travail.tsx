import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravail: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    fr: 'Équipement de Travail',
  };

  const getAudioPath = (index = 14) => {
    return `/ressources/audios/Français/Français_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    // Retour vers la racine avec le paramètre de langue fr
    navigate(`/riskeval?lang=fr`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // On utilise l'élément du DOM directement
      audioRef.current.src = getAudioPath(14);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback en cas d'échec du fichier (Synthèse vocale)
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
            <img src="/ressources/equipement.jpg" alt="Équipement" className="equipement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.fr}</h1>
            <div className="description">
              <p>
                Risque d’accident lié à l’utilisation, la défaillance ou la mauvaise maintenance des machines et outils
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

export default EquipementTravail;