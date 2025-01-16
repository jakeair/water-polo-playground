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

  const handleStart = (clientX: number, clientY: number) => {
    if (playerRef.current) {
      setIsDragging(true);
      dragStartPos.current = {
        x: clientX,
        y: clientY
      };
      initialPlayerPos.current = {
        x: position.x,
        y: position.y
      };
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging && playerRef.current) {
      const courtRect = playerRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        requestAnimationFrame(() => {
          const deltaX = (clientX - dragStartPos.current.x) / courtRect.width * 100;
          const deltaY = (clientY - dragStartPos.current.y) / courtRect.height * 100;
          
          let newX = initialPlayerPos.current.x + deltaX;
          let newY = initialPlayerPos.current.y + deltaY;

          if (isGoalie) {
            const goalWidth = 23;
            const goalHeight = 6;
            const halfGoalWidth = goalWidth / 2;
            
            if (team === 1) {
              if (newY < -goalHeight) newY = -goalHeight;
              if (newY > goalHeight) newY = goalHeight;
              newX = Math.max(50 - halfGoalWidth, Math.min(50 + halfGoalWidth, newX));
            } else {
              if (newY < (100 - goalHeight)) newY = 100 - goalHeight;
              if (newY > (100 + goalHeight)) newY = 100 + goalHeight;
              newX = Math.max(50 - halfGoalWidth, Math.min(50 + halfGoalWidth, newX));
            }
          } else {
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
          }
          
          setPosition({ x: newX, y: newY });
        });
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
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
      onTouchStart={handleTouchStart}
    >
      {number}
    </div>
  );
};

export default Player;