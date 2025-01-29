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
          className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">How to Create Animations</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(80vh-8rem)] pr-4">
          <div className="space-y-4">
            <div className="grid gap-4">
              {/* Controls Overview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Quick Controls</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-gray-200">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Play/pause animation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-gray-200">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Add current positions as keyframe</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition-all flex-1 min-w-[240px]">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-gray-200">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Timeline: <span className="text-red-600">red</span> = keyframes, <span className="text-blue-600">blue</span> = current time</span>
                  </div>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Animation Steps</h3>
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
                <h3 className="text-lg font-semibold text-gray-800">Pro Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-start gap-2 text-gray-700">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-sm">Closer keyframes = faster movement</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-sm">Spread keyframes for slower transitions</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
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
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all h-full group">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
          <Icon className="h-4 w-4 text-gray-700" />
        </div>
        <div>
          <h4 className="text-sm text-gray-800 font-medium">{title}</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
