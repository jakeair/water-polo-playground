import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, CircleDot } from "lucide-react";

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
  duration,
  keyframes,
  isPlaying,
  onTimeChange,
  onPlayPause,
  onRecordKeyframe
}) => {
  return (
    <div className="w-full space-y-4 p-4 border rounded-lg bg-white/10 backdrop-blur-sm shadow-lg">
      {/* Main timeline */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onPlayPause}
          className="hover:bg-white/20"
        >
          {isPlaying ? 
            <PauseCircle className="h-6 w-6 text-white" /> : 
            <PlayCircle className="h-6 w-6 text-white" />
          }
        </Button>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => onTimeChange(value[0])}
          className="flex-1"
        />
        <Button 
          variant="destructive" 
          size="icon"
          onClick={onRecordKeyframe}
          className="hover:bg-red-600/80"
        >
          <CircleDot className="h-4 w-4" />
        </Button>
      </div>

      {/* Keyframes timeline */}
      <div className="relative h-2 w-full bg-white/5 rounded overflow-hidden">
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="absolute w-0.5 h-full bg-red-500"
            style={{ 
              left: `${(time / duration) * 100}%`,
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)'
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
  );
};

export default Timeline;