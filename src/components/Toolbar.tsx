import React from 'react';
import ColorPicker from './ColorPicker';
import { Pencil, DashedLine } from 'lucide-react';
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
  drawingTool: 'pen' | 'dottedLine';
  onDrawingToolChange: (tool: 'pen' | 'dottedLine') => void;
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
    <div className="flex flex-col gap-2 sm:gap-4 bg-[#1A1F2C]/95 backdrop-blur-md p-2 sm:p-3 rounded-xl shadow-md">
      {/* Team Colors */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
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
      </div>

      <Separator className="bg-white/10" />

      {/* Drawing Tools - Vertical Layout */}
      <div className="flex flex-col items-center gap-2">
        {/* Pen Tool */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Toggle 
            pressed={isDrawing && drawingTool === 'pen'} 
            onPressedChange={(pressed) => {
              onDrawingChange(pressed);
              if (pressed) onDrawingToolChange('pen');
            }}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary w-full"
            aria-label="Pen tool"
          >
            <Pencil className={`w-4 h-4 ${isDrawing && drawingTool === 'pen' ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          {isDrawing && drawingTool === 'pen' && (
            <>
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
                className="w-full"
                aria-label="Stroke width"
              />
            </>
          )}
        </div>

        {/* Dotted Line Tool */}
        <div className="flex flex-col items-center gap-2 w-full">
          <Toggle 
            pressed={isDrawing && drawingTool === 'dottedLine'} 
            onPressedChange={(pressed) => {
              onDrawingChange(pressed);
              if (pressed) onDrawingToolChange('dottedLine');
            }}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary w-full"
            aria-label="Dotted line tool"
          >
            <DashedLine className={`w-4 h-4 ${isDrawing && drawingTool === 'dottedLine' ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          {isDrawing && drawingTool === 'dottedLine' && (
            <>
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
                className="w-full"
                aria-label="Line width"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;