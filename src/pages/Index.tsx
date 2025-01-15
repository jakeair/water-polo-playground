import { useState } from 'react';
import Navigation from '@/components/Navigation';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-800">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <header className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-100 tracking-tight">
                Water Polo Whiteboard
              </h1>
              <p className="text-sm sm:text-base text-sky-200/80 max-w-xl mx-auto leading-relaxed">
                Create, animate, and share professional water polo strategies with our interactive whiteboard. Perfect for coaches and players to visualize plays, movements, and tactical scenarios in real-time.
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
            
            <Toolbar
              team1Color={team1Color}
              team2Color={team2Color}
              onTeam1ColorChange={setTeam1Color}
              onTeam2ColorChange={setTeam2Color}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
              isErasing={isErasing}
              setIsErasing={setIsErasing}
              strokeColor={strokeColor}
              setStrokeColor={setStrokeColor}
              strokeWidth={strokeWidth}
              setStrokeWidth={setStrokeWidth}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;