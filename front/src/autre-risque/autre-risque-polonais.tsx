import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './autre-risque.css';

const AutreRisquePolonais: React.FC = () => {
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
    <div className="autre-risque-container">
      <audio ref={audioRef} src="/audio/Polonais/Polonais Diapo 16 audio.mp3" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="autre-risque-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="Autres risques" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>Innych</h1>
            <div className="description">
              <p>
                Ryzyko obrażeń z powodu niekontrolowanych źródeł energii (elektrycznej, hydraulicznej, pneumatycznej, termicznej itp)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Wstecz
      </button>
    </div>
  );
};

export default AutreRisquePolonais;
