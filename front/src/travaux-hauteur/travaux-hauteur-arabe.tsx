import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurArabe: React.FC = () => {
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
    audioRef.current = new Audio('/audio/Arabe Littéraire/diapo 11.mp3');
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
            <h1>العمل على ارتفاعات</h1>
            <div className="description">
              <p>
               خطر سقوط الأشخاص أو المعدات أثناء العمل على السقالات أو الأسطح أو المنصات
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

export default TravauxHauteurArabe;
