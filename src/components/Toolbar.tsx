import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette, Pencil, Eraser } from 'lucide-react';
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
  isErasing,
  onDrawingChange,
  onErasingChange,
  strokeColor,
  onStrokeColorChange,
  strokeWidth,
  onStrokeWidthChange
}) => {
  const handleDrawingClick = () => {
    if (isErasing) onErasingChange(false);
    onDrawingChange(!isDrawing);
  };

  const handleErasingClick = () => {
    if (isDrawing) onDrawingChange(false);
    onErasingChange(!isErasing);
  };

  const handleStrokeWidthChange = (value: number[]) => {
    onStrokeWidthChange(value[0]);
  };

  return (
    <Sidebar variant="floating" className="w-[100px] bg-white/5 backdrop-blur-md border-r border-white/10">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="space-y-8 p-4">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-2">
                <Palette className="w-5 h-5 text-white/60" />
                <span className="text-xs text-white/60">Teams</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <ColorPicker
                    color={team1Color}
                    onChange={onTeam1ColorChange}
                    label="Team 1"
                  />
                  <span className="text-[10px] text-white/40">Team 1</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ColorPicker
                    color={team2Color}
                    onChange={onTeam2ColorChange}
                    label="Team 2"
                  />
                  <span className="text-[10px] text-white/40">Team 2</span>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleDrawingClick}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDrawing ? 'bg-white/20 ring-2 ring-white/30' : 'hover:bg-white/10'
                  }`}
                  title="Drawing Tool"
                >
                  <Pencil className="w-5 h-5 text-white/60" />
                </button>
                <button
                  onClick={handleErasingClick}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isErasing ? 'bg-white/20 ring-2 ring-white/30' : 'hover:bg-white/10'
                  }`}
                  title="Eraser Tool"
                >
                  <Eraser className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {isDrawing && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <ColorPicker
                      color={strokeColor}
                      onChange={onStrokeColorChange}
                      label="Stroke"
                    />
                    <span className="text-[10px] text-white/40">Stroke</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-white/40 block text-center">Width</span>
                    <div className="px-2 py-1 bg-black/20 rounded-lg">
                      <Slider
                        value={[strokeWidth]}
                        onValueChange={handleStrokeWidthChange}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-[10px] text-white/40 block text-center">{strokeWidth}px</span>
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