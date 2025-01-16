import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette, Pencil } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface ToolbarProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
  isDrawing: boolean;
  isErasing: boolean;
  onDrawingChange: (isDrawing: boolean) => void;
  onErasingChange: (isErasing: boolean) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
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
  onStrokeWidthChange
}) => {
  const handleDrawingClick = () => {
    onDrawingChange(!isDrawing);
  };

  const handleStrokeWidthChange = (value: number[]) => {
    onStrokeWidthChange(value[0]);
  };

  return (
    <div className="flex flex-col gap-4 bg-[#1A1F2C]/95 backdrop-blur-md p-3 rounded-xl shadow-md">
      <div className="space-y-3">
        <div className="flex justify-center">
          <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
        </div>
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
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-3">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleDrawingClick}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
              isDrawing ? 'bg-white/20 ring-2 ring-white/30' : 'hover:bg-white/10'
            }`}
          >
            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
          </button>
        </div>

        {isDrawing && (
          <div className="space-y-2">
            <ColorPicker
              color={strokeColor}
              onChange={onStrokeColorChange}
              label="Stroke"
            />
            <div className="px-1 py-1 bg-black/20 rounded-lg">
              <Slider
                value={[strokeWidth]}
                onValueChange={handleStrokeWidthChange}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;