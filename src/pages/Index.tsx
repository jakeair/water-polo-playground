import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <Toolbar
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
        />
        <div className="flex-1 px-4 py-24">
          <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">Water Polo Court</h1>
          <WaterPoloCourt
            team1Color={team1Color}
            team2Color={team2Color}
            onTeam1ColorChange={setTeam1Color}
            onTeam2ColorChange={setTeam2Color}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;