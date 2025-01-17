import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, Clock, MousePointerClick, Move, Repeat, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Help = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-8 h-8 rounded-lg hover:bg-white/10"
        >
          <HelpCircle className="w-4 h-4 text-white/70 hover:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-black/90 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">How to Create Animations</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(80vh-8rem)] pr-4">
          <div className="space-y-4">
            <div className="grid gap-4">
              {/* Controls Overview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white/90">Quick Controls</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Play/pause animation</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Add current positions as keyframe</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Timeline: <span className="text-red-400">red</span> = keyframes, <span className="text-blue-400">blue</span> = current time</span>
                  </div>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white/90">Animation Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
                  <StepPanel
                    number={1}
                    icon={MousePointerClick}
                    title="Set Start"
                    description="Position players & ball, add keyframe"
                  />
                  <StepPanel
                    number={2}
                    icon={Clock}
                    title="Move Time"
                    description="Drag timeline to next position"
                  />
                  <StepPanel
                    number={3}
                    icon={Move}
                    title="New Position"
                    description="Move pieces, add keyframe"
                  />
                  <StepPanel
                    number={4}
                    icon={PlayCircle}
                    title="Preview"
                    description="Go to start, click play"
                  />
                  <StepPanel
                    number={5}
                    icon={Repeat}
                    title="Build More"
                    description="Add keyframes for complexity"
                  />
                </div>
              </div>

              {/* Tips */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white/90">Pro Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl">
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-sm">Closer keyframes = faster movement</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-sm">Spread keyframes for slower transitions</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-sm">Use timeline to fine-tune timing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const StepPanel = ({ number, icon: Icon, title, description }: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all h-full group">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <Icon className="h-4 w-4 text-white/80" />
        </div>
        <div>
          <h4 className="text-sm text-white/90 font-medium">{title}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
