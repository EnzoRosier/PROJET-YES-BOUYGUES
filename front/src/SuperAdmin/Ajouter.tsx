import './SuperAdmin.css';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AjouterAdmin() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

        useEffect(() => {
        const checkSuperLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3001/admins/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    setLoggedIn(false);
                    setIsSuperAdmin(false);
                return;
            }
            const me = await response.json();
            setLoggedIn(true);
            setIsSuperAdmin(me.isSuperAdmin); 
            } catch {
                setLoggedIn(false);
                setIsSuperAdmin(false);
            }
        };

        checkSuperLoggedIn();
    }, []);

    if (loggedIn === null) {
        return <div className="admin-liste"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn || !isSuperAdmin) {
        return <Navigate to="/login" replace />;
    }

}

        