import React, { useState } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import Help from '@/components/Help';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';
import NcaaLogo from '@/components/NcaaLogo';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-[1800px] mx-auto px-4 py-2 flex items-center justify-between">
          <NcaaLogo size={100} className="opacity-90" />
          <Navigation />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 md:p-8 space-y-8 pt-20">
        {/* Help Section */}
        <Help />
        
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
      </div>
      <Toaster />
    </div>
  );
};

export default Index;