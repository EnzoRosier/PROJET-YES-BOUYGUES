import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseOurdou: React.FC = () => {
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
    <div className="energie-dangereuse-container">
      <audio ref={audioRef} src="/audio/Ourdou/15.m4a" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="Énergie dangereuse" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>خطرناک توانائی</h1>
            <div className="description">
              <p>
               توانائی کے بے قابو ذرائع (الیکٹریکل، ہائیڈرولک، نیومیٹک، تھرمل وغیرہ) کی وجہ سے چوٹ لگنے کا خطرہ
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

export default EnergieDangereuseOurdou;
