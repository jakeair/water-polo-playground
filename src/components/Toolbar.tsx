import React from 'react';
import ColorPicker from './ColorPicker';
import { Pencil, ArrowRight, ArrowBigRightDash } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  drawingTool: 'pen' | 'arrow' | 'dottedArrow';
  onDrawingToolChange: (tool: 'pen' | 'arrow' | 'dottedArrow') => void;
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

      {/* Drawing Tools Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Toggle 
            pressed={isDrawing} 
            onPressedChange={onDrawingChange}
            className="data-[state=on]:bg-primary p-2 hover:bg-primary/90 active:bg-primary"
            aria-label="Toggle drawing"
          >
            <Pencil className={`w-4 h-4 ${isDrawing ? 'fill-white stroke-white' : ''}`} />
          </Toggle>
          
          {isDrawing && (
            <>
              <ToggleGroup type="single" value={drawingTool} onValueChange={(value) => value && onDrawingToolChange(value as 'pen' | 'arrow' | 'dottedArrow')}>
                <ToggleGroupItem value="pen" aria-label="Pen tool">
                  <Pencil className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="arrow" aria-label="Arrow tool">
                  <ArrowRight className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="dottedArrow" aria-label="Dotted arrow tool">
                  <ArrowBigRightDash className="w-4 h-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ColorPicker
                color={strokeColor}
                onChange={onStrokeColorChange}
                label="Drawing Color"
              />
            </>
          )}
        </div>

        {/* Stroke Width - Smaller Scale */}
        {isDrawing && (
          <div className="flex items-center gap-2 w-full">
            <input
              type="range"
              min="1"
              max="10"
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="flex-1"
              aria-label="Stroke width"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;