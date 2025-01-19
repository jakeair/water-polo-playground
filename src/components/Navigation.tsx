import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Layout, Info, LogOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="flex items-center gap-2 sm:gap-6 px-4 w-full max-w-[1800px] mx-auto">
      <div className="flex-shrink-0 mr-auto">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/03fa9e59-b51a-4476-a756-03b48791d259.png" 
            alt="Logo" 
            className="h-10 sm:h-12 w-auto transition-all duration-200 hover:opacity-90"
          />
        </Link>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/') 
                  ? 'bg-blue-600 text-white font-medium shadow-md' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } border border-transparent hover:border-blue-100 transition-all`}
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline font-medium">Home</span>
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
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/plays') 
                  ? 'bg-blue-600 text-white font-medium shadow-md' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } border border-transparent hover:border-blue-100 transition-all`}
            >
              <Layout className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline font-medium">Whiteboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Whiteboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to="/about" 
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                isActive('/about') 
                  ? 'bg-blue-600 text-white font-medium shadow-md' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } border border-transparent hover:border-blue-100 transition-all`}
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline font-medium">About</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>About Us</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="ml-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
};

export default Navigation;