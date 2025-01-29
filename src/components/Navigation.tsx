import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layout, Info, Notebook } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="flex items-center h-16 px-4 max-w-[1800px] mx-auto">
        <div className="flex-shrink-0 mr-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/03fa9e59-b51a-4476-a756-03b48791d259.png" 
              alt="Logo" 
              className="h-8 w-auto transition-all duration-200 hover:opacity-90"
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Home</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/plays" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/plays') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Layout className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Whiteboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Whiteboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/playbook" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/playbook') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Notebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Playbook</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Playbook</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/about" 
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                    isActive('/about') 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline text-sm font-medium">About</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>About Us</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;