import { useState, useRef } from 'react';
import './popup-commentaire.css';

export default function PopupCommentaire( {onClose, setCommentaire, commentaire} : {
    onClose: () => void, 
    setCommentaire: (commentaire: string) => void, 
    commentaire: string}) 
  {
  const [preview, setPreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);


  const handleClose = () => {
    setCommentaire(""); // On vide le commentaire s'il y avait un reste pour ne pas gêner les interactions futures
    onClose(); // On appelle la fonction de fermeture passée en paramètre
  }

  const handleSubmit = () => {
    console.log("Commentaire envoyé :", commentaire);

    // Envoi des infos à la page principale

    onClose(); // On ferme le popup après soumission
  }

  // Gestion de l'aperçu de l'image
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  // Lecture du son au montage du composant
  const lireQuestion = () => {
    audioRef.current?.play();
  }
  return (
    <div className="popup-commentaire">
      <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>

      <h1 className="titre-popup">Décrivez votre problème/remarque
        <button onClick={lireQuestion} className="bouton-audio">
          <img src="/ressources/icone-audio.png" alt="Écouter la question"/>
        </button>
      </h1>
      
      <audio ref={audioRef} src="/ressources/sons/titre-popup.mp3" />
      
      <div className="zone-texte">
        <p>Expliquez ici votre cas :</p>
        <textarea className="zone-commentaire" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} placeholder="Écrivez votre commentaire..."/>
        
        <label htmlFor="upload-image" className="bouton-upload">
          <img src="/appareil-photo.png" alt="Choisir une image" />
        </label>
        <input id="upload-image" className="upload-file" type="file" accept="image/*" onChange={handleImage}/>
        {preview && (
          <img src={preview} alt="Aperçu" style={{ maxWidth: "300px", marginTop: "1rem" }}/>
        )}
      </div>

      <button className="popup-close" onClick = {handleClose}>Fermer</button>
      <button className="popup-validate" onClick = {handleSubmit}>Valider</button>
    </div>
  );
}