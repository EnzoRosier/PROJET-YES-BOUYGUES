import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './energie-dangereuse.css';

const EnergieDangereuseArabe: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    ar: 'طاقة خطيرة',
  };

  // Harmonisation du chemin vers le dossier Arabe Littéraire - Piste 15
  const getAudioPath = () => '/ressources/audios/Arabe Littéraire/diapo 15.mp3';

  const handleBackClick = () => {
    navigate(`/riskeval?lang=ar`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("خطأ في تشغيل الصوت:", error);
        
        // Fallback avec synthèse vocale (ar-SA)
        if ('speechSynthesis' in window) {
          const text = titleTexts.ar;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ar-SA';
          window.speechSynthesis.cancel(); // تنظيف أي قراءات جارية
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="energie-dangereuse-container">
      {/* عنصر الصوت جاهز للتفاعل */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="energie-dangereuse-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="الصوت" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="الشعار" className="logo" />
        </div>
      </header>

      <main className="energie-dangereuse-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/energie.png" alt="طاقة" className="energie-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.ar}</h1>
            <div className="description">
              <p>
                خطر الإصابة بسبب مصادر طاقة غير مسيطرة عليها (كهربائية، هيدروليكية، هوائية، حرارية، إلخ)
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← خلف
      </button>
    </div>
  );
};

export default EnergieDangereuseArabe;