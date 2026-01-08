import './stats.css';
import DonutChart from './donutDiag';
import { Navigate,useLocation } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

export default function Stats() {
  const location = useLocation();
  const idChantier = location.state?.idChantier || null;
  //à supprimer
  useEffect(() => {
    console.log("ID chantier pour les stats :", idChantier);
  }, []);

  // Données pour le login
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const checkLoggedIn = async () => {
      // vérifier si l'utilisateur est connecté
      try {
          const response = await fetch('http://localhost:3001/admins/me', {
              method: 'GET',
              credentials: 'include',
          });
          if (response.ok) {
              const me = await response.json();
              if(me != null){
                  setLoggedIn(true);
              }
          } else {
              setLoggedIn(false);
          }
      }
      catch (error) {
          console.log('Erreur lors de la vérification de la connexion');
          setLoggedIn(false);
      }
  }
  useEffect(() => {
   checkLoggedIn();
  }, []);

  // Données pour le diagramme
  /*try {
    const voteResp = await fetch('http://localhost:3001/vote/getStatsOf/'+idChantier, {
      method: 'GET',
      credentials: 'include',
      body:{
        "date" : Date.now() - 7*24*60*60*1000 // Dernière semaine
      }
    )
  }*/
  const [chartData, setChartData] = useState<Array<{ label: string; value: number; color: string }>>(()=>{
    const newData = [
      { label: 'Satisfait', value: Math.random() * 100, color: '#34A853' },
      { label: 'Neutre', value: Math.random() * 100, color: '#FBBC05' },
      { label: 'Insatisfait', value: Math.random() * 100, color: '#EA4335' }
    ];
    
    const total = newData.reduce((sum, item) => sum + item.value, 0);
    return newData.map(item => ({
      ...item,
      value: (item.value / total) * 100
    }));
  }); // Tableau vide au début
  
  const [chartOptions, setChartOptions] = useState({
    size: 300,
    thickness: 50,
    showLabels: true,
    showCenterText: true
  });

  const updateData = () => {
  const newData = [
    { label: 'Satisfait', value: Math.random() * 100, color: '#34A853' },
    { label: 'Neutre', value: Math.random() * 100, color: '#FBBC05' },
    { label: 'Insatisfait', value: Math.random() * 100, color: '#EA4335' }
  ];
  
  const total = newData.reduce((sum, item) => sum + item.value, 0);
  const normalizedData = newData.map(item => ({
    ...item,
    value: (item.value / total) * 100
  }));
  
  setChartData(normalizedData);
  };

// Echelle du diagramme en barres
const calculateAdaptiveScale = (data: Array<{ value: number }>) => {
  if (!data || data.length === 0) {
    return {
      max: 100,
      ticks: [0, 25, 50, 75, 100]
    };
  }
  
  const maxValue = Math.max(...data.map(item => item.value));
  const intervals = [1, 2, 5, 10, 20, 25, 50, 100];
  let scaleMax = 100;
  
  for (const interval of intervals) {
    if (maxValue <= interval * 10) {
      scaleMax = Math.ceil(maxValue / interval) * interval;
      break;
    }
  }
  const numTicks = 5;
  const tickStep = scaleMax / (numTicks - 1);
  const ticks = [];
  
  for (let i = 0; i < numTicks; i++) {
    const tickValue = Math.round(i * tickStep);
    ticks.push(tickValue);
  }
  
  return { max: scaleMax, ticks };
};

  // Gestion de l'état de connexion
  // Si en cours d'évaluation, on met le chargement.
  if (loggedIn === null) {
        return <div className="stats"><h2>Chargement...</h2></div>;
  }

  // Si pas connecté, on redirige vers la page de login.
  if (!loggedIn) {
      console.log("Utilisateur non connecté, redirection vers login");
      return (<Navigate to="/login" replace />);
  }

  // Sinon on peut afficher la page normalement.
  else { 
    return (
    <div className="stats">
      <header className="stats-header">
        <img src="/ressources/Logo.png" alt="Logo" className="logo" />
        <h1>Tableau de Bord - Statistiques</h1>
      </header>

    <div className="stats-content">
      {/* Section principale avec le diagramme */}
      <section className="chart-section">
          <div className="chart-container">            
            <div className="chart-wrapper">
              <DonutChart 
                data={chartData}
                size={chartOptions.size}
                thickness={chartOptions.thickness}
                showLabels={chartOptions.showLabels}
                showCenterText={chartOptions.showCenterText}
              />
            </div>
            <div className="mini-chart">
              <h4>Diagramme des risques signalés</h4>
              <div className="bar-chart-with-axis">
              {(() => {
                const { max: scaleMax, ticks } = calculateAdaptiveScale(chartData); 
                return (
                  <>
                  <div className="y-axis">
                  <div className="y-ticks">
                  {ticks.map((tick) => (
                    <div 
                    key={tick} 
                    className="y-tick"
                    style={{ bottom: `${(tick / scaleMax) * 100}%` }}
                    >
                      <span className="tick-line"></span>
                      <span className="tick-value">{tick}</span>
                    </div>
                ))}
                </div>
                </div>
                <div className="chart-area">
                <div className="bar-chart-preview">
                {chartData.map((item, index) => {
                  const percentage = (item.value / scaleMax) * 100;
                  const barHeight = (percentage / 100) * 180;
                  return (
                    <div key={index} className="bar-container">
                      <div 
                        className="bar" 
                        style={{ 
                          height: `${barHeight}px`,
                          backgroundColor: item.color
                        }}
                      />
                      <div className="bar-label">{item.label} : {item.value.toFixed(1)}</div>
                    </div>
                  );
                })}
              </div>
              </div>
              </>
                );
          })()}
    </div>
  </div>
  </div>
        </section>
      <div className="chart-controls">
          <button onClick={updateData} className="btn btn-primary">
            Générer Nouvelles Données (Bouton de test pour le changement de nombres)
          </button>
      </div>
    </div>
    </div>
    );
}
}
