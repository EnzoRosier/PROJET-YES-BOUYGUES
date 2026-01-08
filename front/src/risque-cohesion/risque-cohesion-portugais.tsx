import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './risque-cohesion.css';

const RisqueCohesionPortugais: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioClick = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
    }
    audioRef.current = new Audio('/audio/Portugais/diapo 9.mp3');
    audioRef.current.play().catch(error => {
      console.error("Erreur lors de la lecture de l'audio:", error);
    });
  };

  return (
    <div className="risque-cohesion-container">
      <header className="risque-cohesion-header">
        <button className="audio-button" onClick={handleAudioClick}>
          <img src="/ressources/audio.png" alt="Audio" className="audio-icon" />
        </button>
        <div className="logo-container">
          <img src="/ressources/logo.png" alt="Logo Bouygues" className="logo" />
        </div>
      </header>
      <main className="risque-cohesion-content">
        <div className="content-wrapper">
          <div className="image-section">
            <img src="/ressources/cohesion.png" alt="Cohésion d'équipe" className="cohesion-image" />
          </div>
          <div className="text-section">
            <h1>Risque de Cohésion</h1>
            <div className="description">
              <p>
                Risque lié à un manque de coordination ou de communication entre équipes, pouvant provoquer des erreurs ou accidents
              </p>
              <h2>Principaux risques :</h2>
              <ul>
                <li><strong>Manque de communication :</strong> Informations importantes non transmises entre les équipes</li>
                <li><strong>Coordination défaillante :</strong> Interventions simultanées non planifiées créant des situations dangereuses</li>
                <li><strong>Incompréhension des consignes :</strong> Barrières linguistiques ou instructions mal comprises</li>
                <li><strong>Isolement des travailleurs :</strong> Manque de soutien et d'entraide entre collègues</li>
                <li><strong>Conflits interpersonnels :</strong> Tensions nuisant à la concentration et à la sécurité</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
    </div>
  );
};

export default RisqueCohesionPortugais;
