import './accueil-admin.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function AccueilAdmin() {
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
                } else {
                    console.log("Erreur lors de la récupération des informations du chantier");
                }
            }
            setDataChantier(infosChantier);
            console.log("Infos chantier récupérées :", infosChantier);
        } catch (error) {
            console.log("Erreur lors de la récupération des informations du chantier");
        }
    };

    const valider_accident = () => {
        console.log("Validation d'un accident...");
        // Implémenter la logique de validation d'accident ici
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
                <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
                <h2>Sélectionner un chantier</h2>
                {dataChantier && (
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
                                    <p>Jours sans accident : {chantier.joursSansAccident} <button className="bouton-valider-accident" onClick={valider_accident}> Valider le nombre de jours sans accidents</button></p>
                                    <p>Date de fin : {chantier.dateFin}</p>
                                </div>
                            ))}
                    </div>  
                )}
                <button className="bouton-tickets" onClick={() => { navigate('/tickets'); }}>Voir les tickets</button>
                <button className="bouton-stats" onClick={() => { navigate('/stats'); }}>Voir les statistiques</button>
                <button className="bouton-retour" onClick={() => { navigate('/login'); }}>Retour</button>
            </div>
        );
    }
}