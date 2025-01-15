import React from 'react';
import ColorPicker from './ColorPicker';
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
    <Sidebar variant="floating" className="w-[200px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Team Colors</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4 p-2">
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Toolbar;