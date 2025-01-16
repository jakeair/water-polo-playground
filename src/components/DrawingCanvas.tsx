import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  isErasing: boolean;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ 
  isDrawing, 
  isErasing, 
  width, 
  height,
  strokeColor,
  strokeWidth 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [paths, setPaths] = useState<Path2D[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    contextRef.current = ctx;

    redrawCanvas();
  }, [width, height]);

  const redrawCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    paths.forEach(path => {
      ctx.stroke(path);
    });
  };

  const updateBrushStyle = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  };

  const getCoordinates = (event: React.MouseEvent | TouchEvent | MouseEvent): { x: number, y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (event instanceof TouchEvent) {
      const touch = event.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    }

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const handleStart = (event: React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!isDrawing) return;
    
    isDrawingRef.current = true;
    const coords = getCoordinates(event);
    lastPosRef.current = coords;
    updateBrushStyle();
  };

  const handleMove = (event: React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!isDrawingRef.current || !contextRef.current || !isDrawing) return;

    const coords = getCoordinates(event);
    const path = new Path2D();
    path.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    path.lineTo(coords.x, coords.y);
    
    contextRef.current.stroke(path);
    setPaths(prevPaths => [...prevPaths, path]);

    lastPosRef.current = coords;
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
  };

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!isErasing) return;

    const coords = getCoordinates(event);
    const ctx = contextRef.current;
    if (!ctx) return;

    const remainingPaths = paths.filter(path => {
      ctx.save();
      ctx.lineWidth = strokeWidth + 10;
      const isClicked = ctx.isPointInStroke(path, coords.x, coords.y);
      ctx.restore();
      return !isClicked;
    });

    setPaths(remainingPaths);
    redrawCanvas();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => handleStart(e);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      handleMove(e);
    };
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      handleMove(e);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDrawing, strokeColor, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-auto z-10"
      style={{ 
        width: '100%',
        height: '100%',
        cursor: isDrawing ? 'crosshair' : isErasing ? 'not-allowed' : 'default',
        touchAction: 'none'
      }}
      onClick={handleCanvasClick}
    />
  );
};

export default DrawingCanvas;