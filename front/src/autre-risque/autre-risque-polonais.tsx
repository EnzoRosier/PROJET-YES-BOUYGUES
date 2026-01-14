import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './autre-risque.css';

const AutreRisquePolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Inne',
  };

  // Harmonisation du chemin selon le format : Polonais_Diapo_16.mp3
  const getAudioPath = () => `/ressources/audios/Polonais/Polonais_Diapo_16.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pl`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Błąd odtwarzania dźwięku:", error);
        
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
    <div className="autre-risque-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="autre-risque-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="Inne" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Specyficzne zagrożenia niesklasyfikowane gdzie indziej (obecność azbestu, ruch na budowie, zagrożenia biologiczne itp.)
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

export default AutreRisquePolonais;