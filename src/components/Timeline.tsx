import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, BookmarkPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimelineProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTimeChange: (value: number) => void;
  onPlayPause: () => void;
  keyframes?: number[];
  onRecordKeyframe?: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration = 2500,
  isPlaying,
  onTimeChange,
  onPlayPause,
  keyframes = [],
  onRecordKeyframe,
}) => {
  return (
    <div className="w-full space-y-2 p-3 rounded-lg bg-white border border-gray-200 shadow-lg fixed bottom-2 left-0 right-0 mx-auto max-w-[calc(100%-2rem)]">
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="default"
                onClick={onPlayPause}
                className="w-10 h-10 rounded-full hover:bg-blue-50 transition-all duration-300 border-2"
              >
                {isPlaying ? 
                  <PauseCircle className="h-6 w-6 text-blue-600" /> : 
                  <PlayCircle className="h-6 w-6 text-blue-600" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause' : 'Play'} Animation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {onRecordKeyframe && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  onClick={onRecordKeyframe}
                  className="w-10 h-10 rounded-full hover:bg-blue-50 transition-all duration-300 border-2"
                >
                  <BookmarkPlus className="h-6 w-6 text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Keyframe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => onTimeChange(value[0])}
            className="py-1"
          />
        </div>
      </div>

      <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute h-full w-0.5 bg-blue-500"
          style={{ 
            left: `${(currentTime / duration) * 100}%`,
            transform: 'translateX(-50%)',
            transition: 'left 0.1s linear'
          }}
        />
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="absolute h-3 w-1 bg-blue-500 rounded-full -top-0.5"
            style={{
              left: `${(time / duration) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          />
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center font-mono">
        {(currentTime / 100).toFixed(1)}s / {(duration / 100).toFixed(1)}s
      </div>
    </div>
  );
};

export default Timeline;