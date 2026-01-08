import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialeOurdou: React.FC = () => {
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
      <audio ref={audioRef} src="/audio/Ourdou/13.m4a" />
      
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
            <h1>سماجی ماحول</h1>
            <div className="description">
              <p>
                کارکنوں کے درمیان تناؤ، تناؤ یا تنازعہ کا خطرہ، جو حفاظت اور اجتماعی کارکردگی کو نقصان پہنچا سکتا ہے۔
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← پیچھے
      </button>
    </div>
  );
};

export default AmbianceSocialeOurdou;
