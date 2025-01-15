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
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
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

    const getCurvePoints = (points: { x: number; y: number }[]) => {
      const curvePoints = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : points[0];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < points.length - 2 ? points[i + 2] : p2;

        // Catmull-Rom to Cubic Bezier conversion
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        curvePoints.push({
          startPoint: p1,
          cp1: { x: cp1x, y: cp1y },
          cp2: { x: cp2x, y: cp2y },
          endPoint: p2,
        });
      }
      return curvePoints;
    };

    const drawSmoothLine = (points: { x: number; y: number }[]) => {
      if (!ctx || points.length < 2) return;

      const curves = getCurvePoints(points);
      
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      curves.forEach(curve => {
        ctx.bezierCurveTo(
          curve.cp1.x, curve.cp1.y,
          curve.cp2.x, curve.cp2.y,
          curve.endPoint.x, curve.endPoint.y
        );
      });
      
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
      
      // Keep a moving window of points for smooth curve calculation
      if (points.current.length > 8) {
        const tempPoints = [...points.current];
        drawSmoothLine(tempPoints);
        points.current = points.current.slice(-4);
      }
      
      lastPosRef.current = { x, y };
    };

    const handleMouseUp = () => {
      if (points.current.length > 0) {
        drawSmoothLine(points.current);
      }
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
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
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
