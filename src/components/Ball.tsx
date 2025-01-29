import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface BallProps {
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  ballStyle?: string;
}

const Ball: React.FC<BallProps> = ({ position, onPositionChange, ballStyle = 'default' }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (ballRef.current) {
      isDragging.current = true;
      startPos.current = {
        x: clientX,
        y: clientY
      };
      initialPos.current = position;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging.current && ballRef.current) {
      const courtRect = ballRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        const deltaX = (clientX - startPos.current.x) / courtRect.width * 100;
        const deltaY = (clientY - startPos.current.y) / courtRect.height * 100;
        
        let newX = initialPos.current.x + deltaX;
        let newY = initialPos.current.y + deltaY;

        newX = Math.max(-5, Math.min(105, newX));
        newY = Math.max(-8, Math.min(108, newY));
        
        onPositionChange({ x: newX, y: newY });
      }
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
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

  React.useEffect(() => {
    if (isDragging.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging.current]);

  const getBallStyle = () => {
    switch (ballStyle) {
      case 'bag':
        return {
          backgroundImage: `url('/lovable-uploads/c652984e-99be-409b-aa53-533b658dcd2b.png')`,
          backgroundSize: 'contain',
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundImage: `url('/lovable-uploads/eb065d48-f6c0-4300-bfa4-de01815e115f.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
    }
  };

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
        ...getBallStyle(),
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    />
  );
};

export default Ball;
