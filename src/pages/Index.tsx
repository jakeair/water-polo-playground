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
      <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Navigation />
        
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] w-full">
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
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="min-h-full py-2 sm:py-4 lg:py-6">
              <div className="mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-7xl flex flex-col items-center justify-start gap-4 sm:gap-6 lg:gap-8">
                <header className="text-center space-y-3 sm:space-y-4 w-full max-w-3xl px-2 sm:px-4 pt-4 sm:pt-6 md:pt-8">
                  <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur rounded-full text-xs sm:text-sm font-medium text-white/80">
                    Interactive Whiteboard
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text">
                    Design Your Plays
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto">
                    Create, animate, and share your water polo strategies with our interactive whiteboard
                  </p>
                </header>
                
                <div className="w-full flex justify-center px-1 sm:px-2 md:px-4">
                  <div className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw]">
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;