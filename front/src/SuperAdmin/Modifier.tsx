import './SuperAdmin.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ModifierAdmin() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isSuper, setIsSuper] = useState<boolean>(true);
    const [worksiteId, setWorksiteId] = useState<string>('');

    const [worksites, setWorksites] = useState<any[]>([]);

    const navigate = useNavigate();

    const location = useLocation();
    const idAdmin = location.state?.idAdmin || null;
    const firstName = location.state?.firstName || null;
    const lastName = location.state?.lastName || null;
    const emailState = location.state?.email || null;
    const isSuperAdminState = location.state?.isSuperAdmin || false;
    const worksiteIdState = location.state?.worksiteId || null;

    useEffect(() => {
        if (!idAdmin) return;

        setEmail(emailState ?? '');
        setFirstname(firstName ?? '');
        setLastname(lastName ?? '');
        setIsSuper(isSuperAdminState ?? false);
        setWorksiteId(worksiteIdState ?? '');
    }, [idAdmin]);

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

        const fetchWorksites = async () => {
            try {
                const response = await fetch('http://localhost:3001/worksite', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setWorksites(data);
            } catch {
                console.log('Erreur récupération chantiers');
            }
        };
        checkSuperLoggedIn();
        fetchWorksites();
    }, []);

    const handleSubmit = async () => {
        if (!email || !password || !firstname || !lastname) {
            alert('Tous les champs doivent avoir une valeur');
            return;
        }

        const confirmed = window.confirm('Confirmer l’ajout de cet administrateur ?');
        if (!confirmed) return;

        console.log({
            mail: email,
            password,
            firstName: firstname,
            lastName: lastname,
            isSuperAdmin: isSuper,
            worksiteId: worksiteId || null,
        });


        try {
            const response = await fetch(`http://localhost:3001/admins/edit/${idAdmin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({
                    mail: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    isSuperAdmin: isSuper,
                    worksiteId: worksiteId ? [worksiteId] : [],
                }),
            });
        } catch (error) {
            console.log('Erreur login');
        }
        navigate('/AdminList');
        
    };

    if (loggedIn === null) {
        return <div className="admin-liste"><h2>Chargement...</h2></div>;
    }

    if (!loggedIn || !isSuperAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-liste">
            <img src="/ressources/Logo.png" alt="Logo" className="logo-admin" />

            <button className="bouton-retour" onClick={() => navigate('/AdminsList')}>
                Retour
            </button>

            <h2>Modifier ou Supprimer un administrateur</h2>

            <div className="form-container">
                <label>Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label>Mot de passe *</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <label>Prénom *</label>
                <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />

                <label>Nom *</label>
                <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />

                <label>Super administrateur *</label>
                <select value={isSuper ? 'true' : 'false'} onChange={e => setIsSuper(e.target.value === 'true')}>
                    <option value="true">Vrai</option>
                    <option value="false">Faux</option>
                </select>

                <label>Chantier (optionnel)</label>
                <select value={worksiteId} onChange={e => setWorksiteId(e.target.value)}>
                    <option value="">Aucun</option>
                    {worksites.map(ws => (
                        <option key={ws.id} value={ws.id}>
                            {ws.nom}
                        </option>
                    ))}
                </select>

                <button className="add-btn" onClick={handleSubmit}>
                    Modifier
                </button>

                <button
                    className="delete-btn"
                    onClick={async () => {
                        const confirmed = window.confirm(
                            'Êtes-vous sûr de vouloir supprimer cet administrateur ?'
                        );
                        if (!confirmed) return;

                        try {
                            console.log(idAdmin);
                            await fetch(`http://localhost:3001/admins/delete/${idAdmin}`, {
                                method: 'POST',
                                credentials: 'include',
                            });
                        } catch {
                            alert('Erreur lors de la suppression');
                        }

                        navigate('/AdminList');
                    }}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}
