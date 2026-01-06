import React, { useState } from 'react';
import './App.css'; 
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LoginManager from "./components/LoginManager/LoginManager"; 
import SuperAdminDashboard from './components/SuperAdminDashboard/SuperAdminDashboard'; 
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; 
import ChantierSelector from './components/ChantierSelector/ChantierSelector'; 

const App: React.FC = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [userData, setUserData] = useState<{ role: 'SuperAdmin' | 'Admin', name: string } | null>(null);

    // État pour mémoriser le chantier choisi
    const [selectedChantier, setSelectedChantier] = useState<string | null>(null);

    const handleLogoClick = () => {
        setIsSplashVisible(false);
    };

    const handleLoginSuccess = (data: { role: 'SuperAdmin' | 'Admin', name: string }) => {
        setUserData(data); 
        // Réinitialise la sélection de chantier à la connexion (première connexion)
        setSelectedChantier(null); 
    };

    const handleChantierSelect = (chantierName: string) => {
        setSelectedChantier(chantierName);
    };
    
    // Fonction pour réinitialiser le chantier sélectionné
    const handleChantierReset = () => {
        setSelectedChantier(null);
    };


    if (isSplashVisible) {
        return <SplashScreen onLogoClick={handleLogoClick} />;
    }

    if (userData) {
        // --- LOGIQUE SPÉCIFIQUE AU SUPERADMIN ---
        if (userData.role === 'SuperAdmin') {
            
            // 1. PAS DE CHANTIER CHOISI -> Affiche le sélecteur
            if (!selectedChantier) {
                return (
                    <ChantierSelector 
                        onChantierSelect={handleChantierSelect} 
                        userName={userData.name}
                    />
                );
            }
            
            // 2. CHANTIER CHOISI -> Affiche le Dashboard
            return (
                <SuperAdminDashboard 
                    userName={userData.name} 
                    currentChantier={selectedChantier} 
                    onChantierReset={handleChantierReset} // 👈 CORRECTION APPLIQUÉE ICI
                />
            );
        }
        
        // --- LOGIQUE ADMIN ---
        if (userData.role === 'Admin') {
            return <AdminDashboard userName={userData.name} />; 
        }
    }
    
    // Affiche le LoginManager si pas de splash et pas de userData
    return (
      <LoginManager onLoginSuccess={handleLoginSuccess} /> 
    );
}

export default App;
