import './accueil.css';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from "qrcode.react";

export default function Accueil() {
    const ip = window.location.hostname;
    const url = `http://${ip}:3000/Formulaire`;

    return (
        <div className="accueil">
            <img src="/ressources/Logo.png" alt="Logo" className="logo-popup"/>
            <h1 className="titre-accueil">Safety</h1>

            <QRCodeCanvas value={url} size={200} className="qrcode"/>

            <Link to="/Formulaire"><button className='bouton-formulaire'>▶</button></Link>
            <Link to="/login"><button className='bouton-login'>
                🔒
            </button></Link>
        </div>
    );
}