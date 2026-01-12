import React, { useState, useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PopupCommentaire from '../popup-commentaire/popup-commentaire';
import '../Formulaire/Survey.css';
import './RiskEval.css';

const riskLabels: Record<string, string[]> = {
  fr: [
    'Risque de levage',
    'Travaux en Hauteur',
    'Risque de collision',
    'Risque de stabilité',
    'Environnement de travail',
    'Equipement de production',
    'Ambiance Sociale',
    'Énergie dangereuse',
  ],
  en: [
    'Lifting risk',
    'Working at height',
    'Collision risk',
    'Stability risk',
    'Work environment',
    'Production equipment',
    'Social atmosphere',
    'Hazardous energy',
  ],
  pt: [
    'Risco de elevação',
    'Trabalhos em altura',
    'Risco de colisão',
    'Risco de estabilidade',
    'Ambiente de trabalho',
    'Equipamento de produção',
    'Ambiente social',
    'Energia perigosa',
  ],
  pl: [
    'Ryzyko podnoszenia',
    'Prace na wysokości',
    'Ryzyko kolizji',
    'Ryzyko stabilności',
    'Środowisko pracy',
    'Sprzęt produkcyjny',
    'Atmosfera społeczna',
    'Niebezpieczna energia',
  ],
  ar: [
    'خطر الرفع',
    'أعمال على ارتفاع',
    'خطر الاصطدام',
    'خطر الاستقرار',
    'بيئة العمل',
    'معدات الإنتاج',
    'البيئة الاجتماعية',
    'طاقة خطرة',
  ],
  es: [
    'Riesgo de izaje',
    'Trabajos en altura',
    'Riesgo de colisión',
    'Riesgo de estabilidad',
    'Entorno de trabajo',
    'Equipo de producción',
    'Ambiente social',
    'Energía peligrosa',
  ],
  ur: [
    'لفٹنگ خطرہ',
    'اونچائی پر کام',
    'ٹکرانے کا خطرہ',
    'استحکام کا خطرہ',
    'کام کا ماحول',
    'پیداواری آلات',
    'سماجی ماحول',
    'خطرناک توانائی',
  ],
};

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
  fr: "Cliquez sur les risques majeurs, pour lesquels vous pensez ne pas être assez protégé",
  en: 'Click on the major risks for which you think you are not sufficiently protected',
  es: 'Haga clic en los riesgos principales por los que cree que no está suficientemente protegido',
  pt: 'Clique nos riscos principais para os quais você acha que não está suficientemente protegido',
  ar: 'ان بڑے خطرات پر کلک کریں جن کے بارے میں آپ کو لگتا ہے کہ آپ کافی حد تک محفوظ نہیں ہیں',
  ur: 'ان اہم خطرات پر کلک کریں جن کے بارے میں آپ سمجھتے ہیں کہ آپ کافی حد تک محفوظ نہیں ہیں',
  pl: 'Kliknij ryzyka, które uważasz, że nie są wystarczająco chronione',
};

const WORKSITE_ID_PLACEHOLDER = "4aef3bc5-6637-40f6-b7f2-e613e0744efd";  
 
// Mapping des index de risques vers les URLs (position dans le tableau riskLabels)
const riskIndexToUrl: string[] = [
  '/risque-levage',        // 0: Risque de levage
  '/travaux-hauteur',      // 1: Travaux en Hauteur
  '/risque-cohesion',      // 2: Risque de collision
  '/risque-stabilite',     // 3: Risque de stabilité
  '/environnement-travail',// 4: Environnement de travail
  '/equipement-travail',   // 5: Equipement de production
  '/ambiance-sociale',     // 6: Ambiance Sociale
  '/energie-dangereuse',   // 7: Énergie dangereuse
];

// Codes de langue pour les URLs
const langCodeMapping: Record<string, string> = {
  'fr': 'fr',
  'en': 'en',
  'es': 'es',
  'pt': 'pt',
  'ar': 'ar',
  'ur': 'ur',
  'pl': 'pl',
};

export default function RiskEval() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  
  // Récupérer la langue depuis l'URL au chargement
  useEffect(() => {
    const langFromUrl = searchParams.get('lang');
    if (langFromUrl && langCodeMapping[langFromUrl]) {
      setCurrentLang(langFromUrl);
    }
  }, [searchParams]);
  
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
      es: 'es-ES',
      pt: 'pt-PT',
      ar: 'ar-SA',
      ur: 'ur-PK',
      pl: 'pl-PL',
    };
    utterance.lang = langMap[lang] || 'fr-FR';
    // Optionally choose a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang && v.lang.startsWith(utterance.lang.split('-')[0]));
    if (match) utterance.voice = match;
    window.speechSynthesis.speak(utterance);
  };
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [visible, setVisible] = useState(false);
  const [commentaire, setCommentaire] = useState('');

  const toggleRisk = (label: string) => {
    setSelectedRisks((cur) => {
      if (cur.includes(label)) return cur.filter((l) => l !== label);
      return [...cur, label];
    });
  };

  const handleLangSelect = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
  };

  // Map visible risk label (any language) to the exact identifier requested
  const mapLabelToId = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('lev') || l.includes('lift') || l.includes('eleva') || l.includes('izaj') || l.includes('izaje') || l.includes('لف')) return 'LEVAGE';
    if (l.includes('collision') || l.includes('colis') || l.includes('cohes')) return 'COHESION';
    if (l.includes('environ')) return 'ENVIRONEMENT';
    if (l.includes('equip') || l.includes('produit') || l.includes('equipo') || l.includes('equipamento')) return 'EQUIPEMENT';
    if (l.includes('hauteur') || l.includes('height') || l.includes('altura')) return 'HAUTEUR';
    if (l.includes('stabil')) return 'STABILITE';
    if (l.includes('amb') || l.includes('atmos') || l.includes('ambiente') || l.includes('social')) return 'AMBIANCE';
    if (l.includes('ener') || l.includes('energ') || l.includes('طاقة')) return 'ENERGIE';
    return 'AUTRE';
  };

  const handleConfirm = async () => {
    if (selectedRisks.length === 0) {
      setShowNoSelectionModal(true);
      return;
    }

    const ids = selectedRisks.map(mapLabelToId);
    const reponse = ids.join(' ');
    const today = new Date().toISOString().split('T')[0];

    const voteData = {
      numQuestion: "2",
      reponse,
      commentaire: commentaire || (otherText || ''),
      date: today,
      worksiteId: WORKSITE_ID_PLACEHOLDER,
    };

    try {
      const response = await fetch('http://localhost:3001/vote/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        alert(`Réponse enregistrée : ${reponse}`);
        navigate('../');
      } else {
        alert('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur API:', error);
    }
  }; 

  const handleRiskInfo = (label: string) => {
    // Trouver l'index du risque dans le tableau de la langue actuelle
    const currentRisks = riskLabels[currentLang] || riskLabels.fr;
    const riskIndex = currentRisks.indexOf(label);
    
    if (riskIndex !== -1 && riskIndex < riskIndexToUrl.length) {
      const baseUrl = riskIndexToUrl[riskIndex];
      const langCode = langCodeMapping[currentLang] || 'fr';
      // Passer la langue dans l'état pour que la page de risque puisse la réutiliser
      navigate(`${baseUrl}/${langCode}`, { state: { returnLang: currentLang } });
    } else {
      // Fallback si le risque n'est pas trouvé
      navigate(`/risk-info/${encodeURIComponent(label)}`);
    }
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

        <div className="risk-grid" role="list">
          {(riskLabels[currentLang] || riskLabels.fr).map((label) => (
            <div key={label} role="listitem">
              <button
                className={`risk-btn ${selectedRisks.includes(label) ? 'selected' : ''}`}
                onClick={() => toggleRisk(label)}
                aria-pressed={selectedRisks.includes(label)}
                aria-label={label}
              >
                <span className="risk-label">{label}</span>

                <span
                  role="button"
                  tabIndex={0}
                  className="info-icon"
                  aria-label={`Informations sur ${label}`}
                  title={`Plus d'informations sur ${label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRiskInfo(label);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRiskInfo(label);
                    }
                  }}
                >
                  i
                </span>
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <button
            className="other-btn"
            onClick={() => setShowOtherModal(true)}
          >
            Autres
          </button>
        </div>

        <div className="actions">
          <button
            className="confirm"
            onClick={() => handleConfirm()}
          >
            Confirmer
          </button> 

          <button className="develop" onClick={() => setVisible(true)}>
            Je développe
          </button> 
        </div>

        <button className="back-btn" aria-label="Retour" onClick={() => navigate(-1)}>
          ←
        </button>

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
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title">Sélection requise</h3>
            <p>Veuillez sélectionner au moins un risque avant de confirmer.</p>
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

      {showOtherModal && (
        <div className="modal-overlay" onClick={() => setShowOtherModal(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="other-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="other-modal-title">Autres - Précisez</h3>
            <p>Veuillez indiquer le risque :</p>
            <input
              className="other-input"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Décrivez le risque"
            />
            <div className="modal-actions">
              <button
                className="modal-close btn-back"
                onClick={() => {
                  setOtherText('');
                  setShowOtherModal(false);
                }}
              >
                Retour
              </button>
              <button
                className="modal-close btn-confirm"
                onClick={() => {
                  if (!otherText.trim()) {
                    alert('Veuillez entrer une description.');
                    return;
                  }
                  // Add the custom risk to selectedRisks and close
                  setSelectedRisks((cur) => (cur.includes(otherText.trim()) ? cur : [...cur, otherText.trim()]));
                  setOtherText('');
                  setShowOtherModal(false);
                }}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}