import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, Clock, MousePointerClick, Move, Repeat } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Help = () => {
  return (
    <div className="w-full p-8 rounded-3xl bg-black/5 backdrop-blur-lg border border-white/10 shadow-2xl">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text">
          How to Create Animations
        </h2>
        
        {/* Controls Overview - Now more compact */}
        <div className="grid grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl">
          <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl hover:bg-white/10 transition-all">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg shrink-0">
              <PlayCircle className="h-5 w-5" />
            </Button>
            <span className="text-sm">Play/Pause</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl hover:bg-white/10 transition-all">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
            <span className="text-sm">Add Keyframe</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 p-3 rounded-xl hover:bg-white/10 transition-all">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg shrink-0">
              <Clock className="h-5 w-5" />
            </Button>
            <span className="text-sm">Timeline</span>
          </div>
        </div>

        {/* Steps Grid - More compact with smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <StepPanel
            number={1}
            icon={MousePointerClick}
            title="Set Start"
            description="Position players & ball"
          />
          <StepPanel
            number={2}
            icon={Clock}
            title="Timeline"
            description="Move forward in time"
          />
          <StepPanel
            number={3}
            icon={Move}
            title="New Position"
            description="Set next positions"
          />
          <StepPanel
            number={4}
            icon={PlayCircle}
            title="Preview"
            description="Watch animation"
          />
          <StepPanel
            number={5}
            icon={Repeat}
            title="Build"
            description="Add more keyframes"
          />
        </div>

        {/* Tips - Now more compact */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-primary text-lg leading-none">•</span>
              <span>Closer keyframes = faster movement</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-primary text-lg leading-none">•</span>
              <span>Spread keyframes for smooth transitions</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-primary text-lg leading-none">•</span>
              <span>Use timeline to adjust timing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepPanel = ({ number, icon: Icon, title, description }: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Icon className="h-4 w-4 text-white/80" />
          </div>
          <h4 className="text-sm text-white/90 font-medium">{title}</h4>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Help;