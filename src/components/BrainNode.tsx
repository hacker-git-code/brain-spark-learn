
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BrainNodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  size?: number;
  onClick: (id: string) => void;
}

const BrainNode: React.FC<BrainNodeProps> = ({
  id,
  name,
  x,
  y,
  color,
  size = 60,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      {/* Node label */}
      <g 
        className={cn(
          "transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <text
          x={x}
          y={y - size/2 - 10}
          textAnchor="middle"
          className="text-sm font-semibold fill-current"
        >
          {name}
        </text>
      </g>
      
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={isHovered ? size/2 * 1.15 : size/2}
        className={cn(
          "cursor-pointer transition-all duration-300 ease-out",
          isHovered ? "animate-pulse-gentle" : ""
        )}
        fill={color}
        fillOpacity={isHovered ? 0.9 : 0.7}
        stroke={color}
        strokeWidth={isHovered ? 3 : 1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(id)}
      />
      
      {/* Interior details to give brain-like appearance */}
      <circle
        cx={x}
        cy={y}
        r={size/2 * 0.7}
        fill={color}
        fillOpacity={0.3}
        className="pointer-events-none"
      />
      <circle
        cx={x - size/6}
        cy={y - size/6}
        r={size/6}
        fill="#ffffff"
        fillOpacity={0.3}
        className="pointer-events-none"
      />
    </>
  );
};

export default BrainNode;
