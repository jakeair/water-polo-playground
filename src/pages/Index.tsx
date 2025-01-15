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
        <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-16">
            <header className="text-center space-y-4 px-4 py-8">
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text">
                Water Polo Whiteboard
              </h1>
              <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto">
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