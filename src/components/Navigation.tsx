import React from 'react';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-0 right-0 p-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
            <Menu className="h-5 w-5 text-white/80" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-black/40 backdrop-blur-md border-white/10">
          <DropdownMenuItem asChild>
            <Link to="/" className="text-white/80 hover:text-white focus:text-white">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/plays" className="text-white/80 hover:text-white focus:text-white">
              Plays
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/about" className="text-white/80 hover:text-white focus:text-white">
              About
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navigation;