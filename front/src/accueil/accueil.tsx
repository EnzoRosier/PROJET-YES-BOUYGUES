import './accueil.css';
import { Link } from 'react-router-dom';

export default function Accueil() {

    return (
        <div className="accueil">
            <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
            <h1>Safety</h1>

            <Link to="/Survey"><button className='bouton-formulaire'>Remplir le formulaire</button></Link>
            <Link to="/login"><button className='bouton-login'>
                <img src="/ressources/Login.png" alt="Login" className="icone-login"/>
            </button></Link>
        </div>
    );
}