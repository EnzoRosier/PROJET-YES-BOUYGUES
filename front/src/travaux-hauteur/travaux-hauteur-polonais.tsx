import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurPolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Praca na wysokości',
  };

  const getAudioPath = (index = 11) => {
    return `/ressources/audios/Polonais/Polonais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pl`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(11);
      
      audioRef.current.play().catch((error) => {
        console.error("Szczegółowy błąd audio:", error);
        
        // Fallback z syntezą mowy (pl-PL)
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
    <div className="travaux-hauteur-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="Rusztowania" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Ryzyko upadków ludzi lub sprzętu podczas pracy na rusztowaniach, dachach lub platformach
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

export default TravauxHauteurPolonais;