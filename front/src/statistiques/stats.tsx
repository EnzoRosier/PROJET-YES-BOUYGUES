import './stats.css';
import DonutChart from './donutDiag';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, use } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Stats() {
  const location = useLocation();
  // @ts-ignore (Si idChantier pose problème de type, sinon laissez tel quel)
  const idChantier = location.state?.idChantier || null;
  const navigate = useNavigate();
  const ip = window.location.hostname;
  
  // CORRECTION 1 : Typage précis de la référence (HTMLDivElement)
  const statsRef = useRef<HTMLDivElement>(null);
  
  // CORRECTION 2 : Typage du state (peut être null OU boolean)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  
  const [donutChartData, setDonutChartData] = useState([
    { label: 'Satisfait', value: 0, color: '#34A853' },
    { label: 'Neutre', value: 0, color: '#FBBC05' },
    { label: 'Insatisfait', value: 0, color: '#EA4335' }
  ]);
  
  const [barChartData, setBarChartData] = useState([
    { label: 'Levage', value: 0, color: '#FF6B6B' },
    { label: 'Cohésion', value: 0, color: '#4ECDC4' },
    { label: 'Environnement', value: 0, color: '#45B7D1' },
    { label: 'Equipement', value: 0, color: '#96CEB4' },
    { label: 'Hauteur', value: 0, color: '#FFD93D' },
    { label: 'Stabilité', value: 0, color: '#FF6F91' },
    { label: 'Ambiance', value: 0, color: '#6A4C93' },
    { label: 'Energie', value: 0, color: '#1982C4' },
    { label: 'Autre', value: 0, color: '#8ACB88' }
  ]);

  const [chartOptions, setChartOptions] = useState({
    size: 300,
    thickness: 50,
    showLabels: true,
    showCenterText: true
  });
  
  const [dateRange, setDateRange] = useState<string>('week');
  
  const totalVotesLastWeek = useRef(0);
  const totalRisksLastWeek = useRef(0);
  const worksiteName = useRef<string>('');
  
  const handleExportPDF = async () => {
    const input = statsRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        ignoreElements: (element) => {
          return element.classList.contains('bouton-export-stats') || 
                 element.classList.contains('bouton-retour-stats') ||
                 element.classList.contains('period-selector');
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`statistiques-chantier-${formatDateYYYYMMDD(new Date())}.pdf`);
      
    } catch (error) {
      console.error("Erreur lors de l'export PDF :", error);
    }
  };

  // CORRECTION 3 : Ajout du type ': Date'
  const formatDateYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // CORRECTION 4 : Ajout du type ': string'
  const calculateStartDate = (range: string) => {
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
  
  const checkLoggedIn = async () => {
    try {
      const response = await fetch(`http://${ip}:3001/admins/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const me = await response.json();
        if(me != null){
          setLoggedIn(true); // Maintenant TypeScript accepte 'true'
        }
      } else {
        setLoggedIn(false); // Et 'false'
      }
    } catch (error) {
      console.log('Erreur lors de la vérification de la connexion');
      setLoggedIn(false);
    }
  };

  const getWorksiteInfos = async () => {
    if (!idChantier) return;
    try {
      const response = await fetch(`http://${ip}:3001/worksite/${idChantier}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const worksite = await response.json();
        console.log("Infos chantier :", worksite);
        worksiteName.current = worksite.nom || '';
      }
    }
    catch (error) {
      console.error("Erreur lors de la récupération des infos chantier :", error);
    }
  };
  // CORRECTION 5 : Valeur par défaut typée
  const getWorksiteStats = async (period: string = 'week') => {
    if (!idChantier) return;
    try {
      const startDate = calculateStartDate(period);
      
      console.log(`Récupération des stats à partir du ${startDate} (${period})`);
      const response = await fetch(
        `http://${ip}:3001/vote/getStatsOf/${idChantier}`, 
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({ date : startDate })
        }
      );
      
      if (response.ok) {
        // Typage générique 'any' pour la réponse API pour éviter les erreurs de structure
        const stats: any = await response.json();
        console.log("Statistiques reçues :", stats);
        
        const bien = stats.questionHumeur?.bien || 0;
        const moyen = stats.questionHumeur?.moyen || 0;
        const mauvais = stats.questionHumeur?.mauvais || 0;
        
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

        const totalCurrentPeriod = bien + moyen + mauvais;
        const totalRisksCurrentPeriod = levage + cohesion + environnement + equipement + hauteur + stabilite + ambiance + energie + autre;
        
        if (period === 'week') {
          totalVotesLastWeek.current = totalCurrentPeriod;
          totalRisksLastWeek.current = totalRisksCurrentPeriod;
        }
        
        setDonutChartData([
          { label: 'Satisfait', value: bien, color: '#34A853' },
          { label: 'Neutre', value: moyen, color: '#FBBC05' },
          { label: 'Insatisfait', value: mauvais, color: '#EA4335' }
        ]);

        setBarChartData([
          { label: 'Levage', value: levage, color: '#FF6B6B' },
          { label: 'Cohésion', value: cohesion, color: '#4ECDC4' },
          { label: 'Environnement', value: environnement, color: '#45B7D1' },
          { label: 'Equipement', value: equipement, color: '#96CEB4' },
          { label: 'Hauteur', value: hauteur, color: '#FFD93D' },
          { label: 'Stabilité', value: stabilite, color: '#FF6F91' },
          { label: 'Ambiance', value: ambiance, color: '#6A4C93' },
          { label: 'Energie', value: energie, color: '#1982C4' },
          { label: 'Autre', value: autre, color: '#8ACB88' }
        ]);   
      } else {
        console.error("Erreur API :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
    }
  };
  
  useEffect(() => {
    checkLoggedIn();
    if (idChantier) {
      console.log("Chargement des stats pour le chantier :", idChantier);
      getWorksiteStats('week');
    }
  }, [idChantier]);
  
  useEffect(() => {
    getWorksiteInfos();
  }, []);
  // CORRECTION 6 : Typage string
  const handlePeriodChange = (period: string) => {
    setDateRange(period);
    getWorksiteStats(period);
  };
  
  // CORRECTION 7 : Typage du tableau de données (any[] pour faire simple)
  const calculateAdaptiveScale = (data: any[]) => {
    // CORRECTION 8 : Typage de l'item dans le map
    const maxValue = Math.max(...data.map((item: any) => item.value));
    const intervals = [1, 2, 5, 10, 20, 25, 50, 100];
    let scaleMax = 100;
    
    for (const interval of intervals) {
      if (maxValue <= interval * 10) {
        scaleMax = Math.ceil(maxValue / interval) * interval;
        break;
      }
    }   
    return { max: scaleMax};
  };
  
  if (loggedIn === null) {
    return <div className="stats"><h2>Chargement...</h2></div>;
  }
  
  if (!loggedIn) {
    console.log("Utilisateur non connecté, redirection vers login");
    return (<Navigate to="/login" replace />);
  } 
  
  return (
    <div className="stats" ref={statsRef}>
      <header className="stats-header">
        <img src="/ressources/Logo.png" alt="Logo" className="logo" />
        <h1>Statistiques du chantier {worksiteName.current}</h1>
        <div className="stats-recap">
          <h2>Nombre de votes sur la dernière semaine : {totalVotesLastWeek.current}</h2>
          <h2>Nombre de risques signalés sur la dernière semaine : {totalRisksLastWeek.current}</h2>
        </div>
      </header>
      
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
            <div className="chart-wrapper">
              <h3>Répartition des humeurs ({dateRange === 'week' ? '7j' : dateRange === '2weeks' ? '14j' : '30j'})</h3>
              <DonutChart 
                data={donutChartData}
                size={chartOptions.size}
                thickness={chartOptions.thickness}
                showLegend={true}
              />
            </div>
            
            <div className="mini-chart">
              <h3>Répartition des risques signalés ({dateRange === 'week' ? '7j' : dateRange === '2weeks' ? '14j' : '30j'})</h3>
              <div className="bar-chart-with-axis">
                {(() => {
                  const { max: scaleMax} = calculateAdaptiveScale(barChartData); 
                  return (
                    <>
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
                                  data-value={item.value}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="bar-chart-legend">
                {barChartData.map((item, index) => (
                  <div key={`legend-${index}`} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="legend-label">{item.label}</span>
                    <span className="legend-value">({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <button className="bouton-retour-stats" onClick={() => { 
            if (location.state?.from === "admin") navigate('/admin');
            else if(location.state?.from === "superadmin") navigate('/super-admin');
            else navigate('/admin');
        }}>
          Retour à la page Admin
        </button>
        
        <button className="bouton-export-stats" onClick={handleExportPDF}>
          Exporter les statistiques en PDF
        </button>
      </div>
    </div>
  );
}