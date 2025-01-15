import React, { useRef, useEffect } from 'react';

interface DrawingCanvasProps {
  isDrawing: boolean;
  isErasing: boolean;
  width: number;
  height: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ isDrawing, isErasing, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial drawing styles
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
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 3;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!isDrawing && !isErasing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      isDrawingRef.current = true;
      lastPosRef.current = { x, y };
      
      // Update brush style before starting to draw
      updateBrushStyle();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current || (!isDrawing && !isErasing)) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      lastPosRef.current = { x, y };
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    // Update brush style whenever drawing/erasing mode changes
    updateBrushStyle();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDrawing, isErasing]);

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