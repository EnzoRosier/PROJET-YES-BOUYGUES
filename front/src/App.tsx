import logo from './logo.svg';
import './App.css';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Stats from './statistiques/stats';
import { useState } from 'react';

function App() {

  const [visible, setVisible] = useState(false);

  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>
      {!visible && (
      <button onClick={() => setVisible(true)}>
        Ouvrir le popup
      </button>
      )}

      {visible && (
        <PopupCommentaire onClose = {() => setVisible(false)}/>
      )}
      </div>   
    </div>*/
    <div>
      <Stats />
    </div>
  );
}

export default App;
