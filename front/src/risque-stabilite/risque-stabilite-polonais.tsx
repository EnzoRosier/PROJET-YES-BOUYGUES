import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabilitePolonais: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'pl';
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
    audioRef.current = new Audio('/audio/Polonais/Polonais Diapo 10 audio.mp3');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="risque-stabilite-container">
      <header className="risque-stabilite-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="risque-stabilite-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/instable.png" alt="Risque de stabilité" className="instable-image" />
          </div>
          <div className="text-section">
            <h1>Ryzyko stabilności</h1>
            <div className="description">
              <p>
                Niebezpieczeństwo zawalenia się, przechylenia lub poślizgu elementów konstrukcyjnych, terenu lub sprzętu.
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={handleBackClick}>
        ← Wrócić
      </button>
    </div>
  );
};

export default RisqueStabilitePolonais;
