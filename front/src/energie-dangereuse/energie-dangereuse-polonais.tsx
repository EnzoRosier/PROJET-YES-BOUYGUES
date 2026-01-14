import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereusePolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Niebezpieczna energia',
  };

  // Harmonisation du chemin selon le format : Polonais_Diapo_15.mp3
  const getAudioPath = () => `/ressources/audios/Polonais/Polonais_Diapo_15.mp3`;

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
            <img src="/ressources/energie.png" alt="Energia" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Ryzyko obrażeń z powodu niekontrolowanych źródeł energii (elektrycznej, hydraulicznej, pneumatycznej, termicznej itp)
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

export default EnergieDangereusePolonais;