import React, { useRef, useEffect } from 'react';

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
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const updateBrushStyle = () => {
      if (!ctx) return;
      
      if (isErasing) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 20;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
      }
    };

    const drawSmoothLine = (points: { x: number; y: number }[]) => {
      if (!ctx || points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      if (points.length > 2) {
        const last = points.length - 1;
        ctx.quadraticCurveTo(
          points[last - 1].x,
          points[last - 1].y,
          points[last].x,
          points[last].y
        );
      }
      
      ctx.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!isDrawing && !isErasing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      isDrawingRef.current = true;
      points.current = [{ x, y }];
      lastPosRef.current = { x, y };
      
      updateBrushStyle();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current || (!isDrawing && !isErasing)) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      points.current.push({ x, y });
      if (points.current.length > 3) {
        drawSmoothLine(points.current);
        points.current = points.current.slice(-2);
      }
      
      lastPosRef.current = { x, y };
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
      points.current = [];
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    updateBrushStyle();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDrawing, isErasing, strokeColor, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-auto z-10"
      style={{ 
        opacity: 1,
        cursor: isDrawing ? 'crosshair' : isErasing ? 'not-allowed' : 'default',
        pointerEvents: isDrawing || isErasing ? 'auto' : 'none'
      }}
    />
  );
};

export default DrawingCanvas;