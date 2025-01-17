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
  const [strokeColor, setStrokeColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'dottedLine' | 'eraser'>('pen');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-b border-white/10 z-50 h-16">
        <div className="max-w-[1800px] mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <img 
              src="/lovable-uploads/909e2d5e-f8a8-493f-9d95-f0d86ecd99be.png" 
              alt="Logo" 
              className="h-10 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100"
            />
          </Link>
          <Navigation />
        </div>
      </div>

      {/* Main Content */}
      <div className="fixed inset-0 pt-16">
        <div className="h-full w-full flex">
          <SidebarProvider>
            {/* Left Toolbar - Minimal Sidebar */}
            <div className="w-16 lg:w-[220px] flex-shrink-0 bg-black/20 border-r border-white/10">
              <div className="h-full flex flex-col items-center lg:items-stretch p-2 gap-2">
                <Toolbar
                  team1Color={team1Color}
                  team2Color={team2Color}
                  onTeam1ColorChange={setTeam1Color}
                  onTeam2ColorChange={setTeam2Color}
                  isDrawing={isDrawing}
                  onDrawingChange={setIsDrawing}
                  strokeColor={strokeColor}
                  onStrokeColorChange={setStrokeColor}
                  strokeWidth={strokeWidth}
                  onStrokeWidthChange={setStrokeWidth}
                  drawingTool={drawingTool}
                  onDrawingToolChange={setDrawingTool}
                />
                <div className="mt-auto">
                  <Help />
                </div>
              </div>
            </div>

            {/* Main Court Area */}
            <div className="flex-1 relative flex flex-col overflow-hidden p-2 md:p-4">
              <div className="flex-1 min-h-0 flex items-center justify-center w-full">
                <WaterPoloCourt
                  team1Color={team1Color}
                  team2Color={team2Color}
                  onTeam1ColorChange={setTeam1Color}
                  onTeam2ColorChange={setTeam2Color}
                  isDrawing={isDrawing}
                  onDrawingChange={setIsDrawing}
                  strokeColor={strokeColor}
                  onStrokeColorChange={setStrokeColor}
                  strokeWidth={strokeWidth}
                  onStrokeWidthChange={setStrokeWidth}
                  drawingTool={drawingTool}
                  onDrawingToolChange={setDrawingTool}
                />
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;