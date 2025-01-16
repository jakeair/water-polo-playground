import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface ToolbarProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange
}) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 bg-[#1A1F2C]/95 backdrop-blur-md p-2 sm:p-3 rounded-xl shadow-md">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-center">
          <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
        </div>
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
    </div>
  );
};

export default Toolbar;