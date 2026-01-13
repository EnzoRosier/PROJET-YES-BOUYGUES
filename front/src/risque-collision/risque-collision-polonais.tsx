import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-collision.css';

const RisqueCollisionPolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Ryzyko kolizji',
  };

  // Harmonisation du chemin vers le dossier Polonais (Index 9)
  const getAudioPath = () => `/ressources/audios/Polonais/Polonais_Diapo_9.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pl`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Szczegółowy błąd audio:", error);
        
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
    /* Utilisation des classes "cohesion" pour correspondre à votre fichier CSS fonctionnel */
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
            <img src="/ressources/cohesion.png" alt="Kolizja" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Ze względu na jednoczesny ruch maszyn, pojazdów i pieszych w obszarach czasami o ograniczonym dostępie, co może prowadzić do zderzeń w przypadku braku widoczności lub koordynacji. 
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

export default RisqueCollisionPolonais;