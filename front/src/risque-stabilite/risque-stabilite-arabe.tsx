import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabiliteArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    audioRef.current = new Audio('/audio/Arabe Littéraire/diapo 10.mp3');
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
            <h1>خطر الاستقرار</h1>
            <div className="description">
              <p>
                خطر الانهيار أو الانقلاب أو الانزلاق لعناصر الهيكل أو الأرض أو المعدات
              </p>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← خلف
      </button>
    </div>
  );
};

export default RisqueStabiliteArabe;
