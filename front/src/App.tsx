import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Accueil from './accueil/accueil';
import { useState } from 'react';

function App() {

  const [visible, setVisible] = useState(false);

  const [commentaire, setCommentaire] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
      <div>
      {!visible && (
      <button onClick={() => setVisible(true)}>
        Ouvrir le popup
      </button>
      )}

      {visible && (
        <PopupCommentaire onClose = {() => setVisible(false)} setCommentaire={setCommentaire} commentaire={commentaire}/>
      )}
    </div>

      
    </div>
  );
}

export default App;
