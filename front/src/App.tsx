// src/App.tsx

import React, { useState } from 'react';
import './App.css'; 
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LoginManager from "./components/LoginManager/LoginManager"; 

const App: React.FC = () => {
    // État pour contrôler l'affichage
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    // Fonction pour changer l'état au clic sur le logo
    const handleLogoClick = () => {
        setIsSplashVisible(false); // Passe à l'écran de connexion
    };

    if (isSplashVisible) {
        // Affiche l'écran de démarrage. Au clic, il appelle handleLogoClick
        return <SplashScreen onLogoClick={handleLogoClick} />;
    }

    // Affiche UNIQUEMENT le LoginManager. 
    // Le LoginManager doit gérer son propre fond blanc, centrage et taille 100vh.
    return (
        <LoginManager /> 
    );
}

export default App;