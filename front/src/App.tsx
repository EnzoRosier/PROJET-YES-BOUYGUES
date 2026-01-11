import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Formulaire from './Formulaire/Survey';
import RiskEval from './RisquesEval/RiskEval';
import RiskInfo from './RisquesEval/RiskInfo';
import Stats from './statistiques/stats';
import Accueil from './accueil/accueil';
import LoginPage from './Login/Login';
import AdminTickets from './admin-tickets/admin-tickets';
import AccueilAdmin from './accueil-admin/accueil-admin';
import AdminList from './ListeAdmin/SuperAdminList';
import AccueilSuperAdmin from './accueil-super-admin/accueil-super-admin';
import AjouterAdmin from './SuperAdmin/Ajouter';
import ModifierAdmin from './SuperAdmin/Modifier';  

import {
  RisqueLevage,
  RisqueLevageAnglais,
  RisqueLevageArabe,
  RisqueLevageEspagnol,
  RisqueLevageOurdou,
  RisqueLevagePolonais,
  RisqueLevagePortugais
} from './risque-levage';
import {
  TravauxHauteur,
  TravauxHauteurAnglais,
  TravauxHauteurArabe,
  TravauxHauteurEspagnol,
  TravauxHauteurOurdou,
  TravauxHauteurPolonais,
  TravauxHauteurPortugais
} from './travaux-hauteur';
import {
  RisqueCohesion,
  RisqueCohesionAnglais,
  RisqueCohesionArabe,
  RisqueCohesionEspagnol,
  RisqueCohesionOurdou,
  RisqueCohesionPolonais,
  RisqueCohesionPortugais
} from './risque-cohesion';
import {
  RisqueStabilite,
  RisqueStabiliteAnglais,
  RisqueStabiliteArabe,
  RisqueStabiliteEspagnol,
  RisqueStabiliteOurdou,
  RisqueStabilitePolonais,
  RisqueStabilitePortugais
} from './risque-stabilite';
import {
  EnvironnementTravail,
  EnvironnementTravailAnglais,
  EnvironnementTravailArabe,
  EnvironnementTravailEspagnol,
  EnvironnementTravailOurdou,
  EnvironnementTravailPolonais,
  EnvironnementTravailPortugais
} from './environnement-travail';
import {
  AmbianceSociale,
  AmbianceSocialeAnglais,
  AmbianceSocialeArabe,
  AmbianceSocialeEspagnol,
  AmbianceSocialeOurdou,
  AmbianceSocialePolonais,
  AmbianceSocialePortugais
} from './ambiance-sociale';
import {
  EquipementTravail,
  EquipementTravailAnglais,
  EquipementTravailArabe,
  EquipementTravailEspagnol,
  EquipementTravailOurdou,
  EquipementTravailPolonais,
  EquipementTravailPortugais
} from './equipement-travail';
import {
  EnergieDangereuse,
  EnergieDangereuseAnglais,
  EnergieDangereuseArabe,
  EnergieDangereuseEspagnol,
  EnergieDangereuseOurdou,
  EnergieDangereusePolonais,
  EnergieDangereusePortugais
} from './energie-dangereuse';
import {
  AutreRisque,
  AutreRisqueAnglais,
  AutreRisqueArabe,
  AutreRisqueEspagnol,
  AutreRisqueOurdou,
  AutreRisquePolonais,
  AutreRisquePortugais
} from './autre-risque';



function App() {
  return (
    <Routes>
      {/* Routes principales */}
      <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/tickets/:idTicket" element={<AdminTickets />} />
        <Route path="/tickets" element={<AdminTickets />} />
        <Route path="/Formulaire" element={<Formulaire />} />
        <Route path="/riskeval" element={<RiskEval />} />
        <Route path="/risk-info/:label" element={<RiskInfo />} />
        <Route path="/admin" element={<AccueilAdmin />} />
        <Route path='/AdminList' element={<AdminList />} />
        <Route path="/super-admin" element={<AccueilSuperAdmin />} />
        <Route path='/AjouterAdmin' element={<AjouterAdmin />} />
        
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
  );

  const [visible, setVisible] = useState(false);

  const [commentaire, setCommentaire] = useState("");

    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/tickets/:idTicket" element={<AdminTickets />} />
          <Route path="/tickets" element={<AdminTickets />} />
          <Route path="/Formulaire" element={<Formulaire />} />
          <Route path="/riskeval" element={<RiskEval />} />
          <Route path="/risk-info/:label" element={<RiskInfo />} />
          <Route path="/admin" element={<AccueilAdmin />} />
          <Route path='/AdminList' element={<AdminList />} />
          <Route path="/super-admin" element={<AccueilSuperAdmin />} />
          <Route path='/AjouterAdmin' element={<AjouterAdmin />} />
          <Route path='/ModifierAdmin' element={<ModifierAdmin />} />
        </Routes>
      </div>
    );
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
