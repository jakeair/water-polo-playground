import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'dottedLine';
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isDrawing,
  width,
  height,
  strokeColor,
  strokeWidth,
  drawingTool,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastDrawRef = useRef<ImageData | null>(null);

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
  }, [width, height]);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.lineWidth = strokeWidth;
  }, [strokeWidth]);

  const drawDottedLine = (context: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    context.beginPath();
    context.setLineDash([5, 5]);
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    context.setLineDash([]);
  }

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
    if (!isDrawing || !contextRef.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawingActive(true);
    startPointRef.current = coords;

    if (drawingTool === 'dottedLine') {
      lastDrawRef.current = contextRef.current.getImageData(0, 0, width, height);
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(coords.x, coords.y);
    }
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (!isDrawingActive || !contextRef.current || !startPointRef.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    if (drawingTool === 'pen') {
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    } else if (lastDrawRef.current) {
      contextRef.current.putImageData(lastDrawRef.current, 0, 0);
      drawDottedLine(contextRef.current, startPointRef.current, coords);
    }
  };

  const stopDrawing = () => {
    if (!isDrawingActive || !contextRef.current || !startPointRef.current) return;

    if (drawingTool === 'dottedLine') {
      const coords = getCoordinates(lastMouseEvent.current as MouseEvent | TouchEvent);
      if (coords && lastDrawRef.current) {
        contextRef.current.putImageData(lastDrawRef.current, 0, 0);
        drawDottedLine(contextRef.current, startPointRef.current, coords);
      }
    }
    
    setIsDrawingActive(false);
    startPointRef.current = null;
    lastDrawRef.current = null;
  };

  const lastMouseEvent = useRef<MouseEvent | TouchEvent | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      lastMouseEvent.current = e;
      draw(e);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, isDrawingActive, drawingTool]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        cursor: isDrawing ? 'crosshair' : 'default',
        pointerEvents: isDrawing ? 'auto' : 'none'
      }}
    />
  );
};

export default DrawingCanvas;