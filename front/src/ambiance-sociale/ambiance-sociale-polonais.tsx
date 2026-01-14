import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialePolonais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pl: 'Środowisko społeczne',
  };

  // Harmonisation du chemin vers le dossier Polonais (index 13)
  const getAudioPath = (index = 13) => {
    return `/ressources/audios/Polonais/Polonais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pl`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(13);
      
      audioRef.current.play().catch((error) => {
        console.error('Błąd audio :', error);
        
        // Fallback z syntezą mowy (pl-PL)
        if ('speechSynthesis' in window) {
          const text = titleTexts.pl;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pl-PL';
          window.speechSynthesis.cancel(); // Czyści poprzednie nagrania
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="ambiance-sociale-container">
      {/* Element audio przygotowany do interakcji */}
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
            <img src="/ressources/social.png" alt="Środowisko społeczne" className="social-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pl}</h1>
            <div className="description">
              <p>
                Ryzyko napięć, stresu lub konfliktów między pracownikami, które mogą zaszkodzić bezpieczeństwu i wydajności zespołowej
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

export default AmbianceSocialePolonais;