import React, { useState, useRef, useEffect } from 'react';
import './Survey.css';
import './Smiley.css'
import { Link, useNavigate } from 'react-router-dom';
import PopupCommentaire from '../popup-commentaire/popup-commentaire';

const smiles = [
  { id: 0, label: 'Très insatisfait', image: 'ressources/Smiley_Angry.png', color: '#e74c3c' }, // ID 0 -> MAUVAIS
  { id: 1, label: 'Neutre', image: 'ressources/Smiley_Normal.png', color: '#f1c40f' },          // ID 1 -> MOYEN
  { id: 2, label: 'Très satisfait', image: 'ressources/Smiley_Happy.png', color: '#2ecc71' },  // ID 2 -> BIEN
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
  en: 'How are you feeling at the end of the day ?',
  es: '¿ Cómo te sientes al final del día ?',
  pt: 'Como se sente no final do dia ?',
  ar: 'ما هو مزاجك في نهاية اليوم؟',
  ur: 'دن کے آخر میں آپ کا موڈ کیا ہے؟',
  pl: 'Jak się czujesz pod koniec dnia ?',
};

export default function Survey() {
  const [selected, setSelected] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const [worksiteId, setWorksiteId] = useState<string | null>(null);
  const ip = window.location.hostname;


  // Fetch current worksite id on mount; if missing, redirect to admin login
  useEffect(() => {
    const fetchWorksite = async () => {
      try {
        const res = await fetch(`http://${ip}:3001/worksite/currentWorksite`);

        // Try to read body (JSON or text) regardless of res.ok so we can decide based on content
        let data: any = null;
        try {
          const text = await res.text();
          try {
            data = JSON.parse(text);
          } catch {
            data = text || null;
          }
        } catch (e) {
          console.warn('Failed to read worksite response body:', e);
        }

        // Log the full response and extract id from the server's `value` field only (server returns { value: ... })
        console.log('Worksite response body:', data);

        let id: string | null = null;
        if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'value')) {
          const val = data.value;
          if (typeof val === 'string') {
            id = val;
          } else if (typeof val === 'object') {
            id = val.id ?? val.worksiteId ?? null;
          }
        }

        console.debug('Extracted worksite id:', id);

        if (id && typeof id === 'string') {
          setWorksiteId(id);
          return;
        }

        // If no id found, redirect to login (after having awaited the response and parsed it)
        console.warn('No worksite id returned or invalid response:', { status: res.status, data });
        navigate('/login');
      } catch (err) {
        console.warn('Could not fetch current worksite:', err);
        navigate('/login');
      }
    };
    fetchWorksite();
  });
  const [visible, setVisible] = useState(false);
  const [commentaire, setCommentaire] = useState('');
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);

  const modalTexts: Record<string, {title: string; message: string; ok: string}> = {
    fr: { title: 'Sélection requise', message: 'Veuillez sélectionner un smiley.', ok: 'OK' },
    en: { title: 'Selection required', message: 'Please select a smiley.', ok: 'OK' },
    es: { title: 'Selección requerida', message: 'Por favor seleccione un smiley.', ok: 'OK' },
    pt: { title: 'Seleção necessária', message: 'Por favor selecione um smiley.', ok: 'OK' },
    ar: { title: 'مطلوب اختيار', message: 'الرجاء تحديد رمز تعبيري.', ok: 'حسناً' },
    ur: { title: 'انتخاب ضروری', message: 'براہ کرم ایک سمائلی منتخب کریں۔', ok: 'ٹھیک ہے' },
    pl: { title: 'Wymagana selekcja', message: 'Proszę wybrać emotikonę.', ok: 'OK' },
  };

  const uiTexts: Record<string, {confirm:string; develop:string; back:string}> = {
    fr: { confirm: 'Confirmer', develop: 'Je développe', back: 'Retour' },
    en: { confirm: 'Confirm', develop: 'I develop', back: 'Back' },
    es: { confirm: 'Confirmar', develop: 'Desarrollar', back: 'Volver' },
    pt: { confirm: 'Confirmar', develop: 'Eu desenvolvo', back: 'Voltar' },
    ar: { confirm: 'تأكيد', develop: 'أقوم بالتطوير', back: 'عودة' },
    ur: { confirm: 'تصدیق', develop: 'میں تیار کرتا ہوں', back: 'واپس' },
    pl: { confirm: 'Potwierdź', develop: 'Rozwijam', back: 'Powrót' },
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getAudioPath = (lang: string, index = 2) => {
    const map: Record<string, string> = {
      fr: `ressources/audios/Français/Français_Diapo_${index}.mp3`,
      en: `ressources/audios/Anglais/Anglais_Diapo_${index}.mp3`,
      es: `ressources/audios/Espagnol/Espagnol_Diapo_${index}.mp3`,
      pt: `ressources/audios/Portugais/Portugais_Diapo_${index}.mp3`,
      ar: `ressources/audios/Arabe Littéraire/Arabe_Diapo_${index}.mp3`,
      ur: `ressources/audios/Ourdou/Ourdou_Diapo_${index}.mp3`,
      pl: `ressources/audios/Polonais/Polonais_Diapo_${index}.mp3`,
    };
    return map[lang] || map.fr;
  };

  const speakQuestion = (lang: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audioPath = getAudioPath(lang, 2);
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.error("Erreur audio :", error);
      // Fallback: try to use speechSynthesis if audio file fails to play
      if ('speechSynthesis' in window) {
        const text = questionTexts[lang] || questionTexts.fr;
        const utterance = new SpeechSynthesisUtterance(text);
        const langMap: Record<string, string> = {
          fr: 'fr-FR', en: 'en-GB', es: 'es-ES', pt: 'pt-PT', ar: 'ar-SA', ur: 'ur-PK', pl: 'pl-PL',
        };
        utterance.lang = langMap[lang] || 'fr-FR';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    });
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
      worksiteId: worksiteId,
      dateCloture: ""
    };

    if (!worksiteId) {
      console.error('No worksiteId available; redirecting to admin login');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://${ip}:3001/vote/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voteData),
      });

      if (response.ok) {
        console.log(`'Réponse enregistrée'} : ${response}`);
        // Preserve selected language when navigating to RiskEval
        navigate(`../riskeval?lang=${currentLang}`);
      } else {
        console.error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  return (
    <div className="survey-root">
      <img className="brand-badge" src="ressources/Bouygues_bat.png" alt="Bouygues" />
      
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
        <Link to="../"><button className="home-btn">🏠</button></Link>
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
          <button className="confirm" onClick={handleConfirm}>{uiTexts[currentLang]?.confirm || 'Confirmer'}</button>
          <button className="develop" onClick={() => setVisible(true)}>{uiTexts[currentLang]?.develop || 'Je développe'}</button>
        </div>


        {visible && (
          <PopupCommentaire 
            onClose={() => setVisible(false)} 
            setCommentaire={setCommentaire} 
            commentaire={commentaire}
            lang={currentLang}
          />
        )}
      </main>

      {showNoSelectionModal && (
        <div className="modal-overlay" onClick={() => setShowNoSelectionModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalTexts[currentLang]?.title || modalTexts.fr.title}</h3>
            <p>{modalTexts[currentLang]?.message || modalTexts.fr.message}</p>
            <button className="modal-close" onClick={() => setShowNoSelectionModal(false)}>{modalTexts[currentLang]?.ok || modalTexts.fr.ok}</button>
          </div>
        </div>
      )}
    </div>
  );
}