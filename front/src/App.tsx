import logo from './logo.svg';
import './App.css';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import RisqueLevage from './risque-levage/risque-levage';
import TravauxHauteur from './travaux-hauteur/travaux-hauteur';
import RisqueCohesion from './risque-cohesion/risque-cohesion';
import RisqueStabilite from './risque-stabilite/risque-stabilite';
import EnvironnementTravail from './environnement-travail/environnement-travail';
import AmbianceSociale from './ambiance-sociale/ambiance-sociale';
import EquipementTravail from './equipement-travail/equipement-travail';
import EnergieDangereuse from './energie-dangereuse/energie-dangereuse';
import AutreRisque from './autre-risque/autre-risque';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [commentaire, setCommentaire] = useState("");

  return (
    <div className="App">
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
        <div style={{marginTop: '20px'}}>
          <Link to="/risque-levage" style={{color: 'white', textDecoration: 'underline'}}>
            Voir le risque de levage
          </Link>
          <br />
          <Link to="/travaux-hauteur" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir les travaux en hauteur
          </Link>
          <br />
          <Link to="/risque-cohesion" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir le risque de cohésion
          </Link>
          <br />
          <Link to="/risque-stabilite" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir le risque de stabilité
          </Link>
          <br />
          <Link to="/environnement-travail" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir l'environnement de travail
          </Link>
          <br />
          <Link to="/ambiance-sociale" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir l'ambiance sociale
          </Link>
          <br />
          <Link to="/equipement-travail" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir l'équipement de travail
          </Link>
          <br />
          <Link to="/energie-dangereuse" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir l'énergie dangereuse
          </Link>
          <br />
          <Link to="/autre-risque" style={{color: 'white', textDecoration: 'underline', marginTop: '10px', display: 'inline-block'}}>
            Voir les autres risques
          </Link>
        </div>
      </header>

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/risque-levage" element={<RisqueLevage />} />
        <Route path="/travaux-hauteur" element={<TravauxHauteur />} />
        <Route path="/risque-cohesion" element={<RisqueCohesion />} />
        <Route path="/risque-stabilite" element={<RisqueStabilite />} />
        <Route path="/environnement-travail" element={<EnvironnementTravail />} />
        <Route path="/ambiance-sociale" element={<AmbianceSociale />} />
        <Route path="/equipement-travail" element={<EquipementTravail />} />
        <Route path="/energie-dangereuse" element={<EnergieDangereuse />} />
        <Route path="/autre-risque" element={<AutreRisque />} />
      </Routes>
    </Router>
  );
}

export default App;
