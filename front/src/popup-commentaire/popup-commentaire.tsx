import { useState, useRef } from 'react';
import './popup-commentaire.css';

export default function PopupCommentaire( {onClose, setCommentaire, commentaire, lang = 'fr'} : {
    onClose: () => void, 
    setCommentaire: (commentaire: string) => void, 
    commentaire: string,
    lang?: string
  }) {
  const [preview, setPreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const texts: Record<string, {title:string; audioAlt:string; explain:string; placeholder:string; close:string; validate:string}> = {
    fr: { title: 'Décrivez votre problème/remarque', audioAlt: 'Écouter la question', explain: 'Expliquez ici votre cas :', placeholder: 'Écrivez votre commentaire...', close: 'Fermer', validate: 'Valider' },
    en: { title: 'Describe your issue/comment', audioAlt: 'Listen to the question', explain: 'Explain your case here:', placeholder: 'Write your comment...', close: 'Close', validate: 'Submit' },
    es: { title: 'Describa su problema / comentario', audioAlt: 'Escuchar la pregunta', explain: 'Explique su caso aquí:', placeholder: 'Escriba su comentario...', close: 'Cerrar', validate: 'Enviar' },
    pt: { title: 'Descreva seu problema/comentário', audioAlt: 'Ouvir a pergunta', explain: 'Explique seu caso aqui:', placeholder: 'Escreva seu comentário...', close: 'Fechar', validate: 'Validar' },
    ar: { title: 'صف مشكلتك/تعليقك', audioAlt: 'استمع إلى السؤال', explain: 'اشرح حالتك هنا:', placeholder: 'اكتب تعليقك...', close: 'إغلاق', validate: 'إرسال' },
    ur: { title: 'اپنی مسئلہ/تبصرہ بیان کریں', audioAlt: 'سوال سنیں', explain: 'اپنا کیس یہاں بیان کریں:', placeholder: 'اپنا تبصرہ لکھیں...', close: 'بند کریں', validate: 'جمع کریں' },
    pl: { title: 'Opisz swój problem/komentarz', audioAlt: 'Odsłuchaj pytanie', explain: 'Wyjaśnij swoją sprawę tutaj:', placeholder: 'Napisz swój komentarz...', close: 'Zamknij', validate: 'Zatwierdź' },
  };

  const t = texts[lang] || texts.fr;

  const handleClose = () => {
    setCommentaire(""); // On vide le commentaire
    onClose();
  }

  const handleSubmit = () => {
    onClose(); // On ferme le popup après soumission
  }

  // Gestion de l'aperçu de l'image
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  // Lecture du son (fallback to speechSynthesis)
  const lireQuestion = () => {
    // Prefer speechSynthesis to read the popup title in selected language
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(t.title);
      const langMap: Record<string, string> = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES', pt: 'pt-PT', ar: 'ar-SA', ur: 'ur-PK', pl: 'pl-PL' };
      utter.lang = langMap[lang] || 'fr-FR';
      window.speechSynthesis.speak(utter);
    } else {
      // If not supported, try to play any existing audio element if present
      if (audioRef.current) {
        audioRef.current.src = '/ressources/sons/titre-popup.mp3';
        audioRef.current.play().catch(() => {});
      }
    }
  }

  return (
    <div className="popup-commentaire">

      <h1 className="titre-popup">{t.title}
        <button onClick={lireQuestion} className="bouton-audio">
          🔊
        </button>
      </h1>
      
      <audio ref={audioRef} preload="auto" />
      
      <div className="zone-texte">
        <p>{t.explain}</p>
        <textarea className="zone-commentaire" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} placeholder={t.placeholder}/>
      </div>

      <div className="popup-footer">
        <div></div>
        <div style={{display: 'flex', gap: 12}}>
          <button className="popup-close" onClick={handleClose}>{t.close}</button>
          <button className="popup-validate" onClick={handleSubmit}>{t.validate}</button>
        </div>
      </div>
    </div>
  );
}