import React, { useState, useRef, useEffect } from 'react';
import './Survey.css';
import './Smiley.css'
import { Link, useNavigate } from 'react-router-dom';
import PopupCommentaire from '../popup-commentaire/popup-commentaire';

const smiles = [
  { id: 0, label: 'Très insatisfait', image: '/images/Smiley_Angry.png', color: '#e74c3c' },
  { id: 1, label: 'Neutre', image: '/images/Smiley_Normal.png', color: '#f1c40f' },
  { id: 2, label: 'Très satisfait', image: '/images/Smiley_Happy.png', color: '#2ecc71' },
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
  pt: 'Qual é o seu estado de espírito no final do dia?',
  ar: 'ما هو مزاجك في نهاية هذا اليوم؟',
  ur: 'دن کے آخر میں آپ کا مزاج کیسا है؟',
  pl: 'Jaki jest Twój nastrój pod koniec dnia?',
};

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
    alert(audioPath);

    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error("Erreur lors de la lecture du fichier audio :", error);
      alert("Le fichier audio pour cette langue est introuvable ou illisible.");
    });
  };

  const handleLangSelect = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
  };

  return (
    <div className="survey-root">
      <img className="brand-badge" src="/images/Bouygues_bat.png" alt="Bouygues" aria-hidden="true" />
      
      <header className="survey-header">
        <div className="lang-menu">
          <button 
            className="lang-btn" 
            aria-label="Sélectionner la langue"
            onClick={() => setLangOpen(!langOpen)}
          >
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

        <Link to="../login">
          <button className="admin-btn">🔒</button>
        </Link>
      </header>

      <main className="survey-main">
        <h1 className="question">
          {questionTexts[currentLang] || questionTexts.fr}
          <button
            type="button"
            className="audio-btn"
            aria-label="Lire la question"
            onClick={() => speakQuestion(currentLang)}
          >
            🔊
          </button>
        </h1>

        <div className="smile-row" role="list">
          {smiles.map((s) => (
            <button
              key={s.id}
              className={`smile ${selected === s.id ? 'selected' : ''}`}
              onClick={() => setSelected(s.id)}
              aria-label={s.label}
            >
              <img src={s.image} alt={s.label} className="smile-image" />
            </button>
          ))}
        </div>

        <div className="actions">
          <button
            className="confirm"
            onClick={() => {
              if (selected === null) {
                setShowNoSelectionModal(true);
                return;
              }
              const selectedSmile = smiles.find(s => s.id === selected);
              alert(`Réponse enregistrée : ${selectedSmile?.label}`);
              navigate('../riskeval');
            }}
          >
            Confirmer
          </button>

          <button className="develop" onClick={() => setVisible(true)}>Je développe</button>
        </div>

        <Link to="../">
          <button className="back-btn" aria-label="Retour">←</button>
        </Link>

        <div>
          {visible && (
            <PopupCommentaire 
              onClose={() => setVisible(false)} 
              setCommentaire={setCommentaire} 
              commentaire={commentaire}
            />
          )}
        </div>
      </main>

      {showNoSelectionModal && (
        <div className="modal-overlay" onClick={() => setShowNoSelectionModal(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title">Sélection requise</h3>
            <p>Veuillez sélectionner une appréciation avant de confirmer.</p>
            <div className="modal-actions">
              <button
                className="modal-close"
                onClick={() => setShowNoSelectionModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}