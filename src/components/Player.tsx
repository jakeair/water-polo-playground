import React, { useState, useRef, useEffect } from 'react';

interface PlayerProps {
  team: 1 | 2;
  number: number | "G";
  initialX: number;
  initialY: number;
  isGoalie?: boolean;
  onPositionChange?: (position: { x: number; y: number }) => void;
  id: string;
  style?: React.CSSProperties;
}

const Player: React.FC<PlayerProps> = ({ 
  team, 
  number, 
  initialX, 
  initialY, 
  isGoalie = false,
  onPositionChange,
  id,
  style
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const playerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPlayerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(position);
    }
  }, [position, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (playerRef.current) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX,
        y: e.clientY
      };
      initialPlayerPos.current = {
        x: position.x,
        y: position.y
      };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && playerRef.current) {
      const courtRect = playerRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        requestAnimationFrame(() => {
          const deltaX = (e.clientX - dragStartPos.current.x) / courtRect.width * 100;
          const deltaY = (e.clientY - dragStartPos.current.y) / courtRect.height * 100;
          
          let newX = initialPlayerPos.current.x + deltaX;
          let newY = initialPlayerPos.current.y + deltaY;

          // Special handling for goalies
          if (isGoalie) {
            const goalWidth = 23; // Width of goal in percentage
            const goalHeight = 6; // Height of goal in percentage
            const halfGoalWidth = goalWidth / 2;
            
            if (team === 1) {
              // Top goalie
              if (newY < -goalHeight) newY = -goalHeight;
              if (newY > goalHeight) newY = goalHeight;
              newX = Math.max(50 - halfGoalWidth, Math.min(50 + halfGoalWidth, newX));
            } else {
              // Bottom goalie
              if (newY < (100 - goalHeight)) newY = 100 - goalHeight;
              if (newY > (100 + goalHeight)) newY = 100 + goalHeight;
              newX = Math.max(50 - halfGoalWidth, Math.min(50 + halfGoalWidth, newX));
            }
          } else {
            // Regular players stay within court bounds
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
          }
          
          setPosition({ x: newX, y: newY });
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      id={id}
      ref={playerRef}
      className={`player team${team}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        zIndex: isDragging ? 100 : isGoalie ? 50 : 1,
        ...style
      }}
      onMouseDown={handleMouseDown}
    >
      {number}
    </div>
  );
};

export default Player;