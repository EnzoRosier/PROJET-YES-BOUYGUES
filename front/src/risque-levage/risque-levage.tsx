import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'fr';
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
    audioRef.current = new Audio('/audio/Français/Français_Diapo_8.mp3');
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
            <h1>Risque de Levage</h1>
            <div className="description">
              <p>
                Danger lié aux opérations de levage de charges (grues, palans, chariots, etc.), pouvant entraîner chutes d’objets, écrasements ou collisions
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Retour
      </button>
    </div>
  );
};

export default RisqueLevage;
