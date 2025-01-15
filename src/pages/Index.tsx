import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#3b82f6');
  const [team2Color, setTeam2Color] = useState('#ef4444');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 to-slate-800">
        <Toolbar
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
        />
        <div className="flex-1 px-8 py-12 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-white/60 text-transparent bg-clip-text">
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
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;