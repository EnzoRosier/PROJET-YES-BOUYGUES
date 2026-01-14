import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailPolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Środowisko pracy',
  };

  // Respect du format : /ressources/audios/Polonais/Polonais Diapo 12  audio.mp3
  const getAudioPath = (index = 12) => {
    return `/ressources/audios/Polonais/Polonais Diapo ${index}  audio.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pl`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source
      audioRef.current.src = getAudioPath(12);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback en cas d'échec du fichier
        if ('speechSynthesis' in window) {
          const text = titleTexts.pl;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pl-PL';
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
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Wszelkie zagrożenia związane ze stanem obiektu (hałas, kurz, pogoda, oświetlenie, ograniczona przestrzeń itp)
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Wstecz
      </button>
    </div>
  );
};

export default EnvironnementTravailPolonais;