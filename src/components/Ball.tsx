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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  React.useEffect(() => {
    if (isDragging.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
      window.addEventListener('touchcancel', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
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
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onContextMenu={(e) => e.preventDefault()}
      aria-label="Water polo ball"
    />
  );
};

export default Ball;