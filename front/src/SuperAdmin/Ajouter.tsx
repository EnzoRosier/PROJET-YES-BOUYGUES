import './SuperAdmin.css';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminList() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3001/admins/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                setLoggedIn(response.ok);
            } catch {
                setLoggedIn(false);
            }
        };

        checkLoggedIn();
    }, []);

}

        