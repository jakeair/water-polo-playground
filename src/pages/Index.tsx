import { useState } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#9b87f5');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 to-slate-800 pt-20">
        <Navigation />
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
        <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-16">
            <header className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6 py-6 sm:py-8 rounded-2xl bg-gradient-to-b from-purple-900/40 via-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/30 shadow-lg shadow-purple-900/10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-200 text-transparent bg-clip-text break-words tracking-tight leading-tight">
                Water Polo Whiteboard
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-purple-100/90 max-w-xl mx-auto font-medium">
                Design and animate your water polo plays with our interactive court builder
              </p>
            </header>
            
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
      </div>
    </SidebarProvider>
  );
};

export default Index;