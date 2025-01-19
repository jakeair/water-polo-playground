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
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'dottedLine' | 'eraser'>('pen');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50 h-16">
        <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
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
            {/* Left Toolbar - Always Compact */}
            <div className="w-16 flex-shrink-0 bg-gray-50/90 border-r border-gray-200">
              <div className="h-full flex flex-col items-center p-2 gap-2">
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
            <div className="flex-1 relative flex flex-col overflow-hidden p-2 md:p-6 bg-gray-50">
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