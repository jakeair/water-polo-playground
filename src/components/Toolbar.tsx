import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette, Pencil } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
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
    <Sidebar variant="floating" className="w-[80px] sm:w-[90px] md:w-[100px] bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="space-y-6 p-2 sm:p-3 md:p-4">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex justify-center">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
              </div>
              <div className="flex flex-col items-center gap-3 sm:gap-4">
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

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <button
                  onClick={handleDrawingClick}
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDrawing ? 'bg-white/20 ring-2 ring-white/30' : 'hover:bg-white/10'
                  }`}
                >
                  <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                </button>
              </div>

              {isDrawing && (
                <div className="space-y-3 sm:space-y-4">
                  <ColorPicker
                    color={strokeColor}
                    onChange={onStrokeColorChange}
                    label="Stroke"
                  />
                  <div className="px-1 sm:px-2 py-1 bg-black/20 rounded-lg">
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Toolbar;