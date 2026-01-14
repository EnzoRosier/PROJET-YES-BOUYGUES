import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './travaux-hauteur.css';

const TravauxHauteurPortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Trabalho em altura',
  };

  // Harmonisation du chemin vers le dossier Portugais (index 11)
  const getAudioPath = (index = 11) => {
    return `/ressources/audios/Portugais/Portugais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(11);
      
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
    <div className="travaux-hauteur-container">
      {/* L'élément audio est prêt, on lui donnera sa source au clic */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="travaux-hauteur-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="travaux-hauteur-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/echaffaudage.png" alt="Andaimes" className="echaffaudage-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Risco de queda de pessoas ou material durante trabalhos em andaimes, telhados ou plataformas
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

export default TravauxHauteurPortugais;