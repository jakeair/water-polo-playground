import React, { useState } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import Help from '@/components/Help';
import { SidebarProvider } from '@/components/ui/sidebar';
import NcaaLogo from '@/components/NcaaLogo';
import { Menu } from 'lucide-react';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-white/70" />
            </button>
            <NcaaLogo size={100} className="hidden sm:block" />
          </div>
          <Help />
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        <SidebarProvider>
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="w-full lg:w-auto">
              <Toolbar
                team1Color={team1Color}
                team2Color={team2Color}
                onTeam1ColorChange={setTeam1Color}
                onTeam2ColorChange={setTeam2Color}
                isDrawing={isDrawing}
                onDrawingChange={setIsDrawing}
                isErasing={isErasing}
                onErasingChange={setIsErasing}
                strokeColor={strokeColor}
                onStrokeColorChange={setStrokeColor}
                strokeWidth={strokeWidth}
                onStrokeWidthChange={setStrokeWidth}
              />
            </div>

            <div className="w-full flex-1 flex justify-center">
              <WaterPoloCourt
                team1Color={team1Color}
                team2Color={team2Color}
                onTeam1ColorChange={setTeam1Color}
                onTeam2ColorChange={setTeam2Color}
                isDrawing={isDrawing}
                isErasing={isErasing}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
              />
            </div>
          </div>
        </SidebarProvider>
      </main>
    </div>
  );
};

export default Index;