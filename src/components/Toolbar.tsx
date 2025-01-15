import React from 'react';
import ColorPicker from './ColorPicker';
import { Palette, Droplet } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar variant="floating" className="w-[240px] bg-white/10 backdrop-blur-sm">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Team Colors
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplet className="w-4 h-4" />
                Team 1
              </div>
              <ColorPicker
                color={team1Color}
                onChange={onTeam1ColorChange}
                label="Team 1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplet className="w-4 h-4" />
                Team 2
              </div>
              <ColorPicker
                color={team2Color}
                onChange={onTeam2ColorChange}
                label="Team 2"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Toolbar;