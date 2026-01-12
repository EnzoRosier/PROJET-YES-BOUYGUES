import './accueil-super-admin.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function AccueilSuperAdmin() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [dataChantier, setDataChantier] = useState<any>(null);
    const [chantierSelectionne, setChantierSelectionne] = useState<string | null>(null);
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");
    const [respoSec, setRespoSec] = useState("");
    const [nbCollaborateurs, setNbCollaborateurs] = useState(0);
    const [dateFin, setDateFin] = useState("");
    const ip = window.location.hostname;

    const checkLoggedIn = async () => {
        // vérifier si l'utilisateur est connecté
        try {
            const response = await fetch(`http://${ip}:3001/admins/me`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const me = await response.json();
                if(me != null && me.isSuperAdmin === true){
                    setLoggedIn(true);
                    console.log("Connexion vérifiée")
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

    // On va demander au serveur les informations de tous les chantiers pour afficher un récapitulatif.
    const fetchChantierInfo = async () => {
        try {
            const response = await fetch(`http://${ip}:3001/worksite/`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const info = await response.json();
                setDataChantier(info);
                console.log("Infos chantiers récupérées");
            } else {
                console.log("Erreur lors de la récupération des informations des chantiers");
            }

        } catch (error) {
            console.log("Erreur lors de la récupération des informations des chantiers");
        }
    };

    const valider_accident = async (idChantier: string) => {
        console.log("Validation d'un accident...");
        const response = await fetch(`http://${ip}:3001/worksite/resetAccident/${idChantier}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            console.log("Accident validé ");
            fetchChantierInfo(); // Mettre à jour les infos du chantier après validation
        } else {
            console.log("Erreur lors de la récupération des informations des chantiers");
        }
    }

    const definirChantierActuel = async (idChantier: string) => {
        try{
            const response = await fetch(`http://${ip}:3001/worksite/currentWorksite`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    worksiteId: idChantier,
                }),
            });
            if (response.ok) {
                const info = await response.json();
                console.log("Chantier actuel défini :", info);
            } else {
                console.log("Erreur lors de la définition du chantier actuel");
            }
        }catch (error) {
            console.log("Erreur lors de la définition du chantier actuel");
        }
    }

    const creerChantier = async () => {
        console.log("Création d'un nouveau chantier...");
        try{
            const response = await fetch(`http://${ip}:3001/worksite/new`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: (document.getElementById("nom-chantier") as HTMLInputElement).value,
                    addresse: (document.getElementById("adresse-chantier") as HTMLInputElement).value,
                    description: (document.getElementById("description-chantier") as HTMLInputElement).value,
                    dateFin: (document.getElementById("date-fin-chantier") as HTMLInputElement).value,
                    nomClient: (document.getElementById("client-chantier") as HTMLInputElement).value,
                    nomRespoSec: (document.getElementById("respoSec-chantier") as HTMLInputElement).value,
                    nbCollaborateur: parseInt((document.getElementById("nbCollaborateurs-chantier") as HTMLInputElement).value),
                    joursSansAccident: 0
                }),
            });
            if (response.ok) {
                const info = await response.json();
                console.log("Chantier créé :", info);
                navigate(0); // Recharger la page pour afficher le nouveau chantier
            } else {
                console.log("Erreur lors de la création du chantier");
            }
        }catch (error) {
            console.log("Erreur lors de la création du chantier");
        }
    }

    useEffect(() => { // Login
        console.log("Vérification de la connexion...");
        checkLoggedIn();
    }, []);

    useEffect(() => { // Récupération des chantiers
        console.log("Récupération des informations des chantiers...");
        fetchChantierInfo();
    }, [

    ]);

    useEffect(() => {
        if (chantierSelectionne === null && dataChantier && dataChantier.length > 0) {
            setChantierSelectionne(dataChantier[0].id);
        }
        else if (chantierSelectionne === null && dataChantier && dataChantier.length === 0) {
            setChantierSelectionne("new");
        }
    }, [dataChantier]);

    // Gestion de la connexion
    if (loggedIn === null) {
        return <div className="accueil-super-admin"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn) {
        console.log("Utilisateur non connecté, redirection vers login");
        return (<Navigate to="/login" replace />);
    }
    // Sinon on peut afficher la page normalement.
    else {
        return(
            <div className="accueil-super-admin">
                <div className="accueil-super-admin-main">
                <img src="/ressources/Logo.png" alt="Logo" className="logo-accueil"/>
                {dataChantier && (
                <>
                <h2 className="titre-selecteur">Sélectionner un chantier 
                    <select className="select-chantier" value={chantierSelectionne ?? ""} onChange={(e) => setChantierSelectionne(e.target.value)}>
                        <option value="new">Créer un nouveau chantier</option>
                    
                        {dataChantier.map((chantier:any) => (
                            <option key={chantier.id} value={chantier.id}>
                            {chantier.nom}
                            </option>
                        ))}
                    </select>
                </h2>
                    <button className="bouton-tickets" onClick={() => { navigate('/tickets', {state : {from : "superadmin"}}); }}>Voir les tickets</button>
                    <button className='bouton-liste-admin' onClick={() => {navigate('/AdminList');}}>Gérer les admins</button>
                </>
                )}
                {chantierSelectionne && chantierSelectionne == "new" && (
                    <form className="chantier-info" onSubmit={(e) => { e.preventDefault(); creerChantier(); }}>
                        <h1>Créer un nouveau chantier</h1>

                        <p>
                        <label htmlFor="nom-chantier">Nom du chantier :</label>
                        <input id="nom-chantier" type="text" value={nom} onChange={e => setNom(e.target.value)} required />
                        </p><p>
                        <label htmlFor="adresse-chantier">Adresse :</label>
                        <input id="adresse-chantier" type="text" value={adresse} onChange={e => setAdresse(e.target.value)} required />
                        </p><p>
                        <label htmlFor="description-chantier">Description :</label>
                        <input id="description-chantier" type="text" value={description} onChange={e => setDescription(e.target.value)} required />
                        </p><p>
                        <label htmlFor="client-chantier">Client :</label>
                        <input id="client-chantier" type="text" value={client} onChange={e => setClient(e.target.value)} required />
                        </p><p>
                        <label htmlFor="respoSec-chantier">Responsable sécurité :</label>
                        <input id="respoSec-chantier" type="text" value={respoSec} onChange={e => setRespoSec(e.target.value)} required />
                        </p><p>
                        <label htmlFor="nbCollaborateurs-chantier">Nombre de collaborateurs :</label>
                        <input id="nbCollaborateurs-chantier" type="number" value={nbCollaborateurs} onChange={e => setNbCollaborateurs(Number(e.target.value))} required />
                        </p><p>
                        <label htmlFor="date-fin-chantier">Date de fin :</label>
                        <input type="date" id="date-fin-chantier" value={dateFin} onChange={e => setDateFin(e.target.value)} required />
                        </p>
                        <input type="submit" value="Créer le chantier" className="bouton-selection-chantier" />
                    </form>
                )}

                {chantierSelectionne && chantierSelectionne!="new" && (
                    <div className="chantier-info">
                        {dataChantier
                            .filter((chantier:any) => chantier.id === chantierSelectionne)
                            .map((chantier:any) => (
                                <div key={chantier.id}>
                                    <h1>Résumé du chantier</h1>
                                    <p>Nom : {chantier.nom}</p>
                                    <p>Adresse : {chantier.addresse}</p>
                                    <p>Description : {chantier.description}</p>
                                    <p>Client : {chantier.nomClient}</p>
                                    <p>Responsable sécurité : {chantier.nomRespoSec}</p>
                                    <p>Nombre de collaborateurs : {chantier.nbCollaborateur}</p>
                                    <p>Jours sans accident : {chantier.joursSansAccident} <button className="bouton-valider-accident" onClick={() => valider_accident(chantier.id)}> Cliquez ici s'il y a eu un accident</button></p>
                                    <p>Date de fin : {chantier.dateFin}</p>
                                    <button className="bouton-stats" onClick={() => { navigate('/stats', {state : {idChantier : chantier.id, from : "superadmin"}}); }}>Voir les statistiques</button>
                                    <button className="bouton-selection-chantier" onClick={() => { definirChantierActuel(chantier.id); }}>Définir comme chantier actuel</button>
                                </div>
                            ))}
                    </div>
                )}
                <button className="bouton-retour" onClick={() => { 
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost"; // On supprime le token qui nous gardait connecté
                    navigate('/login'); }}>Se déconnecter</button>
            </div></div>
        );
    }
}