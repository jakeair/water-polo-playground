import React from 'react';
import ColorPicker from './ColorPicker';
import { 
  Palette, 
  Pen, 
  Circle, 
  Square,
  MinusCircle,
  Minus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type Tool = 'pen' | 'ellipse' | 'rectangle' | 'dottedLine' | 'straightLine';

interface ToolbarProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
  activeTool?: Tool;
  onToolSelect?: (tool: Tool) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange,
  activeTool,
  onToolSelect
}) => {
  const tools = [
    { id: 'pen' as Tool, icon: Pen, label: 'Pen Tool' },
    { id: 'ellipse' as Tool, icon: Circle, label: 'Ellipse Tool' },
    { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle Tool' },
    { id: 'dottedLine' as Tool, icon: MinusCircle, label: 'Dotted Line Tool' },
    { id: 'straightLine' as Tool, icon: Minus, label: 'Straight Line Tool' },
  ];

  return (
    <Sidebar variant="floating" className="w-[80px] bg-white/5 backdrop-blur-md border-r border-white/10">
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

            <div className="space-y-4">
              <SidebarMenu>
                {tools.map((tool) => (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton
                      onClick={() => onToolSelect?.(tool.id)}
                      className={`w-full flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                        activeTool === tool.id 
                          ? 'bg-white/10 text-white' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <tool.icon className="w-5 h-5" />
                      <span className="text-xs">{tool.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Toolbar;