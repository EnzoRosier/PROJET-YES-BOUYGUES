import './SuperAdminList.css';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminList() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [admins, setAdmins] = useState<any[]>([]);      
    const [adminDetails, setAdminDetails] = useState<{ [key: number]: any }>({});


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

        const getAdminList = async () => {
            const response = await fetch('http://localhost:3001/admins', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setAdmins(data);
            console.log(data)
        };


        

        checkLoggedIn();
        getAdminList();
    }, []);

    if (loggedIn === null) {
        return <div className="admin-tickets"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-tickets">
            <img
                src="/ressources/Logo.png"
                alt="Logo"
                className="logo-admin"
            />

            <h2 className="admin-title">Liste des administrateurs</h2>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Colonne 1</th>
                            <th>Colonne 2</th>
                            <th>Colonne 3</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((admin, index) => (
                            <tr
                                key={index}
                                className="table-row"
                                onClick={() => console.log('Ligne cliquée:', admin)}
                            >
                                <td>{admin.firstName + "  " + admin.lastName} </td>
                                <td>{admin.mail}</td>
                                <td>{admin.roles?.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
