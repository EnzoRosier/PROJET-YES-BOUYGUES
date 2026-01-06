// src/components/SuperAdminDashboard/SuperAdminDashboard.tsx

import React from 'react';
import './SuperAdminDashboard.css'; 

interface SuperAdminDashboardProps {
    userName: string;
    currentChantier: string;
    onChantierReset: () => void; // Pour le bouton "Changer de chantier"
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ userName, currentChantier, onChantierReset }) => {

    // --- DONNÉES SIMULÉES DU CHANTIER ---
    // Ces données seront à récupérer via l'API plus tard
    const chantierData = {
        localisation: 'Paris 2',
        responsableSecurite: 'Sheila AKE',
        dureePrevue: '18 mois',
        collaborateurs: 241,
        joursSansAccident: 142,
        progression: 75, // en pourcentage
        scoreSecurite: 4, // étoiles
    };

    const renderStars = (score: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} style={{ color: index < score ? '#ffc107' : '#ccc' }}>
                ⭐
            </span>
        ));
    };

    return (
        <div className="superadmin-dashboard-container">
            <header className="dashboard-header-bar">
                <div className="flag">🇫🇷</div> 
                <button className="reset-button" onClick={onChantierReset}>
                    Changer de chantier
                </button>
                <div className="lock">🔒</div>
            </header>
            
            <main className="superadmin-content-area">
                <div className="chantier-card-superadmin">
                    <img
                        src="chantier-placeholder.jpg" 
                        alt={currentChantier}
                        className="chantier-image-main"
                    />
                    
                    <h2 className="chantier-title">{currentChantier}</h2>
                    
                    {/* --- Métadonnées --- */}
                    <div className="metadata-grid">
                        <p>📍 Localisation : {chantierData.localisation}</p>
                        <p>🗓️ Durée prévue : {chantierData.dureePrevue}</p>
                        <p>👤 Responsable sécurité : {chantierData.responsableSecurite}</p>
                        <p>👥 Collaborateurs : {chantierData.collaborateurs}</p>
                    </div>

                    {/* --- Boutons d'Action SuperAdmin --- */}
                    <div className="admin-buttons-group">
                        <button className="btn-action primary">Consulter les tickets</button>
                        <button className="btn-action primary">Consulter les avis</button>
                        <button className="btn-action secondary">Gérer les accès</button>
                        <button className="btn-action secondary">Changer de chantier</button>
                    </div>

                    {/* --- Progression et Score --- */}
                    <div className="progress-metrics">
                        <p>Progression du chantier :</p>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar" 
                                style={{ width: `${chantierData.progression}%` }}
                            ></div>
                        </div>
                        <p>Jours sans accident : **{chantierData.joursSansAccident}**</p>
                        <p>Score sécurité global : {renderStars(chantierData.scoreSecurite)}</p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SuperAdminDashboard;