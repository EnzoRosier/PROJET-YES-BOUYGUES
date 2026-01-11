import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevageOurdou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'ur';
    navigate(`/riskeval?lang=${returnLang}`);
  };

  const handleAudioClick = () => {
    if (audioRef.current) {
      // Si l'audio est en train de jouer, on l'arrête
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    
    // Créer et jouer le nouvel audio
    audioRef.current = new Audio('/audio/Ourdou/8.m4a');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="risque-levage-container">
      {/* En-tête avec logo et bouton audio */}
      <header className="risque-levage-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="risque-levage-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/grue.png" alt="Grue" className="grue-image" />
          </div>
          <div className="text-section">
            <h1>اٹھانے کا خطرہ</h1>
            <div className="description">
              <p>
                لفٹنگ آپریشنز (کرین، لہرانے، ٹرالیاں وغیرہ) سے وابستہ خطرہ، جو گرنے والی اشیاء، کچلنے یا تصادم کا باعث بن سکتا ہے۔
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← پیچھے
      </button>
    </div>
  );
};

export default RisqueLevageOurdou;
