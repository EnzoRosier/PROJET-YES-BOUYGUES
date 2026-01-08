import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-levage.css';

const RisqueLevageEspagnol: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    audioRef.current = new Audio('/audio/Espagnol/Espagnol_Diapo_8.mp3');
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
            <h1>Riesgo de levantar</h1>
            <div className="description">
              <p>
                Peligro asociado a las operaciones de elevación (grúas, polipastos, carros, etc.) que pueden provocar la caída de objetos, aplastamientos o colisiones.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
};

export default RisqueLevageEspagnol;
