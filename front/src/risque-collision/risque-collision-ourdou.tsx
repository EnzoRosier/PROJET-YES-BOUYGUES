import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-collision.css';

const RisqueCollisionOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'تصادم کا خطرہ',
  };

  // Harmonisation du chemin vers le dossier Ourdou (Index 9)
  const getAudioPath = () => `/ressources/audios/Ourdou/9.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Detailed audio error:", error);
        
        // Fallback avec synthèse vocale Ourdou (ur-PK)
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
    /* Utilisation des classes "cohesion" pour correspondre à votre fichier CSS fonctionnel */
    <div className="risque-cohesion-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="تصادم" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                بعض اوقات محدود علاقوں میں مشینری، گاڑیوں اور پیدل چلنے والوں کی بیک وقت نقل و حرکت کی وجہ سے، کمزور مرئیت یا ہم آہنگی کی کمی کی صورت میں تصادم ہو سکتا ہے۔
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

export default RisqueCollisionOurdou;