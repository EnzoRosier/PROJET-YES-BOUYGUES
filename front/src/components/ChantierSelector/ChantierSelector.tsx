// src/components/ChantierSelector/ChantierSelector.tsx

import React, { useState } from 'react';
import './ChantierSelector.css'; 

interface ChantierSelectorProps {
    onChantierSelect: (chantierName: string) => void;
    userName: string;
}

const ChantierSelector: React.FC<ChantierSelectorProps> = ({ onChantierSelect }) => {
    // Simuler un état pour le champ de sélection (pour l'exemple)
    const [chantierInput, setChantierInput] = useState('Chantier Big Data'); 

    const handleValidate = () => {
        if (chantierInput) {
            onChantierSelect(chantierInput); // Renvoie le nom du chantier à App.tsx
        }
    };

    return (
        <div className="chantier-selector-container">
            <div className="logo-top">
                <img
                    src="/bybat-industrie-v2.png" // Assurez-vous que le chemin est correct
                    alt="Bouygues Bâtiment"
                    className="small-logo"
                />
            </div>
            
            <h1 className="selector-title">Sélectionnez le chantier</h1>
            
            <div className="chantier-card">
                {/* Image du chantier (celle que vous avez fournie) */}
                <img
                    src="chantier-placeholder.jpg" 
                    alt="Chantier Big Data"
                    className="chantier-image-selector"
                />
                
                {/* Champ de sélection/Nom du Chantier */}
                <input 
                    type="text"
                    value={chantierInput}
                    onChange={(e) => setChantierInput(e.target.value)}
                    className="chantier-input"
                    placeholder="Nom du Chantier"
                />
            </div>
            
            <button className="validate-button" onClick={handleValidate}>
                Validez
            </button>
        </div>
    );
};

export default ChantierSelector;