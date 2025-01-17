import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isDrawing,
  strokeColor,
  strokeWidth,
  drawingTool,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastDrawRef = useRef<ImageData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasStateRef = useRef<ImageData | null>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return; // Don't proceed if dimensions are invalid

      setDimensions({ width, height });
      
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
      
      setIsCanvasReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateCanvasSize);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updateCanvasSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [strokeColor, strokeWidth]);

  // Save canvas state before any context changes
  useEffect(() => {
    if (!isCanvasReady || !contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    
    try {
      canvasStateRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
      if (drawingTool !== 'eraser') {
        context.strokeStyle = strokeColor;
      }
      context.lineWidth = strokeWidth;
    } catch (error) {
      console.error('Error saving canvas state:', error);
    }
  }, [strokeColor, strokeWidth, drawingTool, isCanvasReady]);

  const drawArrowhead = (context: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    const headLength = 10 + strokeWidth;
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    
    context.beginPath();
    context.moveTo(
      to.x - headLength * Math.cos(angle - Math.PI / 6),
      to.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.lineTo(to.x, to.y);
    context.lineTo(
      to.x - headLength * Math.cos(angle + Math.PI / 6),
      to.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
  };

  const drawDottedLine = (context: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dotSpacing = 5 + strokeWidth;
    context.beginPath();
    context.setLineDash([dotSpacing, dotSpacing]);
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    context.setLineDash([]);
    
    // Draw arrowhead
    drawArrowhead(context, from, to);
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
    if (!isDrawing || !contextRef.current || !isCanvasReady) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawingActive(true);
    startPointRef.current = coords;

    if (drawingTool === 'dottedLine' && contextRef.current && canvasRef.current) {
      try {
        lastDrawRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      } catch (error) {
        console.error('Error saving last draw state:', error);
      }
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(coords.x, coords.y);
      
      if (drawingTool === 'eraser') {
        contextRef.current.globalCompositeOperation = 'destination-out';
      } else {
        contextRef.current.globalCompositeOperation = 'source-over';
      }
    }
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (!isDrawingActive || !contextRef.current || !startPointRef.current) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    if (drawingTool === 'dottedLine') {
      if (lastDrawRef.current) {
        contextRef.current.putImageData(lastDrawRef.current, 0, 0);
        drawDottedLine(contextRef.current, startPointRef.current, coords);
      }
    } else {
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    }

    // Save the current state after drawing
    if (canvasRef.current) {
      canvasStateRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
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
    
    // Reset composite operation
    if (drawingTool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
    
    // Save the final state after drawing is complete
    if (canvasRef.current) {
      canvasStateRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
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
  }, [isDrawing, isDrawingActive, drawingTool, isCanvasReady]);

  const getCursorStyle = () => {
    if (!isDrawing) return 'default';
    
    if (drawingTool === 'eraser') {
      const size = strokeWidth;
      const cursor = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" fill="rgba(255, 255, 255, 0.3)" stroke="white"/>
        </svg>
      `;
      return `url('data:image/svg+xml;base64,${btoa(cursor)}') ${size/2} ${size/2}, auto`;
    }
    
    return 'crosshair';
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          cursor: getCursorStyle(),
          pointerEvents: isDrawing ? 'auto' : 'none'
        }}
      />
    </div>
  );
};

export default DrawingCanvas;
