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
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Navigation />
        
        <div className="flex min-h-[calc(100vh-64px)] w-full">
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
          
          <main className="flex-1 overflow-hidden">
            <div className="h-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
              <div className="mx-auto max-w-7xl flex flex-col items-center justify-start gap-8 sm:gap-12">
                <header className="text-center space-y-4 w-full max-w-3xl">
                  <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium text-white/80">
                    Interactive Whiteboard
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text">
                    Design Your Plays
                  </h1>
                  <p className="text-lg sm:text-xl text-white/60">
                    Create, animate, and share your water polo strategies with our interactive whiteboard
                  </p>
                </header>
                
                <div className="w-full flex justify-center">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;