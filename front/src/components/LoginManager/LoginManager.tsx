// src/components/LoginManager/LoginManager.tsx

import React, { useState } from 'react';
import './LoginManager.css'; 

// --- MODIFICATION DE L'URL DE L'API ---
// Nous supposons que NestJS tourne sur le port 3001 pour ne pas entrer en conflit avec React (souvent 3000).
// Le contrôleur est configuré pour écouter sur '/auth/login'.
const API_URL = 'http://localhost:3001/auth/login'; 
// ------------------------------------

interface LoginManagerProps {
    // Ceci doit être le type attendu par LoginManager
    onLoginSuccess: (data: { role: 'SuperAdmin' | 'Admin', name: string }) => void;
}

const LoginManager: React.FC<LoginManagerProps> = ({ onLoginSuccess }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!identifier || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, { // 👈 Appel vers la nouvelle URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();

            // Le backend NestJS renvoie { success: true, ... } ou un message d'erreur HTTP 401
            if (response.ok && data.success) {

              // Connexion réussie
              onLoginSuccess({ role: data.role, name: data.name }); // 👈 ENVOIE LE NOM ET LE RÔLE
            } else {

              // Échec de la connexion (erreur 401 ou message d'erreur)
              setError(data.message || "Identifiant ou mot de passe incorrect.");
            }
        } catch (err) {
            setError("Impossible de contacter le serveur backend. Assurez-vous qu'il tourne sur http://localhost:3001.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-manager-container">
            <div className="flag-lock-container">
                <div className="flag">🇫🇷</div> 
                <div className="lock">🔒</div> 
            </div>
            
            <div className="login-box-wrapper">
                <div className="login-form-area">
                    <h2 className="login-title">Connexion Manager</h2>
                    
                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                    
                    <form>
                        <div className="input-group">
                            <span className="icon">👤</span> 
                            <input 
                                type="text" 
                                placeholder="Identifiant" 
                                className="input-field" 
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-group">
                            <span className="icon">🔒</span> 
                            <input 
                                type="password" 
                                placeholder="Mot de passe" 
                                className="input-field" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            className="connexion-button" 
                            onClick={handleLogin}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion en cours...' : 'Connexion'}
                        </button>
                    </form>
                </div>
                
                <div className="logo-area">
                    <img
                        src="/bybat-industrie-v2.png" 
                        alt="Bouygues Bâtiment Industrie"
                        className="login-logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginManager;