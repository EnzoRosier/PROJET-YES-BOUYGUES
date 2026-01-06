import React, { useState } from 'react';
import './Survey.css';

const smiles = [
  { id: 0, label: 'Très insatisfait', image: '/images/Smiley_Angry.png', color: '#e74c3c' },
  { id: 1, label: 'Neutre', image: '/images/Smiley_Normal.png', color: '#f1c40f' },
  { id: 2, label: 'Très satisfait', image: '/images/Smiley_Happy.png', color: '#2ecc71' },
];

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' },
  { code: 'en', name: 'English', flag: '🇬🇧', short: 'GB' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', short: 'PT' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', short: 'TR' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', short: 'SA' },
  { code: 'es', name: 'Español', flag: '🇪🇸', short: 'ES' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', short: 'PK' },
];

const questionTexts: Record<string, string> = {
  fr: 'Pensez-vous être protégé des 6 risques majeurs ?',
  en: 'Do you feel protected from the 6 major risks?',
  pt: 'Você se sente protegido contra os 6 maiores riscos?',
  tr: '6 büyük riskten korunduğunuzu düşünüyor musunuz?',
  ar: 'هل تشعر أنك محمي من المخاطر الستة الرئيسية؟',
  es: '¿Se siente protegido de los 6 riesgos principales?',
  ur: 'کیا آپ محسوس کرتے ہیں کہ آپ 6 بڑے خطرات سے محفوظ ہیں؟',
};

export default function Survey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const speakQuestion = (lang: string) => {
    const text = questionTexts[lang] || questionTexts.fr;
    if (!('speechSynthesis' in window)) {
      alert('Synthèse vocale non supportée par votre navigateur.');
      return;
    }
    // Cancel any ongoing utterances
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      fr: 'fr-FR',
      en: 'en-GB',
      pt: 'pt-PT',
      tr: 'tr-TR',
      ar: 'ar-SA',
      es: 'es-ES',
      ur: 'ur-PK',
    };
    utterance.lang = langMap[lang] || 'fr-FR';
    // Optionally choose a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang && v.lang.startsWith(utterance.lang.split('-')[0]));
    if (match) utterance.voice = match;
    window.speechSynthesis.speak(utterance);
  };
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);

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

        <button
          className="admin-btn"
          aria-label="Connexion administrateur"
          onClick={() => alert('Accéder à la connexion admin (à implémenter)')}
        >
          <span className="lock">🔒</span>
        </button>
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
            }}
          >
            Confirmer
          </button>

          <input type='button' className="develop" value="Je développe" />
        </div>

        <button className="back-btn" aria-label="Retour" onClick={() => alert('Retour (à implémenter)')}>
          ←
        </button>
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