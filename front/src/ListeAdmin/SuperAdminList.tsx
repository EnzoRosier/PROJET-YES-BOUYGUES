import './SuperAdminList.css';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function AdminList() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
    const [admins, setAdmins] = useState<any[]>([]);      
    const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);
    const navigate = useNavigate();
    const ip = window.location.hostname;

    useEffect(() => {
        const checkSuperLoggedIn = async () => {
            try {
                const response = await fetch(`http://${ip}:3001/admins/me`, {
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

        const getAdminList = async () => {
            const response = await fetch(`http://${ip}:3001/admins`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setAdmins(data);
            console.log(data)
        };


        

        checkSuperLoggedIn();
        getAdminList();
    }, []);

    if (loggedIn === null) {
        return <div className="admin-liste"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn || !isSuperAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-liste">
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
                            <th>Nom Prenom</th>
                            <th>Email</th>
                            <th>Chantiers</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((admin, index) => (
                            <tr
                                key={index}
                                className="table-row"
                                onClick={() => setSelectedAdmin(admin)}

                            >
                                <td>{admin.firstName + "  " + admin.lastName} </td>
                                <td>{admin.mail}</td>
                                <td>{admin.worksites?.map((r:any) =>r.nom).join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="admin-actions">
                <button
                    className="add-btn"
                    onClick={() => { navigate('/AjouterAdmin'); }}
                >
                    Ajouter
                </button>

                {selectedAdmin && (
                    <button
                        className="delete-btn"
                        onClick={() => { navigate('/ModifierAdmin',{state : {
                            idAdmin : selectedAdmin.id,
                            firstName:selectedAdmin.firstName,
                            lastName:selectedAdmin.lastName,
                            email:selectedAdmin.mail,
                            isSuperAdmin:selectedAdmin.isSuperAdmin,
                            worksiteId:selectedAdmin.worksiteId
                        }}); }}
                    >
                        Modifier
                    </button>
                )}
            </div>

            <button
                className="bouton-aurevoir"
                onClick={() => { navigate('/login'); }}
            >
                Retour
            </button>


        </div>
    );
}
