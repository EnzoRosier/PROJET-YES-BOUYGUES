import './SuperAdmin.css';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AjouterAdmin() {

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [worksiteIds, setWorksiteIds] = useState('');
    const [SuperAdmin, setSuperAdmin] = useState(true);

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


          const CreateNew = async () => {
            try {
            const response = await fetch('http://localhost:3001/admins', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({
                    mail: email,
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                    isSuperAdmin: true,
                    worksiteIds: worksiteIds
                }),
            });

            } catch (error) {
            console.log('Erreur login');
            }
        };

        const GetWList = async () => {
            try {
            const response = await fetch('http://localhost:3001/worksite', {
                method: 'GET',
                credentials: 'include', 
            });
            const data = await response.json();
            for (let worksite of data) {
                console.log(worksite.id);
                console.log(worksite.nom);
            }
            } catch (error) {
            console.log('ErreurWorksites');
            }
        };


        GetWList();
        checkSuperLoggedIn();
        //CreateNew();
    }, []);

    if (loggedIn === null) {
        return <div className="admin-liste"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn || !isSuperAdmin) {
        return <Navigate to="/login" replace />;
    }
    return (
    <h2>BigListe</h2>
    );

}

        