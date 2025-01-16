import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import Help from '@/components/Help';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <img 
              src="/lovable-uploads/909e2d5e-f8a8-493f-9d95-f0d86ecd99be.png" 
              alt="Logo" 
              className="h-12 sm:h-14 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100"
            />
          </Link>
          <Navigation />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1800px] mx-auto pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8">
        {/* Help Section */}
        <Help />
        
        <SidebarProvider>
          <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start mt-12">
            <div className="w-full lg:w-auto lg:sticky lg:top-28">
              <Toolbar
                team1Color={team1Color}
                team2Color={team2Color}
                onTeam1ColorChange={setTeam1Color}
                onTeam2ColorChange={setTeam2Color}
                isDrawing={isDrawing}
                isErasing={isErasing}
                onDrawingChange={setIsDrawing}
                onErasingChange={setIsErasing}
                strokeColor={strokeColor}
                onStrokeColorChange={setStrokeColor}
                strokeWidth={strokeWidth}
                onStrokeWidthChange={setStrokeWidth}
              />
            </div>

            <div className="w-full flex-1">
              <WaterPoloCourt
                team1Color={team1Color}
                team2Color={team2Color}
                onTeam1ColorChange={setTeam1Color}
                onTeam2ColorChange={setTeam2Color}
                isDrawing={isDrawing}
                isErasing={isErasing}
                onDrawingChange={setIsDrawing}
                onErasingChange={setIsErasing}
                strokeColor={strokeColor}
                onStrokeColorChange={setStrokeColor}
                strokeWidth={strokeWidth}
                onStrokeWidthChange={setStrokeWidth}
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