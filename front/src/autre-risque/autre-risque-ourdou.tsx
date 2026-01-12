import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './autre-risque.css';

const AutreRisqueOurdou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'ur';
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
    <div className="autre-risque-container">
      <audio ref={audioRef} src="/audio/Ourdou/16p.m4a" />
      
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
            <h1>دوسرے</h1>
            <div className="description">
              <p>
                مخصوص خطرات کی درجہ بندی کہیں اور نہیں کی گئی ہے (ایسبیسٹوس کی موجودگی، تعمیراتی جگہ پر ٹریفک، حیاتیاتی خطرات وغیرہ)
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

export default AutreRisqueOurdou;
