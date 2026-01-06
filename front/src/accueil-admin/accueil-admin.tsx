import './acceuil-admin.css';
import { Navigate } from "react-router-dom";
import { useState } from 'react';

export default function AccueilAdmin() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    
    const checkLoggedIn = async () => {
        // vérifier si l'utilisateur est connecté
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

    // Gestion de la connexion
    if (loggedIn === null) {
        return <div className="accueil-admin"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn) {
        console.log("Utilisateur non connecté, redirection vers login");
        return (<Navigate to="/login" replace />);
    }

    // Sinon on peut afficher la page normalement.
    else {
        return(
            <div className="accueil-admin">
                <h2>Page Accueil Admin</h2>
            </div>
        );
    }
}