import './SuperAdminList.css';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminList() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    const checkLoggedIn = async () => {
        try {
            const response = await fetch('http://localhost:3001/admins/me', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const me = await response.json();
                if(me != null){
                    setLoggedIn(true);
                }
            } else {
                setLoggedIn(false);
            }
        }
        catch (error) {
            console.log('Erreur lors de la vérification de la connexion');
            setLoggedIn(false);
        }
    }
    
    checkLoggedIn();

    const GetAdminList = async () => {
         const response = await fetch('http://localhost:3001/admins', {
                method: 'GET',
                credentials: 'include',
            });
            console.log(response);
            console.log("sexe");
    }

    GetAdminList();

 // Si en cours d'évaluation, on met le chargement.
    if (loggedIn === null) {
        return <div className="admin-tickets"><h2>Chargement...</h2></div>;
    }
    // Si pas connecté, on redirige vers la page de login.
    if (!loggedIn) {
        console.log("Utilisateur non connecté, redirection vers login");
        return (<Navigate to="/login" replace />);
        }
    // Sinon on peut afficher la page normalement.
    else {
        
        return(
            
        <div className="admin-tickets">
            <h2>binje</h2>
        </div>
        );
    }


}