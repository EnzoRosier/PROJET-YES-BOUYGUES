import './admin-tickets.css';
import { Navigate } from 'react-router-dom';

export default async function AdminTickets() {

    const checkLoggedIn = async () => {
        // vérifier si l'utilisateur est connecté
        try {
            const response = await fetch('http://localhost:3000/admins/me', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const me = await response.json();
                return me != null;
            } else {
                return false;
            }
        }
        catch (error) {
            console.log('Erreur lors de la vérification de la connexion');
            return false;
        }
    }
    var loggedIn = await checkLoggedIn();
    

    const getAllTickets = () => {

    }

    // Si non connecté, rediriger vers la page de login
    if (!loggedIn) {
        return (<Navigate to="/login" replace />);
        }
    // Sinon on peut afficher la page normalement
    else {
        return(
        <div className="admin-tickets">
            <h2>Page Admin Tickets</h2>
        </div>
        );
    }
}