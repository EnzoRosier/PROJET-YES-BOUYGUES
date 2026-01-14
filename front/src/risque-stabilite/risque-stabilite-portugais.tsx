import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-stabilite.css';

const RisqueStabilitePortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Risco de estabilidade',
  };

  // Harmonisation du chemin vers le dossier Portugais (index 10)
  // Note : J'ai respecté le nom "DIAPO 10.mp3" tel quel s'il est en majuscules dans votre dossier
  const getAudioPath = (index = 10) => {
    return `/ressources/audios/Portugais/Portugais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(10);
      
      audioRef.current.play().catch((error) => {
        console.error("Erro detalhado de áudio:", error);
        
        // Fallback com síntese de voz (pt-PT)
        if ('speechSynthesis' in window) {
          const text = titleTexts.pt;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pt-PT';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="risque-stabilite-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-stabilite-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-stabilite-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/instable.png" alt="Estabilidade" className="instable-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Perigo de colapso, tombamento ou deslizamento de elementos estruturais, terreno ou equipamentos.
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Voltar
      </button>
    </div>
  );
};

export default RisqueStabilitePortugais;