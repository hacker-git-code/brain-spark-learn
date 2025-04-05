
import React, { useState } from 'react';
import BrainNode from './BrainNode';
import { cn } from '@/lib/utils';

interface Subject {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const subjects: Subject[] = [
  { id: 'math', name: 'Mathematics', x: 100, y: 150, color: '#4361ee' },
  { id: 'science', name: 'Science', x: 250, y: 100, color: '#3a0ca3' },
  { id: 'language', name: 'Language', x: 400, y: 150, color: '#7209b7' },
  { id: 'history', name: 'History', x: 100, y: 300, color: '#f72585' },
  { id: 'arts', name: 'Arts', x: 250, y: 350, color: '#4cc9f0' },
  { id: 'technology', name: 'Technology', x: 400, y: 300, color: '#4d908e' },
];

interface BrainMapProps {
  onNodeClick: (subjectId: string) => void;
}

const BrainMap: React.FC<BrainMapProps> = ({ onNodeClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const width = 500;
  const height = 450;
  
  // Generate connections between nodes
  const connections = subjects.flatMap((subject, index) => 
    subjects.slice(index + 1).map(otherSubject => ({
      x1: subject.x,
      y1: subject.y,
      x2: otherSubject.x,
      y2: otherSubject.y,
      id: `${subject.id}-${otherSubject.id}`
    }))
  );

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto transform transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${width} ${height}`}
        className={cn(
          "transition-transform duration-500 ease-out",
          isHovered ? "scale-105" : "scale-100"
        )}
      >
        {/* Enhanced brain structure with more internal details */}
        <g className="brain-structure">
          {/* Background brain shape */}
          <path
            d="M250,60 C350,60 420,120 440,200 C460,280 420,360 370,400 C320,440 280,450 250,450 C220,450 180,440 130,400 C80,360 40,280 60,200 C80,120 150,60 250,60Z"
            fill="url(#brainGradient)"
            stroke="#dee2e6"
            strokeWidth="1.5"
            className="opacity-60"
          />
          
          {/* Left hemisphere detailed structure */}
          <path
            d="M250,80 C180,80 120,120 100,180 C80,240 90,300 120,350 C150,400 200,420 250,420"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1.5"
            className="opacity-50"
          />
          
          {/* Right hemisphere detailed structure */}
          <path
            d="M250,80 C320,80 380,120 400,180 C420,240 410,300 380,350 C350,400 300,420 250,420"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1.5"
            className="opacity-50"
          />
          
          {/* Corpus callosum (connecting the hemispheres) */}
          <path
            d="M250,100 C270,90 280,90 300,100 C280,110 270,110 250,100Z"
            fill="#e9ecef"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-40"
          />
          
          {/* Brain internal structures - gyri and sulci patterns */}
          <path
            d="M120,180 C140,170 160,190 180,180 C200,170 220,190 240,180"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          <path
            d="M260,180 C280,170 300,190 320,180 C340,170 360,190 380,180"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          <path
            d="M120,250 C140,240 160,260 180,250 C200,240 220,260 240,250"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          <path
            d="M260,250 C280,240 300,260 320,250 C340,240 360,260 380,250"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          <path
            d="M120,320 C140,310 160,330 180,320 C200,310 220,330 240,320"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          <path
            d="M260,320 C280,310 300,330 320,320 C340,310 360,330 380,320"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-60"
          />
          
          {/* Additional brain internal structures */}
          <path
            d="M150,150 C170,130 200,150 220,130 C240,110 260,130 280,110"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M280,110 C300,90 320,110 340,90 C360,70 380,90 400,70"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M150,350 C170,370 200,350 220,370 C240,390 260,370 280,390"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M280,390 C300,410 320,390 340,410 C360,430 380,410 400,430"
            fill="none"
            stroke="#e9ecef"
            strokeWidth="1"
            className="opacity-50"
          />
          
          {/* Brain cortex textures - abstract patterns */}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`left-texture-${i}`}
              d={`M${120 + i * 15},${150 + i * 20} C${140 + i * 10},${130 + i * 20} ${160 + i * 10},${170 + i * 15} ${180 + i * 5},${150 + i * 20}`}
              fill="none"
              stroke="#e9ecef"
              strokeWidth="0.7"
              strokeOpacity={0.3 + i * 0.05}
              className="opacity-30"
            />
          ))}
          
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`right-texture-${i}`}
              d={`M${320 - i * 15},${150 + i * 20} C${340 - i * 10},${130 + i * 20} ${360 - i * 10},${170 + i * 15} ${380 - i * 5},${150 + i * 20}`}
              fill="none"
              stroke="#e9ecef"
              strokeWidth="0.7"
              strokeOpacity={0.3 + i * 0.05}
              className="opacity-30"
            />
          ))}
          
          {/* Abstract neural network patterns */}
          <g className="neural-network">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={`neuron-${i}`}
                cx={100 + Math.random() * 300}
                cy={100 + Math.random() * 250}
                r={1 + Math.random() * 2}
                fill="#ffffff"
                fillOpacity={0.4 + Math.random() * 0.4}
                className="animate-pulse-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </g>
        </g>
        
        {/* Enhanced neural connections with pulsing effect */}
        {connections.map((conn) => (
          <line
            key={conn.id}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeOpacity="0.6"
            className="brain-connection"
          />
        ))}
        
        {/* Additional abstract connection paths */}
        {subjects.map((subject, i) => (
          <path
            key={`abstract-path-${i}`}
            d={`M${subject.x},${subject.y} Q${subject.x + (Math.random() * 40 - 20)},${subject.y + (Math.random() * 40 - 20)} ${250},${225}`}
            stroke={subject.color}
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
            className="neural-paths"
          />
        ))}

        {/* Subject nodes */}
        {subjects.map((subject) => (
          <BrainNode
            key={subject.id}
            id={subject.id}
            name={subject.name}
            x={subject.x}
            y={subject.y}
            color={subject.color}
            onClick={onNodeClick}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="brainGradient" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#e9ecef" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#dee2e6" stopOpacity="0.3" />
          </radialGradient>
          
          <radialGradient id="leftHemisphereGradient" cx="30%" cy="50%" r="70%" fx="30%" fy="50%">
            <stop offset="0%" stopColor="#f8f9fa" />
            <stop offset="70%" stopColor="#e9ecef" />
            <stop offset="100%" stopColor="#dee2e6" />
          </radialGradient>
          
          <radialGradient id="rightHemisphereGradient" cx="70%" cy="50%" r="70%" fx="70%" fy="50%">
            <stop offset="0%" stopColor="#f8f9fa" />
            <stop offset="70%" stopColor="#e9ecef" />
            <stop offset="100%" stopColor="#dee2e6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BrainMap;
