
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
      
      {/* Node shape - more abstract and neuron-like */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(id)}
      >
        {/* Main cell body - more abstract shape */}
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
        
        {/* Abstract internal pattern */}
        <circle
          cx={x}
          cy={y}
          r={size/2 * 0.6}
          fill="url(#nodeGradient)"
          className="pointer-events-none opacity-60"
        />
        
        <circle
          cx={x - size/6}
          cy={y - size/6}
          r={size/6}
          fill="#ffffff"
          fillOpacity={0.4}
          className="pointer-events-none"
        />
        
        {/* Dendrites - abstract extensions */}
        {isHovered && (
          <>
            {/* Create multiple dendrites in different directions */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const radians = angle * Math.PI / 180;
              const startX = x + (size/2 - 2) * Math.cos(radians);
              const startY = y + (size/2 - 2) * Math.sin(radians);
              const endX = x + (size * 1.2) * Math.cos(radians);
              const endY = y + (size * 1.2) * Math.sin(radians);
              const controlX = x + (size * 0.9) * Math.cos(radians) + (Math.random() * 20 - 10);
              const controlY = y + (size * 0.9) * Math.sin(radians) + (Math.random() * 20 - 10);
              
              return (
                <path
                  key={`dendrite-${i}`}
                  d={`M${startX} ${startY} Q${controlX} ${controlY}, ${endX} ${endY}`}
                  stroke={color}
                  strokeWidth="1"
                  strokeOpacity={0.5}
                  fill="none"
                  className="opacity-70"
                />
              );
            })}
            
            {/* Add small nodes at dendrite ends for synapse effect */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const radians = angle * Math.PI / 180;
              const endX = x + (size * 1.2) * Math.cos(radians);
              const endY = y + (size * 1.2) * Math.sin(radians);
              
              return (
                <circle
                  key={`synapse-${i}`}
                  cx={endX}
                  cy={endY}
                  r={1 + Math.random() * 2}
                  fill={color}
                  fillOpacity={0.8}
                  className="animate-pulse-gentle"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              );
            })}
          </>
        )}
        
        {/* Small pulsing effect for nodes even when not hovered */}
        <circle
          cx={x}
          cy={y}
          r={isHovered ? 0 : size/2 * 1.1}
          fill="transparent"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.3"
          className="animate-pulse-gentle pointer-events-none"
        />
        
        {/* Define the gradient for the node */}
        <defs>
          <radialGradient id={`nodeGradient-${id}`} cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </g>
    </>
  );
};

export default BrainNode;
