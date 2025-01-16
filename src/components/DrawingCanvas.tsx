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

    // Set canvas dimensions to match display dimensions
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    contextRef.current = ctx;

    // Redraw all paths
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

  const getCoordinates = (e: MouseEvent | Touch): { x: number, y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleStart = (e: MouseEvent | Touch) => {
    if (!isDrawing) return;
    
    isDrawingRef.current = true;
    const coords = getCoordinates(e);
    lastPosRef.current = coords;
    updateBrushStyle();
  };

  const handleMove = (e: MouseEvent | Touch) => {
    if (!isDrawingRef.current || !contextRef.current || !isDrawing) return;

    const coords = getCoordinates(e);
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

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isErasing) return;

    const coords = getCoordinates(e);
    const ctx = contextRef.current;
    if (!ctx) return;

    // Filter out paths that were clicked
    const remainingPaths = paths.filter(path => {
      ctx.save();
      ctx.lineWidth = strokeWidth + 10; // Increase hit area
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
      const touch = e.touches[0];
      handleStart(touch);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const touch = e.touches[0];
      handleMove(touch);
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