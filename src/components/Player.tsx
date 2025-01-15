import React, { useState, useRef } from 'react';

interface PlayerProps {
  team: 1 | 2;
  number: number | "G";
  initialX: number;  // percentage value (0-100)
  initialY: number;  // percentage value (0-100)
  isGoalie?: boolean;
}

const Player: React.FC<PlayerProps> = ({ team, number, initialX, initialY, isGoalie = false }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const playerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (playerRef.current) {
      setIsDragging(true);
      const rect = playerRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && playerRef.current) {
      const courtRect = playerRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        const newX = ((e.clientX - courtRect.left) / courtRect.width) * 100;
        const newY = ((e.clientY - courtRect.top) / courtRect.height) * 100;
        
        const x = Math.max(0, Math.min(newX, 100));
        const y = Math.max(0, Math.min(newY, 100));
        
        setPosition({ x, y });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
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
      }}
      onMouseDown={handleMouseDown}
    >
      {number}
    </div>
  );
};

export default Player;