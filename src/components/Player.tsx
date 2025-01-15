import React, { useState, useRef, useEffect } from 'react';

interface PlayerProps {
  team: 1 | 2;
  number: number | "G";
  initialX: number;
  initialY: number;
  isGoalie?: boolean;
  onPositionChange?: (position: { x: number; y: number }) => void;
  id: string;
}

const Player: React.FC<PlayerProps> = ({ 
  team, 
  number, 
  initialX, 
  initialY, 
  isGoalie = false,
  onPositionChange,
  id 
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const playerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPlayerPos = useRef({ x: 0, y: 0 });

  // Only notify parent of position changes when dragging ends
  useEffect(() => {
    if (!isDragging && onPositionChange) {
      onPositionChange(position);
    }
  }, [isDragging, position, onPositionChange]);

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
        const deltaX = (e.clientX - dragStartPos.current.x) / courtRect.width * 100;
        const deltaY = (e.clientY - dragStartPos.current.y) / courtRect.height * 100;
        
        const newX = Math.max(0, Math.min(100, initialPlayerPos.current.x + deltaX));
        const newY = Math.max(0, Math.min(100, initialPlayerPos.current.y + deltaY));
        
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
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
      id={id}
      ref={playerRef}
      className={`player ${isGoalie ? 'goalie' : team === 1 ? 'team1' : 'team2'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        position: 'absolute',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
      }}
      onMouseDown={handleMouseDown}
    >
      {number}
    </div>
  );
};

export default Player;