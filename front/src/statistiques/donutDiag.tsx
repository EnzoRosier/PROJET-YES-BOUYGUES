import React from 'react';

interface DonutChartProps {
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  size?: number;
  thickness?: number;
  showLegend?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 300,
  thickness = 60,
  showLegend = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - thickness;
  
  let cumulativePercentage = 0;
  
  const segments = data.map((item) => {
    const percentage = item.value / total;
    const startAngle = cumulativePercentage * 2 * Math.PI;
    const endAngle = (cumulativePercentage + percentage) * 2 * Math.PI;
    
    cumulativePercentage += percentage;
    
    const startXOuter = center + outerRadius * Math.cos(startAngle - Math.PI / 2);
    const startYOuter = center + outerRadius * Math.sin(startAngle - Math.PI / 2);
    const endXOuter = center + outerRadius * Math.cos(endAngle - Math.PI / 2);
    const endYOuter = center + outerRadius * Math.sin(endAngle - Math.PI / 2);
    
    const startXInner = center + innerRadius * Math.cos(startAngle - Math.PI / 2);
    const startYInner = center + innerRadius * Math.sin(startAngle - Math.PI / 2);
    const endXInner = center + innerRadius * Math.cos(endAngle - Math.PI / 2);
    const endYInner = center + innerRadius * Math.sin(endAngle - Math.PI / 2);
    
    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    
    const pathData = [
      `M ${startXOuter} ${startYOuter}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
      `L ${endXInner} ${endYInner}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
      'Z'
    ].join(' ');
    
    return {
      pathData,
      percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0',
      label: item.label,
      color: item.color,
      value: item.value
    };
  });

  return (
    <div style={{ 
      display: 'inline-flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
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
          </g>
        ))}
        
        {/* Cercle blanc au centre (trou du donut) */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="white"
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      </svg>
      
      {/* Légende en dessous du diagramme */}
      {showLegend && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '15px',
          marginTop: '20px',
          maxWidth: size + 100
        }}>
          {segments.filter(segment => segment.value > 0).map((segment, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '14px',
                color: '#333'
              }}
            >
              <div 
                style={{ 
                  width: '15px', 
                  height: '15px', 
                  backgroundColor: segment.color,
                  borderRadius: '3px',
                  marginRight: '8px'
                }} 
              />
              <span>
                {segment.label}: {segment.value} ({segment.percentage}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonutChart;