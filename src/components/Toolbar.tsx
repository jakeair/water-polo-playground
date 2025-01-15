import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

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
    <Sidebar variant="floating" className="w-[80px] bg-black/5 backdrop-blur-md border-r border-white/10">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="space-y-8 p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <Palette className="w-5 h-5 text-white/60" />
              </div>
              <div className="flex flex-col items-center gap-4">
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Toolbar;