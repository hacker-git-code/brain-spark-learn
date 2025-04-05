
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
        {/* Circular brain outline */}
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={200}
          ry={170}
          fill="url(#brainGradient)"
          stroke="#dee2e6"
          strokeWidth="2"
          className="opacity-70"
        />
        
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
          <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
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
