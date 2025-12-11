import React, { useState } from 'react';
import './Survey.css';

const smiles = [
  { id: 0, label: 'Très insatisfait', emoji: '😡', color: '#e74c3c' },
  { id: 1, label: 'Insatisfait', emoji: '😟', color: '#ff8a65' },
  { id: 2, label: 'Neutre', emoji: '😐', color: '#f1c40f' },
  { id: 3, label: 'Satisfait', emoji: '🙂', color: '#2ecc71' },
  { id: 4, label: 'Très satisfait', emoji: '😄', color: '#2ecc71' },
];

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function Survey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');

  const handleLangSelect = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
    // TODO: Implémenter la logique de changement de langue
  };

  return (
    <div className="survey-root">
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
          Pensez-vous être protégé des 6 risques majeurs ? <span className="audio">🔊</span>
        </h1>

        <div className="smile-row" role="list">
          {smiles.map((s) => (
            <button
              key={s.id}
              className={`smile ${selected === s.id ? 'selected' : ''}`}
              style={{ backgroundColor: s.color }}
              onClick={() => setSelected(s.id)}
              aria-label={s.label}
            >
              <span className="emoji">{s.emoji}</span>
            </button>
          ))}
        </div>

        <div className="actions">
          <button
            className="confirm"
            onClick={() => {
              if (selected === null) {
                alert('Veuillez sélectionner une appréciation avant de confirmer.');
                return;
              }
              alert(`Réponse enregistrée : ${smiles[selected].label}`);
            }}
          >
            Confirmer
          </button>

          <button className="develop" onClick={() => alert('Ouvrir zone de développement (à implémenter)')}>
            Je développe
          </button>
        </div>

        <button className="back-btn" aria-label="Retour" onClick={() => alert('Retour (à implémenter)')}>
          ←
        </button>
      </main>
    </div>
  );
}