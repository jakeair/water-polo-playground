import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, Clock, MousePointerClick, Move, Repeat } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Help = () => {
  return (
    <div className="w-full space-y-8 p-10 rounded-3xl bg-black/5 backdrop-blur-lg border border-white/10 shadow-2xl">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text leading-[1.15] pb-2">
          How to Create Animations
        </h2>
        
        <div className="grid gap-10">
          {/* Controls Overview */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white/90">Controls Overview</h3>
            <div className="grid gap-5">
              <div className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all">
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-white/10">
                  <PlayCircle className="h-6 w-6" />
                </Button>
                <span className="text-lg">Play Button: Start/pause your animation</span>
              </div>
              <div className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all">
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-white/10">
                  <Plus className="h-6 w-6" />
                </Button>
                <span className="text-lg">Add Keyframe: Save current positions</span>
              </div>
              <div className="flex items-center gap-4 text-white/80 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all">
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-white/10">
                  <Clock className="h-6 w-6" />
                </Button>
                <span className="text-lg">Timeline: Shows keyframes (<span className="text-red-400 font-medium">red markers</span>) and current time (<span className="text-blue-400 font-medium">blue marker</span>)</span>
              </div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white/90">Animation Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              <StepPanel
                number={1}
                icon={MousePointerClick}
                title="Set Starting Positions"
                description="Move players and ball to starting positions, then click Add Keyframe"
              />
              <StepPanel
                number={2}
                icon={Clock}
                title="Move Forward in Time"
                description="Drag the timeline forward to when you want the next movement"
              />
              <StepPanel
                number={3}
                icon={Move}
                title="Set New Positions"
                description="Move pieces to new positions and click Add Keyframe"
              />
              <StepPanel
                number={4}
                icon={PlayCircle}
                title="Preview Animation"
                description="Go back to start and click Play to watch"
              />
              <StepPanel
                number={5}
                icon={Repeat}
                title="Build Your Animation"
                description="Keep adding keyframes to create complex movements"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white/90">Pro Tips</h3>
            <div className="grid gap-3 bg-white/5 p-6 rounded-2xl">
              <div className="flex items-start gap-3 text-white/80">
                <span className="text-primary text-2xl leading-none">•</span>
                <span className="text-lg">Closer keyframes = faster movement</span>
              </div>
              <div className="flex items-start gap-3 text-white/80">
                <span className="text-primary text-2xl leading-none">•</span>
                <span className="text-lg">Spread out keyframes for slower, smoother transitions</span>
              </div>
              <div className="flex items-start gap-3 text-white/80">
                <span className="text-primary text-2xl leading-none">•</span>
                <span className="text-lg">Use the timeline to fine-tune timing</span>
              </div>
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
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Icon className="h-6 w-6 text-white/80" />
          </div>
          <h4 className="text-lg text-white/90 font-medium">{title}</h4>
        </div>
        <p className="text-white/70 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Help;