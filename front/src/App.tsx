import './App.css';
import { Routes, Route } from 'react-router-dom';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Survey from './Survey';
import RiskEval from './RiskEval';
import RiskInfo from './RiskInfo';
import Stats from './statistiques/stats';
import Accueil from './accueil/accueil';
import LoginPage from './Login/Login';
import AdminTickets from './admin-tickets/admin-tickets';
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
          <Route path="/tickets" element={<AdminTickets />} />
          <Route path="/Survey" element={<Survey />} />
          <Route path="/riskeval" element={<RiskEval />} />
          <Route path="/risk-info/:label" element={<RiskInfo />} />
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
