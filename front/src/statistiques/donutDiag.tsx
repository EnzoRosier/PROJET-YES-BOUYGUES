// components/DonutChart.tsx
import React from 'react';

interface DonutChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  size?: number;
  thickness?: number; // Épaisseur de l'anneau (en pixels)
  showLabels?: boolean;
  showCenterText?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 300,
  thickness = 60,
  showLabels = true,
  showCenterText = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - thickness; // Rayon intérieur pour créer le trou
  
  let cumulativePercentage = 0;
  
  const segments = data.map((item) => {
    const percentage = item.value / total;
    const startAngle = cumulativePercentage * 2 * Math.PI;
    const endAngle = (cumulativePercentage + percentage) * 2 * Math.PI;
    
    cumulativePercentage += percentage;
    
    // Calcul des points pour l'arc SVG (pour un anneau)
    const startXOuter = center + outerRadius * Math.cos(startAngle - Math.PI / 2);
    const startYOuter = center + outerRadius * Math.sin(startAngle - Math.PI / 2);
    const endXOuter = center + outerRadius * Math.cos(endAngle - Math.PI / 2);
    const endYOuter = center + outerRadius * Math.sin(endAngle - Math.PI / 2);
    
    const startXInner = center + innerRadius * Math.cos(startAngle - Math.PI / 2);
    const startYInner = center + innerRadius * Math.sin(startAngle - Math.PI / 2);
    const endXInner = center + innerRadius * Math.cos(endAngle - Math.PI / 2);
    const endYInner = center + innerRadius * Math.sin(endAngle - Math.PI / 2);
    
    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    
    // Création du chemin pour l'anneau
    const pathData = [
      `M ${startXOuter} ${startYOuter}`, // Début sur le cercle extérieur
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`, // Arc extérieur
      `L ${endXInner} ${endYInner}`, // Ligne vers l'intérieur
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`, // Arc intérieur (sens inverse)
      'Z' // Fermer le chemin
    ].join(' ');
    
    // Position pour les labels
    const labelAngle = cumulativePercentage - percentage / 2;
    const labelRadius = (innerRadius + outerRadius) / 2; // Milieu de l'anneau
    const labelX = center + labelRadius * Math.cos(labelAngle * 2 * Math.PI - Math.PI / 2);
    const labelY = center + labelRadius * Math.sin(labelAngle * 2 * Math.PI - Math.PI / 2);
    
    return {
      pathData,
      percentage: (percentage * 100).toFixed(1),
      labelX,
      labelY,
      label: item.label,
      color: item.color,
      value: item.value
    };
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width={size} height={size}>
        {/* Dessiner tous les segments */}
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.pathData}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              style={{ 
                cursor: 'pointer', 
                transition: 'opacity 0.3s, filter 0.3s',
                filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.filter = 'drop-shadow(0 3px 5px rgba(0,0,0,0.2))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))';
              }}
            />
            
            {/* Labels sur les segments */}
            {showLabels && segment.percentage !== '0.0' && parseFloat(segment.percentage) > 5 && (
              <g>
                <text
                  x={segment.labelX}
                  y={segment.labelY - 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#333"
                  fontSize="14"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {segment.label}
                </text>
                <text
                  x={segment.labelX}
                  y={segment.labelY + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#666"
                  fontSize="12"
                  style={{ pointerEvents: 'none' }}
                >
                  {segment.percentage}%
                </text>
              </g>
            )}
          </g>
        ))}
        
        {/* Cercle blanc au centre */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="white"
          stroke="#e0e0e0"
          strokeWidth="1"
        />
        
        {/* Texte au centre */}
        {showCenterText && (
          <g>
            <text
              x={center}
              y={center + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#666"
              fontSize="12"
            >
              Titre du diagramme
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default DonutChart;