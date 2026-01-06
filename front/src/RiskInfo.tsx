import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RiskEval.css';

export default function RiskInfo() {
  const navigate = useNavigate();
  const params = useParams();
  const label = params.label ? decodeURIComponent(params.label) : '';

  return (
    <div className="survey-root">
      <header className="survey-header">
        <button className="back-btn" aria-label="Retour" onClick={() => navigate(-1)}>
          ←
        </button>
      </header>
      <main className="survey-main">
        <h1>{label || 'Information sur le risque'}</h1>
        <p>
          Voici des informations sur <strong>{label}</strong>.
          Vous pouvez compléter cette page avec des détails spécifiques, des conseils
          ou des liens vers des procédures.
        </p>
      </main>
    </div>
  );
}
