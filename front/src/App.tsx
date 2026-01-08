import logo from './logo.svg';
import './App.css';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import RisqueLevage from './risque-levage/risque-levage';
import RisqueLevageAnglais from './risque-levage/risque-levage-anglais';
import RisqueLevageArabe from './risque-levage/risque-levage-arabe';
import RisqueLevageEspagnol from './risque-levage/risque-levage-espagnol';
import RisqueLevageOurdou from './risque-levage/risque-levage-ourdou';
import RisqueLevagePolonais from './risque-levage/risque-levage-polonais';
import RisqueLevagePortugais from './risque-levage/risque-levage-portugais';
import TravauxHauteur from './travaux-hauteur/travaux-hauteur';
import TravauxHauteurAnglais from './travaux-hauteur/travaux-hauteur-anglais';
import TravauxHauteurArabe from './travaux-hauteur/travaux-hauteur-arabe';
import TravauxHauteurEspagnol from './travaux-hauteur/travaux-hauteur-espagnol';
import TravauxHauteurOurdou from './travaux-hauteur/travaux-hauteur-ourdou';
import TravauxHauteurPolonais from './travaux-hauteur/travaux-hauteur-polonais';
import TravauxHauteurPortugais from './travaux-hauteur/travaux-hauteur-portugais';
import RisqueCohesion from './risque-cohesion/risque-cohesion';
import RisqueCohesionAnglais from './risque-cohesion/risque-cohesion-anglais';
import RisqueCohesionArabe from './risque-cohesion/risque-cohesion-arabe';
import RisqueCohesionEspagnol from './risque-cohesion/risque-cohesion-espagnol';
import RisqueCohesionOurdou from './risque-cohesion/risque-cohesion-ourdou';
import RisqueCohesionPolonais from './risque-cohesion/risque-cohesion-polonais';
import RisqueCohesionPortugais from './risque-cohesion/risque-cohesion-portugais';
import RisqueStabilite from './risque-stabilite/risque-stabilite';
import RisqueStabiliteAnglais from './risque-stabilite/risque-stabilite-anglais';
import RisqueStabiliteArabe from './risque-stabilite/risque-stabilite-arabe';
import RisqueStabiliteEspagnol from './risque-stabilite/risque-stabilite-espagnol';
import RisqueStabiliteOurdou from './risque-stabilite/risque-stabilite-ourdou';
import RisqueStabilitePolonais from './risque-stabilite/risque-stabilite-polonais';
import RisqueStabilitePortugais from './risque-stabilite/risque-stabilite-portugais';
import EnvironnementTravail from './environnement-travail/environnement-travail';
import EnvironnementTravailAnglais from './environnement-travail/environnement-travail-anglais';
import EnvironnementTravailArabe from './environnement-travail/environnement-travail-arabe';
import EnvironnementTravailEspagnol from './environnement-travail/environnement-travail-espagnol';
import EnvironnementTravailOurdou from './environnement-travail/environnement-travail-ourdou';
import EnvironnementTravailPolonais from './environnement-travail/environnement-travail-polonais';
import EnvironnementTravailPortugais from './environnement-travail/environnement-travail-portugais';
import AmbianceSociale from './ambiance-sociale/ambiance-sociale';
import AmbianceSocialeAnglais from './ambiance-sociale/ambiance-sociale-anglais';
import AmbianceSocialeArabe from './ambiance-sociale/ambiance-sociale-arabe';
import AmbianceSocialeEspagnol from './ambiance-sociale/ambiance-sociale-espagnol';
import AmbianceSocialeOurdou from './ambiance-sociale/ambiance-sociale-ourdou';
import AmbianceSocialePolonais from './ambiance-sociale/ambiance-sociale-polonais';
import AmbianceSocialePortugais from './ambiance-sociale/ambiance-sociale-portugais';
import EquipementTravail from './equipement-travail/equipement-travail';
import EquipementTravailAnglais from './equipement-travail/equipement-travail-anglais';
import EquipementTravailArabe from './equipement-travail/equipement-travail-arabe';
import EquipementTravailEspagnol from './equipement-travail/equipement-travail-espagnol';
import EquipementTravailOurdou from './equipement-travail/equipement-travail-ourdou';
import EquipementTravailPolonais from './equipement-travail/equipement-travail-polonais';
import EquipementTravailPortugais from './equipement-travail/equipement-travail-portugais';
import EnergieDangereuse from './energie-dangereuse/energie-dangereuse';
import EnergieDangereuseAnglais from './energie-dangereuse/energie-dangereuse-anglais';
import EnergieDangereuseArabe from './energie-dangereuse/energie-dangereuse-arabe';
import EnergieDangereuseEspagnol from './energie-dangereuse/energie-dangereuse-espagnol';
import EnergieDangereuseOurdou from './energie-dangereuse/energie-dangereuse-ourdou';
import EnergieDangereusePolonais from './energie-dangereuse/energie-dangereuse-polonais';
import EnergieDangereusePortugais from './energie-dangereuse/energie-dangereuse-portugais';
import AutreRisque from './autre-risque/autre-risque';
import AutreRisqueAnglais from './autre-risque/autre-risque-anglais';
import AutreRisqueArabe from './autre-risque/autre-risque-arabe';
import AutreRisqueEspagnol from './autre-risque/autre-risque-espagnol';
import AutreRisqueOurdou from './autre-risque/autre-risque-ourdou';
import AutreRisquePolonais from './autre-risque/autre-risque-polonais';
import AutreRisquePortugais from './autre-risque/autre-risque-portugais';
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
        
        {/* Risque Levage */}
        <Route path="/risque-levage" element={<RisqueLevage />} />
        <Route path="/risque-levage/fr" element={<RisqueLevage />} />
        <Route path="/risque-levage/en" element={<RisqueLevageAnglais />} />
        <Route path="/risque-levage/ar" element={<RisqueLevageArabe />} />
        <Route path="/risque-levage/es" element={<RisqueLevageEspagnol />} />
        <Route path="/risque-levage/ur" element={<RisqueLevageOurdou />} />
        <Route path="/risque-levage/pl" element={<RisqueLevagePolonais />} />
        <Route path="/risque-levage/pt" element={<RisqueLevagePortugais />} />
        
        {/* Risque Cohésion */}
        <Route path="/risque-cohesion" element={<RisqueCohesion />} />
        <Route path="/risque-cohesion/fr" element={<RisqueCohesion />} />
        <Route path="/risque-cohesion/en" element={<RisqueCohesionAnglais />} />
        <Route path="/risque-cohesion/ar" element={<RisqueCohesionArabe />} />
        <Route path="/risque-cohesion/es" element={<RisqueCohesionEspagnol />} />
        <Route path="/risque-cohesion/ur" element={<RisqueCohesionOurdou />} />
        <Route path="/risque-cohesion/pl" element={<RisqueCohesionPolonais />} />
        <Route path="/risque-cohesion/pt" element={<RisqueCohesionPortugais />} />
        
        {/* Risque Stabilité */}
        <Route path="/risque-stabilite" element={<RisqueStabilite />} />
        <Route path="/risque-stabilite/fr" element={<RisqueStabilite />} />
        <Route path="/risque-stabilite/en" element={<RisqueStabiliteAnglais />} />
        <Route path="/risque-stabilite/ar" element={<RisqueStabiliteArabe />} />
        <Route path="/risque-stabilite/es" element={<RisqueStabiliteEspagnol />} />
        <Route path="/risque-stabilite/ur" element={<RisqueStabiliteOurdou />} />
        <Route path="/risque-stabilite/pl" element={<RisqueStabilitePolonais />} />
        <Route path="/risque-stabilite/pt" element={<RisqueStabilitePortugais />} />
        
        {/* Travaux Hauteur */}
        <Route path="/travaux-hauteur" element={<TravauxHauteur />} />
        <Route path="/travaux-hauteur/fr" element={<TravauxHauteur />} />
        <Route path="/travaux-hauteur/en" element={<TravauxHauteurAnglais />} />
        <Route path="/travaux-hauteur/ar" element={<TravauxHauteurArabe />} />
        <Route path="/travaux-hauteur/es" element={<TravauxHauteurEspagnol />} />
        <Route path="/travaux-hauteur/ur" element={<TravauxHauteurOurdou />} />
        <Route path="/travaux-hauteur/pl" element={<TravauxHauteurPolonais />} />
        <Route path="/travaux-hauteur/pt" element={<TravauxHauteurPortugais />} />
        
        {/* Environnement Travail */}
        <Route path="/environnement-travail" element={<EnvironnementTravail />} />
        <Route path="/environnement-travail/fr" element={<EnvironnementTravail />} />
        <Route path="/environnement-travail/en" element={<EnvironnementTravailAnglais />} />
        <Route path="/environnement-travail/ar" element={<EnvironnementTravailArabe />} />
        <Route path="/environnement-travail/es" element={<EnvironnementTravailEspagnol />} />
        <Route path="/environnement-travail/ur" element={<EnvironnementTravailOurdou />} />
        <Route path="/environnement-travail/pl" element={<EnvironnementTravailPolonais />} />
        <Route path="/environnement-travail/pt" element={<EnvironnementTravailPortugais />} />
        
        {/* Ambiance Sociale */}
        <Route path="/ambiance-sociale" element={<AmbianceSociale />} />
        <Route path="/ambiance-sociale/fr" element={<AmbianceSociale />} />
        <Route path="/ambiance-sociale/en" element={<AmbianceSocialeAnglais />} />
        <Route path="/ambiance-sociale/ar" element={<AmbianceSocialeArabe />} />
        <Route path="/ambiance-sociale/es" element={<AmbianceSocialeEspagnol />} />
        <Route path="/ambiance-sociale/ur" element={<AmbianceSocialeOurdou />} />
        <Route path="/ambiance-sociale/pl" element={<AmbianceSocialePolonais />} />
        <Route path="/ambiance-sociale/pt" element={<AmbianceSocialePortugais />} />
        
        {/* Equipement Travail */}
        <Route path="/equipement-travail" element={<EquipementTravail />} />
        <Route path="/equipement-travail/fr" element={<EquipementTravail />} />
        <Route path="/equipement-travail/en" element={<EquipementTravailAnglais />} />
        <Route path="/equipement-travail/ar" element={<EquipementTravailArabe />} />
        <Route path="/equipement-travail/es" element={<EquipementTravailEspagnol />} />
        <Route path="/equipement-travail/ur" element={<EquipementTravailOurdou />} />
        <Route path="/equipement-travail/pl" element={<EquipementTravailPolonais />} />
        <Route path="/equipement-travail/pt" element={<EquipementTravailPortugais />} />
        
        {/* Energie Dangereuse */}
        <Route path="/energie-dangereuse" element={<EnergieDangereuse />} />
        <Route path="/energie-dangereuse/fr" element={<EnergieDangereuse />} />
        <Route path="/energie-dangereuse/en" element={<EnergieDangereuseAnglais />} />
        <Route path="/energie-dangereuse/ar" element={<EnergieDangereuseArabe />} />
        <Route path="/energie-dangereuse/es" element={<EnergieDangereuseEspagnol />} />
        <Route path="/energie-dangereuse/ur" element={<EnergieDangereuseOurdou />} />
        <Route path="/energie-dangereuse/pl" element={<EnergieDangereusePolonais />} />
        <Route path="/energie-dangereuse/pt" element={<EnergieDangereusePortugais />} />
        
        {/* Autre Risque */}
        <Route path="/autre-risque" element={<AutreRisque />} />
        <Route path="/autre-risque/fr" element={<AutreRisque />} />
        <Route path="/autre-risque/en" element={<AutreRisqueAnglais />} />
        <Route path="/autre-risque/ar" element={<AutreRisqueArabe />} />
        <Route path="/autre-risque/es" element={<AutreRisqueEspagnol />} />
        <Route path="/autre-risque/ur" element={<AutreRisqueOurdou />} />
        <Route path="/autre-risque/pl" element={<AutreRisquePolonais />} />
        <Route path="/autre-risque/pt" element={<AutreRisquePortugais />} />
      </Routes>
    </Router>
  );
}

export default App;
