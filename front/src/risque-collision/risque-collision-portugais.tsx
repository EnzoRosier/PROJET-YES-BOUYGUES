import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-collision.css';

const RisqueCollisionPortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Risco de colisão',
  };

  // Harmonisation du chemin vers le dossier Portugais (Index 9)
  const getAudioPath = () => `/ressources/audios/Portugais/Portugais_Diapo_9.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Erro de áudio detalhado:", error);
        
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
    /* Utilisation des classes "cohesion" pour correspondre à votre fichier CSS fonctionnel */
    <div className="risque-cohesion-container">
      <audio ref={audioRef} preload="auto" />
      
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Áudio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Colisão" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Devido à circulação simultânea de máquinas, veículos e pedestres em áreas às vezes restritas, o que pode levar a choques em caso de falta de visibilidade ou coordenação. 
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

export default RisqueCollisionPortugais;