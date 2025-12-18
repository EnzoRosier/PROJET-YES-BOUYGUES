import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Stats from './statistiques/stats';
import Accueil from './accueil/accueil';
import LoginPage from './Login/Login';
import { useState } from 'react';

function App() {

  const [visible, setVisible] = useState(false);

  const [commentaire, setCommentaire] = useState("");

  //return (
    return <LoginPage />;
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>

    //   <div>
    //   {!visible && (
    //   <button onClick={() => setVisible(true)}>
    //     Ouvrir le popup
    //   </button>
    //   )}

    //   {visible && (
    //     <PopupCommentaire onClose = {() => setVisible(false)} setCommentaire={setCommentaire} commentaire={commentaire}/>
    //   )}
    // </div>

      
    // </div>
  //);
}

export default App;
