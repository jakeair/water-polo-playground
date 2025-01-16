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
  const [paths, setPaths] = useState<Path2D[]>([]);
  const currentPath = useRef<Path2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;
    
    redrawCanvas();
  }, [width, height]);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.lineWidth = strokeWidth;
  }, [strokeWidth]);

  const updateBrushStyle = () => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = strokeColor;
    contextRef.current.lineWidth = strokeWidth;
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
    if (!isDrawing && !isErasing) return;
    
    event.stopPropagation();
    isDrawingRef.current = true;
    const coords = getCoordinates(event);
    currentPath.current = new Path2D();
    currentPath.current.moveTo(coords.x, coords.y);
    updateBrushStyle();
  };

  const handleMove = (event: React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!isDrawingRef.current || !contextRef.current || (!isDrawing && !isErasing)) return;
    
    event.stopPropagation();
    const coords = getCoordinates(event);
    
    if (currentPath.current) {
      currentPath.current.lineTo(coords.x, coords.y);
      redrawCanvas();
      contextRef.current.stroke(currentPath.current);
    }
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    if (currentPath.current) {
      setPaths(prev => [...prev, currentPath.current]);
      currentPath.current = null;
    }
  };

  const redrawCanvas = () => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach(path => {
      context.stroke(path);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      handleStart(e);
    };
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e);
    };
    const handleMouseUp = () => {
      handleEnd();
    };
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e);
    };
    const handleTouchEnd = () => {
      handleEnd();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDrawing, isErasing]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        cursor: isErasing ? 'crosshair' : isDrawing ? 'pointer' : 'default',
        pointerEvents: isDrawing || isErasing ? 'auto' : 'none'
      }}
    />
  );
};

export default DrawingCanvas;