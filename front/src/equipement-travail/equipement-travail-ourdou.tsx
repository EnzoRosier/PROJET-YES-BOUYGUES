import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './equipement-travail.css';

const EquipementTravailOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'کام کا سامان',
  };

  const getAudioPath = (index = 14) => {
    return `/ressources/audios/Ourdou/${index}.m4a`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // On utilise l'élément du DOM directement
      audioRef.current.src = getAudioPath(14);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback en cas d'échec du fichier
        if ('speechSynthesis' in window) {
          const text = titleTexts.ur;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ur-PK';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="equipement-travail-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="equipement-travail-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="equipement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/equipement.jpg" alt="Équipement" className="equipement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                مشینوں اور اوزاروں کے استعمال، ناکامی یا ناقص دیکھ بھال سے متعلق حادثے کا خطرہ
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

export default EquipementTravailOurdou;