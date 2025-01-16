import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface BallProps {
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
}

const Ball: React.FC<BallProps> = ({ position, onPositionChange }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ballRef.current) {
      isDragging.current = true;
      startPos.current = {
        x: e.clientX,
        y: e.clientY
      };
      initialPos.current = position;
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current && ballRef.current) {
      const courtRect = ballRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        const deltaX = (e.clientX - startPos.current.x) / courtRect.width * 100;
        const deltaY = (e.clientY - startPos.current.y) / courtRect.height * 100;
        
        let newX = initialPos.current.x + deltaX;
        let newY = initialPos.current.y + deltaY;

        newX = Math.max(-5, Math.min(105, newX));
        newY = Math.max(-8, Math.min(108, newY));
        
        onPositionChange({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  React.useEffect(() => {
    if (isDragging.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging.current]);

  React.useEffect(() => {
    if (ballRef.current) {
      gsap.to(ballRef.current, {
        left: `${position.x}%`,
        top: `${position.y}%`,
        duration: 0.1,
        ease: "power2.out",
        overwrite: true
      });
    }
  }, [position]);

  return (
    <div
      ref={ballRef}
      className="ball"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: isDragging.current ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Ball;