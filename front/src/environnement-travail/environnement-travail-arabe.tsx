import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ar: 'بيئة العمل',
  };

  // Harmonisation du chemin : racine "/" + dossier spécifique Arabe Littéraire
  // Utilisation de l'index 11 (souvent utilisé pour l'environnement dans vos fichiers)
  const getAudioPath = (index = 11) => {
    return `/ressources/audios/Arabe Littéraire/diapo ${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ar`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(11);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale en cas d'échec du fichier MP3
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
            <img src="/ressources/environnement.png" alt="Environnement" className="environnement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ar}</h1>
            <div className="description">
              <p>
                جميع المخاطر المتعلقة بظروف الموقع (الضوضاء، الغبار، الطقس، الإضاءة، المساحة المحدودة، إلخ).
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

export default EnvironnementTravailArabe;