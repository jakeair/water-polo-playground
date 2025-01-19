import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Navigation from '@/components/Navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Notebook } from 'lucide-react';
import { toast } from 'sonner';

const ViewPlay = () => {
  const { id } = useParams();
  const [team1Color, setTeam1Color] = useState('#2563eb');
  const [team2Color, setTeam2Color] = useState('#dc2626');
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'dottedLine' | 'eraser'>('pen');

  const { data: play, isLoading } = useQuery({
    queryKey: ['play', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plays')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Failed to load play');
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Notebook className="w-12 h-12 text-blue-400" />
          <p className="text-lg text-gray-600">Loading play...</p>
        </div>
      </div>
    );
  }

  if (!play) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Play not found</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-blue-100 z-50">
          <div className="max-w-[1800px] mx-auto py-4 sm:py-5">
            <Navigation />
          </div>
        </div>

        <main className="relative pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Notebook className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{play.title}</h1>
            </div>

            {play.description && (
              <p className="text-gray-600 mb-8">{play.description}</p>
            )}

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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ViewPlay;