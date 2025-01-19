import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PlayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: play, isLoading } = useQuery({
    queryKey: ['play', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plays')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <Play className="w-12 h-12 text-blue-400" />
        </div>
      </div>
    );
  }

  if (!play) {
    toast.error("Play not found");
    navigate('/playbook');
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF]">
        <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-blue-100 z-50">
          <div className="max-w-[1800px] mx-auto py-4 sm:py-5">
            <Navigation />
          </div>
        </div>

        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0EA5E9 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <main className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-blue-50"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Playbook
          </Button>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-blue-100 p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{play.title}</h1>
              <p className="text-gray-500">
                Created on {new Date(play.created_at).toLocaleDateString()}
              </p>
            </div>

            {play.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{play.description}</p>
              </div>
            )}

            {play.video_url && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Play Animation</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                  <video 
                    src={play.video_url}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {!play.video_url && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No video recording available for this play</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PlayDetail;