import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
  isHalfCourt?: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isDrawing,
  strokeColor,
  strokeWidth,
  drawingTool,
  isHalfCourt = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastDrawRef = useRef<ImageData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const lastMouseEvent = useRef<MouseEvent | TouchEvent | null>(null);
  const persistentCanvasState = useRef<ImageData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDimensions({ 
          width, 
          height: isHalfCourt ? height / 2 : height 
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [isHalfCourt]);

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

    // Restore the persistent canvas state if it exists
    if (persistentCanvasState.current) {
      context.putImageData(persistentCanvasState.current, 0, 0);
    }

    setIsCanvasReady(true);
  }, [dimensions]);

  // Update canvas properties when drawing settings change
  useEffect(() => {
    if (!contextRef.current || !isCanvasReady) return;

    const currentContext = contextRef.current;
    const previousStrokeStyle = currentContext.strokeStyle;
    const previousLineWidth = currentContext.lineWidth;

    if (drawingTool !== 'eraser') {
      currentContext.strokeStyle = strokeColor;
    }
    currentContext.lineWidth = strokeWidth;

    // No need to restore/save here as we're just updating properties
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

    // Save the current state after completing the drawing
    if (canvasRef.current) {
      persistentCanvasState.current = contextRef.current.getImageData(
        0, 0, canvasRef.current.width, canvasRef.current.height
      );
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
      className={`absolute inset-0 w-full ${isHalfCourt ? 'h-1/2' : 'h-full'}`}
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
