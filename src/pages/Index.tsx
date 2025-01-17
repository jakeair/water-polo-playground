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
      <div className="fixed inset-0 pt-16 pb-0">
        <div className="h-full w-full flex flex-col lg:flex-row">
          <SidebarProvider>
            {/* Main Court Area */}
            <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
              <div className="w-full h-[calc(100vh-8rem)] max-w-[1200px] mx-auto">
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

            {/* Right Toolbar - Fixed Position */}
            <div className="lg:fixed lg:right-0 lg:top-16 lg:bottom-0 lg:w-[280px] p-2 bg-black/20 border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
              <div className="flex flex-row lg:flex-col gap-2 items-start lg:items-stretch">
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
                <div className="lg:mt-2">
                  <Help />
                </div>
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