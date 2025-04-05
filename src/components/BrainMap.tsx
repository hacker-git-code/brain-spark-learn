
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
        {/* Brain structure instead of circular outline */}
        <g className="brain-structure">
          {/* Left hemisphere */}
          <path
            d="M250,80 C180,80 120,120 100,180 C80,240 90,300 120,350 C150,400 200,420 250,420"
            fill="url(#leftHemisphereGradient)"
            stroke="#dee2e6"
            strokeWidth="2"
            className="opacity-70"
          />
          
          {/* Right hemisphere */}
          <path
            d="M250,80 C320,80 380,120 400,180 C420,240 410,300 380,350 C350,400 300,420 250,420"
            fill="url(#rightHemisphereGradient)"
            stroke="#dee2e6"
            strokeWidth="2"
            className="opacity-70"
          />
          
          {/* Corpus callosum (connecting the hemispheres) */}
          <path
            d="M250,100 C270,90 280,90 300,100 C280,110 270,110 250,100"
            fill="#e9ecef"
            className="opacity-50"
          />
          
          {/* Brain stem */}
          <path
            d="M235,420 C240,440 260,440 265,420"
            fill="#dee2e6"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-70"
          />

          {/* Brain folds and details */}
          <path
            d="M120,180 C140,170 160,190 180,180 C200,170 220,190 240,180"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M260,180 C280,170 300,190 320,180 C340,170 360,190 380,180"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M120,250 C140,240 160,260 180,250 C200,240 220,260 240,250"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M260,250 C280,240 300,260 320,250 C340,240 360,260 380,250"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M120,320 C140,310 160,330 180,320 C200,310 220,330 240,320"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
          
          <path
            d="M260,320 C280,310 300,330 320,320 C340,310 360,330 380,320"
            fill="none"
            stroke="#dee2e6"
            strokeWidth="1"
            className="opacity-50"
          />
        </g>
        
        {/* Neural network connections */}
        {connections.map((conn) => (
          <line
            key={conn.id}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeOpacity="0.5"
            className="brain-connection"
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
