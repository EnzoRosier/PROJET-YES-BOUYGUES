import './App.css';
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
import AjouterAdmin from './SuperAdmin/Ajouter';
import { useState } from 'react';

function App() {

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
          <Route path='/AjouterAdmin' element={<AjouterAdmin />} />
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
