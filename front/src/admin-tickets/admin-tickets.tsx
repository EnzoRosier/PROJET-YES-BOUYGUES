import './admin-tickets.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { use, useEffect, useState } from 'react';

export default function AdminTickets() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [dataTickets, setDataTickets] = useState<any>(null);
    const navigate = useNavigate();
    const [worksiteIds, setWorksiteIds] = useState<string[]>(); // Remplacez par l'ID du chantier souhaité

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
                    console.log("Connexion vérifiée")

                    // On va récupérer les IDs des chantiers associés à l'admin
                    let worksiteIdsextracted : string[] = [];
                    for (let worksite of me.worksites) {
                        worksiteIdsextracted.push(worksite.id);
                    }
                    setWorksiteIds(worksiteIdsextracted); // Pour les stocker ici
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

    const getAllTickets = async () => {
        try {
            let ticketsById: any[] = []
            for (let worksiteId of worksiteIds || []) {
                const response = await fetch(`http://localhost:3001/vote/getByWorksite/${worksiteId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const tickets = await response.json();
                    ticketsById = [...ticketsById, ...tickets];
                }
                else {
                    console.log("Erreur lors de la récupération des tickets");
                }
            }
            setDataTickets(ticketsById);
        } catch (error) {
            console.log('Erreur lors de la récupération des tickets');
        }
    }

    useEffect(() => { // Login
        console.log("Vérification de la connexion...");
        checkLoggedIn();
    }, []);

    useEffect(() => { // Récupération des tickets
        if (worksiteIds && worksiteIds.length > 0) {
            console.log("Utilisateur connecté, récupération des tickets...");
            getAllTickets();
        }
    }, [worksiteIds]);

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
        
        <table className="table-tickets">
            <thead className="table-tickets-head">
                <tr className="table-tickets-row table-tickets-header-row">
                    <th className="table-tickets-header">Identifiant</th>
                    <th className="table-tickets-header">Commentaire</th>
                    <th className="table-tickets-header">Date</th>
                    <th className="table-tickets-header">Date Cloture</th>
                    <th className="table-tickets-header">Chantier</th>
                </tr>
            </thead>
            <tbody className="table-tickets-body">
                {Object.entries(dataTickets || {}).map(([id, infos]: [string, any]) => (
                <tr
                    key={id}
                    className="table-tickets-row table-tickets-data-row"
                    onClick={() => navigate(`/admin-tickets/${id}`)}
                >
                <td className="table-tickets-cell">{id}</td>
                <td className="table-tickets-cell">{infos.reponse}</td>
                <td className="table-tickets-cell">{infos.date}</td>
                <td className="table-tickets-cell">{infos.dateCloture}</td>
                <td className="table-tickets-cell">{infos.worksite.nom}</td>
                </tr>
                ))}
            </tbody>
        </table>
        <button className="bouton-retour-accueil-admin" onClick={() => navigate('/admin')}>Retour</button>
        </div>
        );
    }
}