import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PopupCommentaire from './popup-commentaire/popup-commentaire';
import Stats from './statistiques/stats';
import Accueil from './accueil/accueil';
import LoginPage from './Login/Login';
import AdminTickets from './admin-tickets/admin-tickets';
import AdminList from './Gestion-admin/SuperAdminList';
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
          <Route path='/AdminList' element={<AdminList />} />
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
