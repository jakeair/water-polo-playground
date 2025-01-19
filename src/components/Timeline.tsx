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
    <div className="w-full space-y-3 p-4 rounded-lg bg-white border border-gray-200 shadow-lg fixed bottom-4 left-0 right-0 mx-auto max-w-[calc(100%-2rem)]">
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onPlayPause}
                className="w-12 h-12 rounded-full hover:bg-blue-50 transition-all duration-300 border-2"
              >
                {isPlaying ? 
                  <PauseCircle className="h-7 w-7 text-blue-600" /> : 
                  <PlayCircle className="h-7 w-7 text-blue-600" />
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
            className="py-2"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                size="lg"
                onClick={onRecordKeyframe}
                className="w-12 h-12 rounded-full border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 border-2"
              >
                <Plus className="h-7 w-7 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Keyframe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="absolute w-2 h-full bg-red-500"
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

      <div className="text-xs text-gray-500 text-center font-mono">
        {(currentTime / 100).toFixed(1)}s / {(duration / 100).toFixed(1)}s
      </div>
    </div>
  );
};

export default Timeline;