import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialeArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="ambiance-sociale-container">
      <audio ref={audioRef} src="/audio/Arabe Littéraire/diapo 13.mp3" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="ambiance-sociale-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="ambiance-sociale-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/social.png" alt="Ambiance sociale" className="social-image" />
          </div>
          <div className="text-section">
            <h1>البيئة الاجتماعية</h1>
            <div className="description">
              <p>
                خطر التوتر أو الإجهاد أو النزاع بين العمال، مما قد يضر بالسلامة والأداء الجماعي.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← خلف
      </button>
    </div>
  );
};

export default AmbianceSocialeArabe;
