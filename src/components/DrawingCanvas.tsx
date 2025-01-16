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
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [paths, setPaths] = useState<Path2D[]>([]);
  const currentPath = useRef<Path2D | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.lineJoin = 'round';
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

  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

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

  const handleErase = (event: MouseEvent) => {
    const coords = getCoordinates(event);
    if (!coords || !contextRef.current) return;

    const remainingPaths = paths.filter(path => {
      contextRef.current!.save();
      contextRef.current!.lineWidth += 20; // Increased hit area for easier erasing
      const isPointInStroke = contextRef.current!.isPointInStroke(path, coords.x, coords.y);
      contextRef.current!.restore();
      return !isPointInStroke;
    });

    if (remainingPaths.length !== paths.length) {
      setPaths(remainingPaths);
      redrawCanvas();
    }
  };

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (!isDrawing || isErasing) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawingActive(true);
    currentPath.current = new Path2D();
    currentPath.current.moveTo(coords.x, coords.y);
    lastPoint.current = coords;
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    
    if (isErasing && event instanceof MouseEvent) {
      handleErase(event);
      return;
    }

    if (!isDrawingActive || !isDrawing || !contextRef.current || !currentPath.current || !lastPoint.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    currentPath.current.lineTo(coords.x, coords.y);
    contextRef.current.beginPath();
    contextRef.current.stroke(currentPath.current);
    lastPoint.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawingActive && currentPath.current) {
      setPaths(prev => [...prev, currentPath.current!]);
    }
    setIsDrawingActive(false);
    currentPath.current = null;
    lastPoint.current = null;
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

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, isErasing, isDrawingActive]);

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