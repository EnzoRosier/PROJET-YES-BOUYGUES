import React, { useState, useRef, useEffect } from 'react';
import './Survey.css';
import './Smiley.css'
import { Link, useNavigate } from 'react-router-dom';
import PopupCommentaire from '../popup-commentaire/popup-commentaire';

const smiles = [
  { id: 0, label: 'Très insatisfait', image: '/images/Smiley_Angry.png', color: '#e74c3c' }, // ID 0 -> MAUVAIS
  { id: 1, label: 'Neutre', image: '/images/Smiley_Normal.png', color: '#f1c40f' },          // ID 1 -> MOYEN
  { id: 2, label: 'Très satisfait', image: '/images/Smiley_Happy.png', color: '#2ecc71' },  // ID 2 -> BIEN
];

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', name: 'English', flag: '🇬🇧', short: 'GB' },
  { code: 'es', name: 'Español', flag: '🇪🇸', short: 'ES' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', short: 'PT' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', short: 'SA' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', short: 'PK' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', short: 'PL' },
];

const questionTexts: Record<string, string> = {
  fr: 'Quelle est votre humeur en cette fin de journée ?',
  en: 'What is your mood at the end of the day?',
  es: '¿Cuál es su estado de ánimo al final del día?',
  pt: 'Qual é o seu état d\'esprit no final do dia?',
  ar: 'ما هو مزاجك في نهاية هذا اليوم؟',
  ur: 'دن کے آخر میں آپ کا مزاج کیسا है؟',
  pl: 'Jaki jest Twój nastrój pod koniec dnia?',
};

const WORKSITE_ID_PLACEHOLDER = "4aef3bc5-6637-40f6-b7f2-e613e0744efd";

export default function Survey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const [visible, setVisible] = useState(false);
  const [commentaire, setCommentaire] = useState('');
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);
  
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const speakQuestion = (lang: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audioPath = `./ressources/audios/${lang}/${lang}_2.mp3`;
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    audio.play().catch((error) => console.error("Erreur audio :", error));
  };

  const handleLangSelect = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
  };

  // Logique d'envoi des données
  const handleConfirm = async () => {
    if (selected === null) {
      setShowNoSelectionModal(true);
      return;
    }

    const moodMapping: Record<number, string> = {
      0: "MAUVAIS",
      1: "MOYEN",
      2: "BIEN"
    };

    const today = new Date().toISOString().split('T')[0];

    const voteData = {
      numQuestion: "1",
      reponse: moodMapping[selected] || "INCONNU", 
      commentaire: commentaire,
      date: today,
      worksiteId: WORKSITE_ID_PLACEHOLDER,
      dateCloture: ""
    };

    try {
      const response = await fetch('http://localhost:3001/vote/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        navigate('../riskeval');
      } else {
        alert("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  return (
    <div className="survey-root">
      <img className="brand-badge" src="/images/Bouygues_bat.png" alt="Bouygues" />
      
      <header className="survey-header">
        <div className="lang-menu">
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
            <span className="flag">{languages.find(l => l.code === currentLang)?.flag}</span>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
                  onClick={() => handleLangSelect(lang.code)}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <Link to="../login"><button className="admin-btn">🔒</button></Link>
      </header>

      <main className="survey-main">
        <h1 className="question">
          {questionTexts[currentLang] || questionTexts.fr}
          <button className="audio-btn" onClick={() => speakQuestion(currentLang)}>🔊</button>
        </h1>

        <div className="smile-row">
          {smiles.map((s) => (
            <button
              key={s.id}
              className={`smile ${selected === s.id ? 'selected' : ''}`}
              onClick={() => setSelected(s.id)}
            >
              <img src={s.image} alt={s.label} className="smile-image" />
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="confirm" onClick={handleConfirm}>Confirmer</button>
          <button className="develop" onClick={() => setVisible(true)}>Je développe</button>
        </div>

        <Link to="../"><button className="back-btn">←</button></Link>

        {visible && (
          <PopupCommentaire 
            onClose={() => setVisible(false)} 
            setCommentaire={setCommentaire} 
            commentaire={commentaire}
          />
        )}
      </main>

      {showNoSelectionModal && (
        <div className="modal-overlay" onClick={() => setShowNoSelectionModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Sélection requise</h3>
            <p>Veuillez sélectionner un smiley.</p>
            <button className="modal-close" onClick={() => setShowNoSelectionModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}