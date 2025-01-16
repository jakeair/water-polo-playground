import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'arrow' | 'dottedArrow';
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

  const drawArrow = (context: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }, isDotted: boolean) => {
    const headLength = 20;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    
    context.beginPath();
    if (isDotted) {
      context.setLineDash([5, 5]);
    } else {
      context.setLineDash([]);
    }
    
    // Draw the line
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    
    // Draw the arrow head
    context.moveTo(to.x, to.y);
    context.lineTo(
      to.x - headLength * Math.cos(angle - Math.PI / 6),
      to.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(to.x, to.y);
    context.lineTo(
      to.x - headLength * Math.cos(angle + Math.PI / 6),
      to.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    
    context.stroke();
    context.setLineDash([]);
  };

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
    
    if (!isDrawing || !contextRef.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawingActive(true);
    startPointRef.current = coords;

    if (drawingTool === 'pen') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(coords.x, coords.y);
    }
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawingActive || !isDrawing || !contextRef.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    if (drawingTool === 'pen') {
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    } else if (startPointRef.current) {
      // Clear the canvas and redraw
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      drawArrow(
        contextRef.current,
        startPointRef.current,
        coords,
        drawingTool === 'dottedArrow'
      );
    }
  };

  const stopDrawing = () => {
    setIsDrawingActive(false);
    startPointRef.current = null;
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
  }, [isDrawing, isDrawingActive, drawingTool]);

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
};

export default DrawingCanvas;