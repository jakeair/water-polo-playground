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
  const lastMouseEvent = useRef<MouseEvent | TouchEvent | null>(null);

  // Initialize ResizeObserver to track container dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    };

    // Initial dimensions
    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initialize canvas when dimensions are available
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;

    setIsCanvasReady(true);
  }, [dimensions, strokeColor, strokeWidth]);

  // Update canvas properties when drawing settings change
  useEffect(() => {
    if (!contextRef.current || !isCanvasReady) return;

    if (drawingTool !== 'eraser') {
      contextRef.current.strokeStyle = strokeColor;
    }
    contextRef.current.lineWidth = strokeWidth;
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
    
    drawArrowhead(context, from, to);
  }

  const getCoordinates = (event: MouseEvent | TouchEvent): { x: number, y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas || !isCanvasReady) return null;

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

    if (drawingTool === 'dottedLine' && canvasRef.current) {
      lastDrawRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
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
    if (!isDrawingActive || !contextRef.current || !startPointRef.current || !isCanvasReady) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    if (drawingTool === 'dottedLine' && lastDrawRef.current && canvasRef.current) {
      contextRef.current.putImageData(lastDrawRef.current, 0, 0);
      drawDottedLine(contextRef.current, startPointRef.current, coords);
    } else {
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    }

    lastMouseEvent.current = event;
  };

  const stopDrawing = () => {
    if (!isDrawingActive || !contextRef.current || !startPointRef.current || !isCanvasReady) return;

    if (drawingTool === 'dottedLine' && lastMouseEvent.current) {
      const coords = getCoordinates(lastMouseEvent.current);
      if (coords && lastDrawRef.current) {
        contextRef.current.putImageData(lastDrawRef.current, 0, 0);
        drawDottedLine(contextRef.current, startPointRef.current, coords);
      }
    }
    
    if (drawingTool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
    
    setIsDrawingActive(false);
    startPointRef.current = null;
    lastDrawRef.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isCanvasReady) return;

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
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: '200px' }}
    >
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