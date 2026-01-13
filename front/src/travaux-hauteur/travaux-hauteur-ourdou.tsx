import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurOurdou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'ur';
    navigate(`/riskeval?lang=${returnLang}`);
  };

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    audioRef.current = new Audio('ressources/audios/Ourdou/11.m4a');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="travaux-hauteur-container">
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="Échafaudage" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>اونچائی پر کام کریں۔</h1>
            <div className="description">
              <p>
                سہاروں، چھتوں یا پلیٹ فارم پر کام کے دوران لوگوں یا سامان کے گرنے کا خطرہ
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={handleBackClick}>
        ← پیچھے
      </button>
    </div>
  );
};

export default TravauxHauteurOurdou;
