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
    <div className="w-full space-y-4 p-4 border rounded-lg bg-white/50 backdrop-blur-sm">
      {/* Main timeline */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onPlayPause}
        >
          {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
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
        >
          <CircleDot className="h-4 w-4" />
        </Button>
      </div>

      {/* Keyframes timeline */}
      <div className="relative h-8 w-full bg-gray-100 rounded">
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="absolute w-1 h-full bg-red-500"
            style={{ left: `${(time / duration) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;