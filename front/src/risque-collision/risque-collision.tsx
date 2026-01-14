import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-collision.css';

const RisqueCollision: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    fr: 'Risque de Collision',
  };

  // Harmonisation du chemin vers le dossier Français (Piste 9)
  const getAudioPath = () => `/ressources/audios/Français/Français_Diapo_9.mp3`;

  const handleBackClick = () => {
    navigate(`/riskeval?lang=fr`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      audioRef.current.src = getAudioPath();
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        if ('speechSynthesis' in window) {
          const text = titleTexts.fr;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'fr-FR';
          window.speechSynthesis.cancel(); 
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  };

  return (
    /* Utilisation des classes "cohesion" pour correspondre à votre CSS fonctionnel */
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
            <img src="/ressources/cohesion.png" alt="Collision" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.fr}</h1>
            <div className="description">
              <p>
                Dû à la circulation simultanée des engins, des véhicules et des piétons dans des zones parfois restreintes, ce qui peut entraîner des chocs en cas de manque de visibilité ou de coordination. 
              </p>
            </div>
          </div>
        </div>
      </main>

      <button className="back-button" onClick={handleBackClick}>
        ← Retour
      </button>
    </div>
  );
};

export default RisqueCollision;