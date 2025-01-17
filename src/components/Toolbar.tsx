import React from 'react';
import ColorPicker from './ColorPicker';
import { Pencil, Eraser, CircleHelp } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const DottedLineArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path strokeDasharray="4" d="M3 12h14" />
    <path d="M17 7l5 5-5 5" />
  </svg>
);

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
  const getStrokeWidthRange = (tool: 'pen' | 'dottedLine' | 'eraser') => {
    switch (tool) {
      case 'eraser':
        return { min: 30, max: 60 };
      default:
        return { min: 1, max: 10 };
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      {/* Team Colors */}
      <div className="flex flex-col items-center gap-2">
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

      <Separator className="bg-white/10" />

      {/* Drawing Tools */}
      <div className="flex flex-col items-center gap-2 flex-1">
        {/* Pen Tool */}
        <Toggle 
          pressed={isDrawing && drawingTool === 'pen'} 
          onPressedChange={(pressed) => {
            onDrawingChange(pressed);
            if (pressed) onDrawingToolChange('pen');
          }}
          className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary w-10 h-10"
          aria-label="Pen tool"
        >
          <Pencil className={`w-4 h-4 ${isDrawing && drawingTool === 'pen' ? 'fill-white stroke-white' : ''}`} />
        </Toggle>
        {isDrawing && drawingTool === 'pen' && (
          <div className="flex flex-col items-center gap-2">
            <ColorPicker
              color={strokeColor}
              onChange={onStrokeColorChange}
              label="Color"
            />
            <input
              type="range"
              min={getStrokeWidthRange('pen').min}
              max={getStrokeWidthRange('pen').max}
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="w-full"
              aria-label="Stroke width"
            />
          </div>
        )}

        {/* Dotted Line Tool */}
        <Toggle 
          pressed={isDrawing && drawingTool === 'dottedLine'} 
          onPressedChange={(pressed) => {
            onDrawingChange(pressed);
            if (pressed) onDrawingToolChange('dottedLine');
          }}
          className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary w-10 h-10"
          aria-label="Dotted line tool"
        >
          <DottedLineArrow />
        </Toggle>
        {isDrawing && drawingTool === 'dottedLine' && (
          <div className="flex flex-col items-center gap-2">
            <ColorPicker
              color={strokeColor}
              onChange={onStrokeColorChange}
              label="Color"
            />
            <input
              type="range"
              min={getStrokeWidthRange('dottedLine').min}
              max={getStrokeWidthRange('dottedLine').max}
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="w-full"
              aria-label="Line width"
            />
          </div>
        )}

        {/* Eraser Tool */}
        <Toggle 
          pressed={isDrawing && drawingTool === 'eraser'} 
          onPressedChange={(pressed) => {
            onDrawingChange(pressed);
            if (pressed) {
              onDrawingToolChange('eraser');
              onStrokeWidthChange(getStrokeWidthRange('eraser').min);
            }
          }}
          className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary w-10 h-10"
          aria-label="Eraser tool"
        >
          <Eraser className={`w-4 h-4 ${isDrawing && drawingTool === 'eraser' ? 'fill-white stroke-white' : ''}`} />
        </Toggle>
        {isDrawing && drawingTool === 'eraser' && (
          <div className="flex flex-col items-center gap-2">
            <input
              type="range"
              min={getStrokeWidthRange('eraser').min}
              max={getStrokeWidthRange('eraser').max}
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="w-full"
              aria-label="Eraser width"
            />
          </div>
        )}
      </div>

      {/* Help Icon at Bottom */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => {/* Add help functionality here */}}
            >
              <CircleHelp className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Toolbar;
