import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravailAnglais: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'en';
    navigate(`/riskeval?lang=${returnLang}`);
  };


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
      <audio ref={audioRef} src="ressources/audios/Anglais/Anglais_Diapo_14.mp3" />
      
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
            <h1>Work equipment</h1>
            <div className="description">
              <p>
                Risk of accident related to the use, failure or poor maintenance of machines and tools
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← Back
      </button>
    </div>
  );
};

export default EquipementTravailAnglais;
