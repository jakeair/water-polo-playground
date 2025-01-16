import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, Clock, MousePointerClick, Move, Repeat } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Help = () => {
  return (
    <div className="w-full space-y-8 p-8 rounded-2xl bg-black/5 backdrop-blur-md border border-white/10 shadow-xl">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 text-transparent bg-clip-text leading-[1.15] pb-2">
          How to Create Animations
        </h2>
        
        <div className="grid gap-6">
          {/* Controls Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Controls Overview</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-3 text-white/80">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/10">
                  <PlayCircle className="h-6 w-6" />
                </Button>
                <span>Play Button: Start/pause your animation</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/10">
                  <Plus className="h-6 w-6" />
                </Button>
                <span>Add Keyframe: Save current positions</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/10">
                  <Clock className="h-6 w-6" />
                </Button>
                <span>Timeline: Shows keyframes and current time</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Animation Steps</h3>
            <div className="grid gap-6">
              <Step
                number={1}
                icon={MousePointerClick}
                title="Set Starting Positions"
                description="Move players and ball to starting positions, then click Add Keyframe"
              />
              <Step
                number={2}
                icon={Clock}
                title="Move Forward in Time"
                description="Drag the timeline forward to when you want the next movement"
              />
              <Step
                number={3}
                icon={Move}
                title="Set New Positions"
                description="Move pieces to new positions and click Add Keyframe"
              />
              <Step
                number={4}
                icon={PlayCircle}
                title="Preview Animation"
                description="Go back to start and click Play to watch"
              />
              <Step
                number={5}
                icon={Repeat}
                title="Build Your Animation"
                description="Keep adding keyframes to create complex movements"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white/90">Pro Tips</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Closer keyframes = faster movement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Spread out keyframes for slower, smoother transitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use the timeline to fine-tune timing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ number, icon: Icon, title, description }: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-white/80" />
      </div>
      <div className="space-y-1">
        <h4 className="text-white/90 font-medium">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Help;