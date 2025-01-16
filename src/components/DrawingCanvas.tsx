import React, { useRef, useEffect, useState, forwardRef, ForwardedRef } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
  onUndoAvailable: (available: boolean) => void;
}

interface DrawingCanvasRef {
  undoLastPath: () => void;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({
  isDrawing,
  width,
  height,
  strokeColor,
  strokeWidth,
  onUndoAvailable
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
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

  useEffect(() => {
    onUndoAvailable(paths.length > 0);
  }, [paths, onUndoAvailable]);

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

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!isDrawing) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawingActive(true);
    currentPath.current = new Path2D();
    currentPath.current.moveTo(coords.x, coords.y);
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawingActive || !isDrawing || !contextRef.current || !currentPath.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    currentPath.current.lineTo(coords.x, coords.y);
    contextRef.current.beginPath();
    contextRef.current.stroke(currentPath.current);
  };

  const stopDrawing = () => {
    if (isDrawingActive && currentPath.current) {
      setPaths(prev => {
        const newPaths = [...prev, currentPath.current!];
        // Keep only the last 10 paths
        return newPaths.slice(-10);
      });
    }
    setIsDrawingActive(false);
    currentPath.current = null;
  };

  const undoLastPath = () => {
    setPaths(prev => {
      const newPaths = prev.slice(0, -1);
      redrawCanvas(newPaths);
      return newPaths;
    });
  };

  const redrawCanvas = (pathsToDraw = paths) => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    pathsToDraw.forEach(path => {
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
  }, [isDrawing, isDrawingActive]);

  React.useImperativeHandle(ref, () => ({
    undoLastPath
  }));

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        cursor: isDrawing ? 'pointer' : 'default',
        pointerEvents: isDrawing ? 'auto' : 'none'
      }}
    />
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;
