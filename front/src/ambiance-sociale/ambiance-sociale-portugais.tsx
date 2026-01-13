import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ambiance-sociale.css';

const AmbianceSocialePortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Ambiente social',
  };

  // Harmonisation du chemin vers le dossier Portugais (index 13)
  const getAudioPath = (index = 13) => {
    return `/ressources/audios/Portugais/Portugais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Attribution de la source audio
      audioRef.current.src = getAudioPath(13);
      
      audioRef.current.play().catch((error) => {
        console.error('Erro de áudio:', error);
        
        // Fallback com síntese de voz (pt-PT)
        if ('speechSynthesis' in window) {
          const text = titleTexts.pt;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'pt-PT';
          window.speechSynthesis.cancel(); // Limpa leituras anteriores
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    <div className="ambiance-sociale-container">
      {/* Elemento de áudio preparado para interação */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="ambiance-sociale-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Áudio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="ambiance-sociale-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/social.png" alt="Ambiente social" className="social-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Risco de tensão, estresse ou conflito entre trabalhadores, que pode prejudicar a segurança e o desempenho coletivo
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

export default AmbianceSocialePortugais;