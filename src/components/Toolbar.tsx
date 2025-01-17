import React from 'react';
import ColorPicker from './ColorPicker';
import { Pencil, MinusIcon, Eraser } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

interface ToolbarProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
  isDrawing: boolean;
  onDrawingChange: (isDrawing: boolean) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
  onDrawingToolChange: (tool: 'pen' | 'dottedLine' | 'eraser') => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange,
  isDrawing,
  onDrawingChange,
  strokeColor,
  onStrokeColorChange,
  strokeWidth,
  onStrokeWidthChange,
  drawingTool,
  onDrawingToolChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-[#1A1F2C]/95 backdrop-blur-md p-3 rounded-xl shadow-md">
      {/* Team Colors */}
      <div className="flex flex-row sm:flex-col items-center gap-3">
        <ColorPicker
          color={team1Color}
          onChange={onTeam1ColorChange}
          label="Team 1"
        />
        <ColorPicker
          color={team2Color}
          onChange={onTeam2ColorChange}
          label="Team 2"
        />
      </div>

      <Separator orientation="vertical" className="hidden sm:block h-auto bg-white/10" />
      <Separator orientation="horizontal" className="block sm:hidden w-auto bg-white/10" />

      {/* Drawing Tools - Horizontal Layout on Small Screens */}
      <div className="flex flex-row sm:flex-col items-center gap-4 flex-1">
        {/* Pen Tool */}
        <div className="flex flex-col items-center gap-2">
          <Toggle 
            pressed={isDrawing && drawingTool === 'pen'} 
            onPressedChange={(pressed) => {
              onDrawingChange(pressed);
              if (pressed) onDrawingToolChange('pen');
            }}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary"
            aria-label="Pen tool"
          >
            <Pencil className={`w-4 h-4 ${isDrawing && drawingTool === 'pen' ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          {isDrawing && drawingTool === 'pen' && (
            <div className="flex flex-row sm:flex-col items-center gap-2">
              <ColorPicker
                color={strokeColor}
                onChange={onStrokeColorChange}
                label="Pen Color"
              />
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-24 sm:w-full"
                aria-label="Stroke width"
              />
            </div>
          )}
        </div>

        {/* Dotted Line Tool */}
        <div className="flex flex-col items-center gap-2">
          <Toggle 
            pressed={isDrawing && drawingTool === 'dottedLine'} 
            onPressedChange={(pressed) => {
              onDrawingChange(pressed);
              if (pressed) onDrawingToolChange('dottedLine');
            }}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary"
            aria-label="Dotted line tool"
          >
            <MinusIcon className={`w-4 h-4 ${isDrawing && drawingTool === 'dottedLine' ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          {isDrawing && drawingTool === 'dottedLine' && (
            <div className="flex flex-row sm:flex-col items-center gap-2">
              <ColorPicker
                color={strokeColor}
                onChange={onStrokeColorChange}
                label="Line Color"
              />
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-24 sm:w-full"
                aria-label="Line width"
              />
            </div>
          )}
        </div>

        {/* Eraser Tool */}
        <div className="flex flex-col items-center gap-2">
          <Toggle 
            pressed={isDrawing && drawingTool === 'eraser'} 
            onPressedChange={(pressed) => {
              onDrawingChange(pressed);
              if (pressed) onDrawingToolChange('eraser');
            }}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary"
            aria-label="Eraser tool"
          >
            <Eraser className={`w-4 h-4 ${isDrawing && drawingTool === 'eraser' ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          {isDrawing && drawingTool === 'eraser' && (
            <div className="flex flex-row sm:flex-col items-center gap-2">
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-24 sm:w-full"
                aria-label="Eraser width"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;