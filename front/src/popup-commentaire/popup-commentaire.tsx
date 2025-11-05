import { useState } from 'react';
import './popup-commentaire.css';

export default function PopupCommentaire( {onClose}: {onClose: () => void} ) {
  const [commentaire, setCommentaire] = useState("");

  const handleClose = () => {
    setCommentaire(""); // On vide le commentaire s'il y avait un reste pour ne pas gêner les interactions futures
    onClose(); // On appelle la fonction de fermeture passée en paramètre
  }

  const handleSubmit = () => {
    console.log("Commentaire envoyé :", commentaire);

    // Envoi des infos au serveur


    onClose(); // On ferme le popup après soumission
  }

  return (
    <div className="popup-commentaire">
      <h1>Popup Commentaire</h1>
      <p>Ceci est un composant de popup pour les commentaires.</p>
      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Écrivez votre commentaire ici..."
      />
      <button onClick = {handleClose}>Fermer</button>
      <button onClick = {handleSubmit}>Envoyer</button>
    </div>
  );
}