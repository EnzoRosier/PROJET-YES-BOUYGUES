import './admin-tickets.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminTickets() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [dataTickets, setDataTickets] = useState<any>(null);
    const navigate = useNavigate();
    const [worksiteId, setWorksiteId] = useState<string>(); // Remplacez par l'ID du chantier souhaité

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
                    console.log("Utilisateur connecté :", me);
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


    const getAllTickets = async () => {
        try {
            const response = await fetch(`http://localhost:3001/vote/getByWorksite/${worksiteId}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const tickets = await response.json();
                console.log("Tickets récupérés avec succès", tickets);

                // Désormais on va les réorganiser en fonction de leur id
                const ticketsById = tickets.reduce((acc : any, el : any) => {
                    const { id, ...other } = el;
                    acc[id] = other;
                    return acc;
                }, {});
                console.log("Tickets réorganisés par ID", ticketsById);
                setDataTickets(ticketsById); // On stocke les tickets réorganisés
            }
            else {
                console.log("Erreur lors de la récupération des tickets");
            }
        } catch (error) {
            console.log('Erreur lors de la récupération des tickets');
        }
    }

    // On appelle la fonction qui récupère tous les tickets au chargement du composant.
    useEffect(() => {
        console.log("Chargement des tickets...");
        getAllTickets();
    }, []);

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
        <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
        
        <table>
            <thead>
                <tr>
                <th>Identifiant</th>
                <th>Commentaire</th>
                <th>Date</th>
                <th>Date Cloture</th>
                <th>Chantier</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(dataTickets || {}).map(([id, infos]: [string, any]) => (
                <tr key={id} onClick={ () => {
                    console.log("Ticket cliqué :", id, infos);
                    navigate(`/admin-tickets/${id}`); }}>
                    <td>{id}</td>
                    <td>{infos.reponse}</td>
                    <td>{infos.commentaire}</td>
                    <td>{infos.date}</td>
                    <td>{infos.dateCloture}</td>
                    <td>{infos.worksite.nom}</td>
                </tr>
                ))}
            </tbody>
        </table>
        <button className="bouton-refresh" onClick={getAllTickets}>Retour</button>
        </div>
        );
    }
}