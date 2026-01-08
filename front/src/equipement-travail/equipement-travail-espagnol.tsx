import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravailEspagnol: React.FC = () => {
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
    <div className="equipement-travail-container">
      <audio ref={audioRef} src="/audio/Espagnol/Espagnol_Diapo_14.mp3" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="equipement-travail-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="equipement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/equipement.jpg" alt="Équipement de travail" className="equipement-image" />
          </div>
          <div className="text-section">
            <h1>Equipo de Trabajo</h1>
            <div className="description">
              <p>
                Riesgo de accidente relacionado con el uso, fallo o mal mantenimiento de máquinas y herramientas
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Atrás
      </button>
    </div>
  );
};

export default EquipementTravailEspagnol;
