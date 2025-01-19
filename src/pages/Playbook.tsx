import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Notebook, Play } from 'lucide-react';

const PlaybookPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: plays, isLoading } = useQuery({
    queryKey: ['plays'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plays')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Notebook className="w-12 h-12 text-blue-400" />
          <p className="text-lg text-gray-600">Loading your plays...</p>
        </div>
      </div>
    );
  }

  const totalPages = plays ? Math.ceil(plays.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlays = plays?.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1);
    }
  };

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
          <div className="flex items-center gap-4 mb-8">
            <Notebook className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Your Playbook</h1>
          </div>
          
          {plays?.length === 0 ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg border border-blue-100">
              <Notebook className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">You haven't saved any plays yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedPlays?.map((play) => (
                  <Card key={play.id} className="group hover:shadow-lg transition-all duration-200 bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {play.title}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        Created on {new Date(play.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        {play.description || 'No description provided'}
                      </p>
                      {play.video_url && (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <video 
                            src={play.video_url}
                            controls
                            className="w-full h-full object-cover"
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center pb-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePrevious}
                          className={cn(
                            "cursor-pointer",
                            currentPage === 1 && "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={handleNext}
                          className={cn(
                            "cursor-pointer",
                            currentPage === totalPages && "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PlaybookPage;