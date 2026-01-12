import './accueil.css';
import { Link } from 'react-router-dom';

export default function Accueil() {

    return (
        <div className="accueil">
            <img src="/ressources/Logo.png" alt="Logo" className="logo-accueil"/>
            <h1 className="titre-accueil">Safety</h1>

            <Link to="/Formulaire"><button className='bouton-formulaire'>Remplir le formulaire</button></Link>
            <Link to="/login"><button className='bouton-login'>
                <img src="/ressources/Login.png" alt="Login" className="icone-login"/>
            </button></Link>
        </div>
    );
}