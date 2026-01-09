import './accueil-super-admin.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function AccueilSuperAdmin() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [worksiteIds, setWorksiteIds] = useState<string[]>(); // Remplacez par l'ID du chantier souhaité
    const [dataChantier, setDataChantier] = useState<any>(null);
    const [chantierSelectionne, setChantierSelectionne] = useState<string | null>(null);
    const navigate = useNavigate();

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

    // On va demander au serveur les informations du chantier pour afficher un récapitulatif.
    const fetchChantierInfo = async () => {
        try {
            let infosChantier = [];
            for (let worksite of worksiteIds || []) {
                const response = await fetch(`http://localhost:3001/worksite/${worksite}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const info = await response.json();
                    infosChantier.push(info);
                    console.log("Infos chantier récupérées");
                } else {
                    console.log("Erreur lors de la récupération des informations du chantier");
                }
            }
            setDataChantier(infosChantier);
        } catch (error) {
            console.log("Erreur lors de la récupération des informations du chantier");
        }
    };

    const valider_accident = async (idChantier: string) => {
        console.log("Validation d'un accident...");
        const response = await fetch(`http://localhost:3001/worksite/resetAccident/${idChantier}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const info = await response.json();
            console.log("Accident validé :");
            fetchChantierInfo(); // Mettre à jour les infos du chantier après validation
        } else {
            console.log("Erreur lors de la récupération des informations du chantier");
        }
    }

    const definirChantierActuel = async (idChantier: string) => {
        try{
            const response = await fetch(`http://localhost:3001/worksite/currentWorksite/${idChantier}`, {
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

    useEffect(() => { // Login
        console.log("Vérification de la connexion...");
        checkLoggedIn();
    }, []);

    useEffect(() => { // Récupération des tickets
        if (worksiteIds && worksiteIds.length > 0) {
            console.log("Utilisateur connecté, récupération des infos du chantier...");
            fetchChantierInfo();
        }
    }, [worksiteIds]);

    useEffect(() => {
        if (chantierSelectionne === null && dataChantier && dataChantier.length > 0) {
            setChantierSelectionne(dataChantier[0].id);
        }
    }, [dataChantier]);

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
                <div className="accueil-admin-main">
                <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
                {dataChantier && (
                <>
                <h2 className="titre-selecteur">Sélectionner un chantier 
                    <select className="select-chantier" value={chantierSelectionne ?? ""} onChange={(e) => setChantierSelectionne(e.target.value)}>
                        <option value="" disabled>
                            Sélectionner un chantier
                        </option>

                        {dataChantier.map((chantier:any) => (
                            <option key={chantier.id} value={chantier.id}>
                            {chantier.nom}
                            </option>
                        ))}
                    </select>
                </h2>
                    <button className="bouton-tickets" onClick={() => { navigate('/tickets'); }}>Voir les tickets</button>
                </>
                )}
                {!dataChantier && (
                    <h2 className="titre-selecteur">Aucun chantier associé à votre compte, pour en lier un veuillez contacter la personne en charge de ce chantier.</h2>
                )}

                {chantierSelectionne && (
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
                                    <button className="bouton-stats" onClick={() => { navigate('/stats', {state : {idChantier : chantier.id}}); }}>Voir les statistiques</button>
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