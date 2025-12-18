import './stats.css';
import DonutChart from './donutDiag';
import React, {useEffect, useState} from 'react';

export default function Stats() {
  // Données pour le diagramme
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

  return (
    <div className="stats">
      <header className="stats-header">
        <img src="/ressources/Logo.png" alt="Logo" className="logo" />
        <h1>Tableau de Bord - Statistiques</h1>
        <p className="subtitle">Visualisation des données en temps réel</p>
      </header>

      <div className="stats-content">
        {/* Section principale avec le diagramme */}
        <section className="chart-section">
          <div className="chart-container">
            <h2>Répartition des Éléments</h2>
            <p className="chart-description">
              Diagramme circulaire montrant la distribution des différentes catégories
            </p>
            
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
              <h4>Diagramme en Barres</h4>
              <div className="bar-chart-preview">
                {chartData.map((item, index) => (
                  <div key={index} className="bar-container">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${item.value * 1.5}px`,
                        backgroundColor: item.color
                      }}
                    />
                    <div className="bar-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section de données détaillées */}
        <section className="data-section">
          <div className="summary-card">
            <h3>Résumé des Statistiques</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-value">
                  {chartData.length}
                </div>
                <div className="summary-label">Catégories</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-value">
                  {Math.max(...chartData.map(d => d.value)).toFixed(1)}%
                </div>
                <div className="summary-label">Maximum</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-value">
                  {Math.min(...chartData.map(d => d.value)).toFixed(1)}%
                </div>
                <div className="summary-label">Minimum</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-value">
                  {(
                    chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length
                  ).toFixed(1)}%
                </div>
                <div className="summary-label">Moyenne</div>
              </div>
            </div>
            
            <div className="insights">
              <h4>Informations Clés</h4>
              <ul>
                <li>
                  <strong>{chartData[0].label}</strong> représente la plus grande partie avec {chartData[0].value.toFixed(1)}%
                </li>
                <li>
                  La distribution totale est de {chartData.reduce((sum, item) => sum + item.value, 0).toFixed(1)}%
                </li>
                <li>
                  Écart entre max et min : {(
                    Math.max(...chartData.map(d => d.value)) - 
                    Math.min(...chartData.map(d => d.value))
                  ).toFixed(1)}%
                </li>
              </ul>
            </div>
          </div>
          <div className="chart-controls">
              <button onClick={updateData} className="btn btn-primary">
                Générer Nouvelles Données (Bouton de test pour le changement de nombres)
              </button>
            </div>
        </section>
      </div>
    </div>
  );
}