import React, { useState } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import { useDrawingState } from '@/hooks/useDrawingState';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');
  const drawingState = useDrawingState();

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 p-4 bg-white">
        <Toolbar
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
          {...drawingState}
        />
      </aside>
      
      <main className="flex-1 p-4">
        <WaterPoloCourt
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
        />
      </main>
    </div>
  );
};

export default Index;