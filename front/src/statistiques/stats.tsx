import './stats.css';
import DonutChart from './donutDiag';
import { Navigate,useLocation, useNavigate } from 'react-router-dom';
import React, {useEffect, useState, useRef, use} from 'react';

export default function Stats() {
  const location = useLocation();
  const idChantier = location.state?.idChantier || null;
  const navigate = useNavigate();
  
  // Données pour le login
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  
  // État de départ pour les diagrammes
  const [donutChartData, setDonutChartData] = useState<Array<{ label: string; value: number; color: string }>>([
    { label: 'Satisfait', value: 0, color: '#34A853' },
    { label: 'Neutre', value: 0, color: '#FBBC05' },
    { label: 'Insatisfait', value: 0, color: '#EA4335' }
  ]);
  
  const [barChartData, setBarChartData] = useState<Array<{ label: string; value: number; color: string }>>([
    { label: 'Levage', value: 0, color: '#FF6B6B' },
    { label: 'Cohésion', value: 0, color: '#4ECDC4' },
    { label: 'Environnement', value: 0, color: '#45B7D1' },
    { label: 'Equipement', value: 0, color: '#96CEB4' },
    { label: 'Hauteur', value: 0, color: '#FFD93D' },
    { label: 'Stabilité', value: 0, color: '#FF6F91' },
    { label: 'Ambiance', value: 0, color: '#6A4C93' },
    {label: 'Energie', value: 0, color: '#1982C4' },
    { label: 'Autre', value: 0, color: '#8ACB88' }
  ]);
  
  // Options des diagrammes
  const [chartOptions, setChartOptions] = useState({
    size: 300,
    thickness: 50,
    showLabels: true,
    showCenterText: true
  });
  
  // Période sélectionnée pour les diagrammes
  const [dateRange, setDateRange] = useState<string>('week');
  
  // Références fixes pour les titres
  const totalVotesLastWeek = useRef<number>(0);
  const totalRisksLastWeek = useRef<number>(0);
  
  // Fonction pour formater la date
  const formatDateYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Fonction pour calculer la date de début selon la période
  const calculateStartDate = (range: string): string => {
    const today = new Date();
    const start = new Date();
    
    switch (range) {
      case 'week':
        start.setDate(today.getDate() - 7);
        break;
      case '2weeks':
        start.setDate(today.getDate() - 14);
        break;
      case 'month':
        start.setMonth(today.getMonth() - 1);
        break;
      default:
        start.setDate(today.getDate() - 7);
    }
    
    return formatDateYYYYMMDD(start);
  };
  
  // Fonction pour vérifier la connexion
  const checkLoggedIn = async () => {
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
    } catch (error) {
      console.log('Erreur lors de la vérification de la connexion');
      setLoggedIn(false);
    }
  };
  
  // Fonction pour récupérer les statistiques
  const getWorksiteStats = async (period: string = 'week') => {
    if (!idChantier) return;
    
    try {
      const startDate = calculateStartDate(period);
      
      console.log(`Récupération des stats à partir du ${startDate} (${period})`);
      const response = await fetch(
        `http://localhost:3001/vote/getStatsOf/${idChantier}`, 
        {
          method: 'POST',
          credentials: 'include',
          body : JSON.stringify({ date : startDate
        })
      }
      );
      
      if (response.ok) {
        const stats = await response.json();
        console.log("Statistiques reçues :", stats);
        
        // Données pour le diagramme donut (humeurs)
        const bien = stats.questionHumeur?.bien || 0;
        const moyen = stats.questionHumeur?.moyen || 0;
        const mauvais = stats.questionHumeur?.mauvais || 0;
        
        // Données pour le diagramme en barres (risques)
        const risques = stats.questionRisque || {};
        const levage = risques.levage || 0;
        const cohesion = risques.cohesion || 0;
        const environnement = risques.environement || 0;
        const equipement = risques.equipement || 0;
        const hauteur = risques.hauteur || 0;
        const stabilite = risques.stabilite || 0;
        const ambiance = risques.ambiance || 0;
        const energie = risques.energie || 0;
        const autre = risques.autre || 0;
        // Calculer le total des votes pour cette période
        const totalCurrentPeriod = bien + moyen + mauvais;
        const totalRisksCurrentPeriod = levage + cohesion + environnement + equipement + hauteur + stabilite + ambiance + energie + autre;
        
        // Si c'est la période "1 semaine", mettre à jour les refs
        if (period === 'week') {
          totalVotesLastWeek.current = totalCurrentPeriod;
          totalRisksLastWeek.current = totalRisksCurrentPeriod;
        }
        
        // Mettre à jour les diagrammes
        setDonutChartData([
          { label: 'Satisfait', value: bien, color: '#34A853' },
          { label: 'Neutre', value: moyen, color: '#FBBC05' },
          { label: 'Insatisfait', value: mauvais, color: '#EA4335' }
        ]);

        setBarChartData([
          { label: 'Levage', value: levage || 0, color: '#FF6B6B' },
          { label: 'Cohésion', value: cohesion || 0, color: '#4ECDC4' },
          { label: 'Environnement', value: environnement || 0, color: '#45B7D1' },
          { label: 'Equipement', value: equipement || 0, color: '#96CEB4' },
          { label: 'Hauteur', value: hauteur || 0, color: '#FFD93D' },
          { label: 'Stabilité', value: stabilite || 0, color: '#FF6F91' },
          { label: 'Ambiance', value: ambiance || 0, color: '#6A4C93' },
          { label: 'Energie', value: energie || 0, color: '#1982C4' },
          { label: 'Autre', value: autre || 0, color: '#8ACB88' }
        ]);   
      } else {
        console.error("Erreur API :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
    }
  };
  
  // Chargement initial (1 semaine par défaut)
  useEffect(() => {
    checkLoggedIn();
    if (idChantier) {
      console.log("Chargement des stats pour le chantier :", idChantier);
      getWorksiteStats('week');
    }
  }, [idChantier]);
  
  // Gestion des périodes
  const handlePeriodChange = (period: string) => {
    setDateRange(period);
    getWorksiteStats(period);
  };
  
  // Échelle adaptative pour le diagramme en barres
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
  if (loggedIn === null) {
    return <div className="stats"><h2>Chargement...</h2></div>;
  }
  
  if (!loggedIn) {
    console.log("Utilisateur non connecté, redirection vers login");
    return (<Navigate to="/login" replace />);
  } 
  return (
    <div className="stats">
      <header className="stats-header">
        <img src="/ressources/Logo.png" alt="Logo" className="logo" />
        <h1>Statistiques du chantier</h1>
        <div className="stats-recap">
          {/* Ces valeurs restent fixes (1 semaine) grâce à useRef */}
          <h2>Nombre de votes sur la dernière semaine : {totalVotesLastWeek.current}</h2>
          <h2>Nombre de risques signalés sur la dernière semaine : {totalRisksLastWeek.current}</h2>
        </div>
      </header>
      
      {/* Boutons de sélection de période pour les diagrammes */}
      <div className="period-selector">
        <button 
          className={`period-btn ${dateRange === 'week' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('week')}
        >
          7 derniers jours
        </button>
        <button 
          className={`period-btn ${dateRange === '2weeks' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('2weeks')}
        >
          14 derniers jours
        </button>
        <button 
          className={`period-btn ${dateRange === 'month' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('month')}
        >
          30 derniers jours
        </button>
      </div>
      
      <div className="stats-content">
        <section className="chart-section">
          <div className="chart-container">            
            {/* Diagramme donut - Humeurs */}
            <div className="chart-wrapper">
              <h3>Répartition des humeurs ({dateRange === 'week' ? '7j' : dateRange === '2weeks' ? '14j' : '30j'})</h3>
              <DonutChart 
                data={donutChartData}
                size={chartOptions.size}
                thickness={chartOptions.thickness}
                showLabels={chartOptions.showLabels}
                showCenterText={chartOptions.showCenterText}
              />
            </div>
            
            {/* Diagramme en barres - Risques */}
            <div className="mini-chart">
              <h4>Répartition des risques signalés ({dateRange === 'week' ? '7j' : dateRange === '2weeks' ? '14j' : '30j'})</h4>
              <div className="bar-chart-with-axis">
                {(() => {
                  const { max: scaleMax, ticks } = calculateAdaptiveScale(barChartData); 
                  return (
                    <>
                      <div className="y-axis">
                        <div className="y-ticks">
                          {ticks.map((tick, index) => (
                          <div 
                          key={`tick-${index}-${tick}`}  // Utilisez l'index ET la valeur pour garantir l'unicité
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
                          {barChartData.map((item, index) => {
                            const percentage = (item.value / scaleMax) * 100;
                            const barHeight = (percentage / 100) * 180;
                            return (
                              <div key={`bar-${index}`} className="bar-container">
                                <div 
                                  className="bar" 
                                  style={{ 
                                    height: `${barHeight}px`,
                                    backgroundColor: item.color
                                  }}
                                />
                                <div className="bar-label">{item.label} : {item.value}</div>
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
        
        <button className="bouton-retour" onClick={() => { navigate('/admin'); }}>
          Retour à la page Admin
        </button>
      </div>
    </div>
  );
}
