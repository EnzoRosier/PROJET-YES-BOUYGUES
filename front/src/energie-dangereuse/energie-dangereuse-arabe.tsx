import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseArabe: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleBackClick = () => {
    const returnLang = location.state?.returnLang || 'ar';
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
    <div className="energie-dangereuse-container">
      <audio ref={audioRef} src="/audio/Arabe Littéraire/diapo 15.mp3" />
      
      {/* En-tête avec logo et bouton audio */}
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="Énergie dangereuse" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>طاقة خطيرة</h1>
            <div className="description">
              <p>
                خطر الإصابة بسبب مصادر طاقة غير مسيطرة عليها (كهربائية، هيدروليكية، هوائية، حرارية، إلخ)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton retour */}
      <button className="back-button" onClick={handleBackClick}>
        ← خلف
      </button>
    </div>
  );
};

export default EnergieDangereuseArabe;
