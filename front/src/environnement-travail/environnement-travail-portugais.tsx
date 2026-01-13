import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './environnement-travail.css';

const EnvironnementTravailPortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const titleTexts: Record<string, string> = {
    pt: 'Ambiente de trabalho',
  };

  // Harmonisation du chemin : racine "/" + structure de nommage standardisée
  // J'ai gardé l'index 12 comme dans votre source
  const getAudioPath = (index = 12) => {
    return `/ressources/audios/Portugais/Portugais_Diapo_${index}.mp3`;
  };

  const handleBackClick = () => {
    navigate(`/riskeval?lang=pt`);
  };

  const speakQuestion = () => {
    if (audioRef.current) {
      // Chargement de la source
      audioRef.current.src = getAudioPath(12);
      
      audioRef.current.play().catch((error) => {
        console.error("Erreur audio détaillée :", error);
        
        // Fallback avec synthèse vocale en cas d'échec du fichier MP3
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
    <div className="environnement-travail-container">
      {/* L'élément audio est prêt pour l'interaction */}
      <audio ref={audioRef} preload="auto" />
      
      <header className="environnement-travail-header">
        <button className="audio-button" onClick={speakQuestion}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button> 
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="environnement-travail-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/environnement.png" alt="Ambiente" className="environnement-image" />
          </div>
          <div className="text-section">
            <h1>{titleTexts.pt}</h1>
            <div className="description">
              <p>
                Todos os riscos relacionados com as condições do local (ruído, poeiras, clima, iluminação, espaço limitado, etc.).
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

export default EnvironnementTravailPortugais;