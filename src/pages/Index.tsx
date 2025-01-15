import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#9b87f5');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 to-slate-800">
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
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 pb-24">
            <header className="text-center space-y-4 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-white/60 text-transparent bg-clip-text break-words">
                Water Polo Playground
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
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