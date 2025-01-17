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
    <div className="w-full space-y-2 p-3 rounded-lg bg-black/5 backdrop-blur-md border border-white/10 shadow-lg mb-safe">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onPlayPause}
                className="w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                {isPlaying ? 
                  <PauseCircle className="h-5 w-5 text-white/80" /> : 
                  <PlayCircle className="h-5 w-5 text-white/80" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause' : 'Play'} Animation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => onTimeChange(value[0])}
            className="py-1"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                size="icon"
                onClick={onRecordKeyframe}
                className="w-7 h-7 rounded-full border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200"
              >
                <Plus className="h-4 w-4 text-red-500/80" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Keyframe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="absolute w-0.5 h-full bg-red-500/80"
            style={{ 
              left: `${(time / duration) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          />
        ))}
        <div 
          className="absolute h-full w-0.5 bg-blue-500"
          style={{ 
            left: `${(currentTime / duration) * 100}%`,
            transform: 'translateX(-50%)',
            transition: 'left 0.1s linear'
          }}
        />
      </div>

      <div className="text-[10px] text-white/40 text-center font-mono">
        {(currentTime / 100).toFixed(1)}s / {(duration / 100).toFixed(1)}s
      </div>
    </div>
  );
};

export default Timeline;