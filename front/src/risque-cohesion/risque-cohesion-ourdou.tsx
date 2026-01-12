import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-cohesion.css';

const RisqueCohesionOurdou: React.FC = () => {
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
    audioRef.current = new Audio('/audio/Ourdou/9.m4a');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="risque-cohesion-container">
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Cohésion d'équipe" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>ہم آہنگی کا خطرہ</h1>
            <div className="description">
              <p>
                ٹیموں کے درمیان ہم آہنگی یا مواصلات کی کمی سے منسلک خطرہ، جو غلطیوں یا حادثات کا باعث بن سکتا ہے۔
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

export default RisqueCohesionOurdou;
