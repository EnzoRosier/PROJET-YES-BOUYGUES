import React from 'react';
import './AdminDashboard.css';

interface AdminDashboardProps {
    userName: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName }) => {
    return (
        <div className="admin-dashboard-container">
            <h1>Tableau de Bord Admin</h1>
            <p>Bienvenue, {userName}. Vous avez un accès limité à votre chantier.</p>
            {/* Le contenu détaillé sera ajouté plus tard */}
        </div>
    );
};

export default AdminDashboard;
