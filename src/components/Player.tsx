import React, { useState, useRef } from 'react';

interface PlayerProps {
  team: 1 | 2;
  number: number | "G";
  initialX: number;
  initialY: number;
  isGoalie?: boolean;
}

const Player: React.FC<PlayerProps> = ({ team, number, initialX, initialY, isGoalie = false }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const playerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPlayerPos = useRef({ x: 0, y: 0 });

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
          
          const newX = Math.max(0, Math.min(100, initialPlayerPos.current.x + deltaX));
          const newY = Math.max(0, Math.min(100, initialPlayerPos.current.y + deltaY));
          
          setPosition({ x: newX, y: newY });
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
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
      ref={playerRef}
      className={`player ${isGoalie ? 'goalie' : team === 1 ? 'team1' : 'team2'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        position: 'absolute',
      }}
      onMouseDown={handleMouseDown}
    >
      {number}
    </div>
  );
};

export default Player;