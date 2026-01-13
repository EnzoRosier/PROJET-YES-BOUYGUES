import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './autre-risque.css';

const AutreRisqueOurdou: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ur: 'دوسرے',
  };

  // Harmonisation du chemin vers le dossier Ourdou - Piste 16
  const getAudioPath = () => '/ressources/audios/Ourdou/16p.m4a';

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ur`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("آڈیو چلانے میں غلطی:", error);
        
        // Fallback avec synthèse vocale Ourdou (ur-PK)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ur;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ur-PK';
          window.speechSynthesis.cancel(); // صاف کریں اگر پہلے سے کچھ چل رہا ہو
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="autre-risque-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="autre-risque-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="آڈیو" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="لوگو" className="logo" />
        </div>
      </header>

      <main className="autre-risque-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/autre.png" alt="دوسرے خطرات" className="autre-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ur}</h1>
            <div className="description">
              <p>
                مخصوص خطرات کی درجہ بندی کہیں اور نہیں کی گئی ہے (ایسبیسٹوس کی موجودگی، تعمیراتی جگہ پر ٹریفک، حیاتیاتی خطرات وغیرہ)
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

export default AutreRisqueOurdou;