
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
  size = 50,
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
      
      {/* Node shape - more neuron-like */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(id)}
      >
        {/* Main cell body */}
        <circle
          cx={x}
          cy={y}
          r={isHovered ? size/2 * 1.15 : size/2}
          className={cn(
            "transition-all duration-300 ease-out",
            isHovered ? "animate-pulse-gentle" : ""
          )}
          fill={color}
          fillOpacity={isHovered ? 0.9 : 0.7}
          stroke={color}
          strokeWidth={isHovered ? 3 : 1}
        />
        
        {/* Dendrites - small extensions */}
        {isHovered && (
          <>
            <path
              d={`M${x-size/2} ${y} Q${x-size/1.5} ${y-size/3}, ${x-size} ${y-size/2}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
            <path
              d={`M${x+size/2} ${y} Q${x+size/1.5} ${y-size/3}, ${x+size} ${y-size/2}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
            <path
              d={`M${x} ${y+size/2} Q${x+size/3} ${y+size/1.5}, ${x+size/2} ${y+size}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
          </>
        )}
        
        {/* Interior details to give neuron-like appearance */}
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
      </g>
    </>
  );
};

export default BrainNode;
