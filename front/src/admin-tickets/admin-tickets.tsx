import './admin-tickets.css';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { use, useEffect, useState } from 'react';

export default function AdminTickets() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [dataTickets, setDataTickets] = useState<any>(null);
    const navigate = useNavigate();
    const [worksiteIds, setWorksiteIds] = useState<string[]>(); // Remplacez par l'ID du chantier souhaité
    const { idTicket } = useParams<{ idTicket: string }>(); // On prend l'id du ticket dans l'URL s'il y en a un


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
            console.log("Tickets récupérés :", ticketsById);
        } catch (error) {
            console.log('Erreur lors de la récupération des tickets');
        }
    }

    const cloturer_ticket = async (idTicket: string) => {
        try {
            let reponse = (document.querySelector('.input-reponse-ticket') as HTMLInputElement).value;
            const response = await fetch(`http://localhost:3001/vote/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: idTicket,
                    reponse : reponse,
                }),
            });
            if (response.ok) {
                console.log("Ticket cloturé avec succès");
                getAllTickets(); // On rafraîchit la liste des tickets
                navigate('/tickets'); // On retourne à la liste des tickets
            }
            else {
                console.log("Erreur lors de la clôture du ticket");
            }
        } catch (error) {
            console.log('Erreur lors de la clôture du ticket');
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
        {idTicket && dataTickets && ( // Si on a un id de ticket dans l'URL, on affiche le popup de détail du ticket
            <div className="admin-tickets-popup">
                <h2>Détail du ticket {idTicket}</h2>
                <div className="date-ticket">Le {dataTickets[idTicket]?.date}</div>
                <div className="chantier-ticket">Chantier : {dataTickets[idTicket]?.worksite.nom}</div>
                <div className="response-vote">A voté : {dataTickets[idTicket]?.reponse}</div>
                {dataTickets[idTicket]?.commentaire && (
                    <div className="commentaire-ticket">Commentaire : {dataTickets[idTicket]?.commentaire}</div>
                )}
                
                {dataTickets[idTicket]?.reponseCommentaire && dataTickets[idTicket]?.dateCloture &&(
                    <>
                    <p>Réponse aportée le {dataTickets[idTicket]?.dateCloture}</p>
                    <div className="response-ticket">{dataTickets[idTicket]?.reponseCommentaire}</div>
                    </>
                    
                    
                )}
                {!dataTickets[idTicket]?.reponseCommentaire && dataTickets[idTicket]?.dateCloture && (
                    <div className="response-ticket">Ce ticket a été cloturé le {dataTickets[idTicket]?.dateCloture}</div>
                )}
                {!dataTickets[idTicket]?.dateCloture && (
                    <>
                        <p>Réponse (Optionnelle)</p>
                        <input className="input-reponse-ticket" type="text" placeholder="Ajouter un commentaire de clôture"/>
                        <button className="bouton-cloturer-ticket" onClick={() => cloturer_ticket(idTicket)}>Clôturer le ticket</button>
                    </>
                )}
                
            </div>
        )}
        <div className="admin-tickets-main">
        <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
        
        <table className="table-tickets">
            <thead className="table-tickets-head">
                <tr className="table-tickets-row table-tickets-header-row">
                    <th className="table-tickets-header">Identifiant</th>
                    <th className="table-tickets-header">Réponse</th>
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
                    onClick={() => navigate(`/tickets/${id}`)}
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
        </div></div>
        );
    }
}