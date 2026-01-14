import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereusePortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Energia perigosa',
  };

  // Harmonisation du chemin selon le nouveau format : Portugais_Diapo_15.mp3
  const getAudioPath = () => `/ressources/audios/Portugais/Portugais_Diapo_15.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Erro de áudio detalhado:", error);
        
        // Fallback com síntese de voz (pt-PT)
        if ('speechSynthesis' in window) {
          const text = titleTexts.pt;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pt-PT';
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
          <img src="/ressources/audio.png" alt="Áudio" className="audio-icon" />
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
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Risco de lesão devido a fontes de energia não controladas (elétrica, hidráulica, pneumática, térmica, etc.)
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Voltar
      </button>
    </div>
  );
};

export default EnergieDangereusePortugais;