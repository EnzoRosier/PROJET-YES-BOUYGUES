import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    es: 'Entorno de trabajo',
  };

  // Harmonisation du chemin vers le dossier Espagnol
  const getAudioPath = (index = 12) => {
    return `/ressources/audios/Espagnol/Espagnol_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=es`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source
      audioRef.current.src = getAudioPath(12);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale en cas d'échec du fichier MP3
        if ('speechSynthesis' in window) {
          const text = titleTexts.es;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'es-ES';
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
            <img src="/ressources/environnement.png" alt="Entorno" className="environnement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.es}</h1>
            <div className="description">
              <p>
                Todos los riesgos relacionados con las condiciones del lugar (ruido, polvo, clima, iluminación, espacio limitado, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Atrás
      </button>
    </div>
  );
};

export default EnvironnementTravailEspagnol;