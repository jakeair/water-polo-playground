import { useState } from 'react';

export interface DrawingState {
  isDrawing: boolean;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
}

export const useDrawingState = (initialState?: Partial<DrawingState>) => {
  const [isDrawing, setIsDrawing] = useState(initialState?.isDrawing ?? false);
  const [strokeColor, setStrokeColor] = useState(initialState?.strokeColor ?? '#000000');
  const [strokeWidth, setStrokeWidth] = useState(initialState?.strokeWidth ?? 2);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'dottedLine' | 'eraser'>(
    initialState?.drawingTool ?? 'pen'
  );

  return {
    isDrawing,
    strokeColor,
    strokeWidth,
    drawingTool,
    setIsDrawing,
    setStrokeColor,
    setStrokeWidth,
    setDrawingTool,
  };
};