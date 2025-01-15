import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimelineProps {
  currentTime: number;
  duration: number;
  keyframes: number[];
  isPlaying: boolean;
  onTimeChange: (value: number) => void;
  onPlayPause: () => void;
  onRecordKeyframe: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration = 2500,
  keyframes,
  isPlaying,
  onTimeChange,
  onPlayPause,
  onRecordKeyframe
}) => {
  return (
    <div className="w-full space-y-12 mt-16 p-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-xl border border-white/20">
      <div className="flex items-center justify-center gap-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onPlayPause}
                className="w-12 h-12 rounded-full hover:bg-white/20 transition-colors"
              >
                {isPlaying ? 
                  <PauseCircle className="h-8 w-8 text-white" /> : 
                  <PlayCircle className="h-8 w-8 text-white" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause' : 'Play'} Animation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                size="icon"
                onClick={onRecordKeyframe}
                className="w-12 h-12 rounded-full border-red-500/50 hover:bg-red-500/20 hover:border-red-500"
              >
                <Plus className="h-6 w-6 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Keyframe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => onTimeChange(value[0])}
          className="flex-1"
        />
        
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          {keyframes.map((time, index) => (
            <div
              key={index}
              className="absolute w-1 h-full bg-red-500/80"
              style={{ 
                left: `${(time / duration) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            />
          ))}
          <div 
            className="absolute h-full w-1 bg-blue-500"
            style={{ 
              left: `${(currentTime / duration) * 100}%`,
              transform: 'translateX(-50%)',
              transition: 'left 0.1s linear'
            }}
          />
        </div>
      </div>

      <div className="text-sm text-white/60 text-center">
        {(currentTime / 100).toFixed(1)}s / {(duration / 100).toFixed(1)}s
      </div>
    </div>
  );
};

export default Timeline;