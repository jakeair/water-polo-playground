import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Circle } from 'lucide-react';

interface TimelineProps {
  currentTime: number;
  duration: number;
  keyframes: number[];
  isPlaying: boolean;
  onTimeChange: (time: number) => void;
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
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          className="bg-plays-accent text-white hover:bg-plays-accent/90"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRecordKeyframe}
          className="bg-plays-accent text-white hover:bg-plays-accent/90"
        >
          <Circle className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center gap-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => onTimeChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-white/60 tabular-nums">
          {Math.round((currentTime / duration) * 100)}%
        </div>
      </div>
      
      <div className="flex gap-1">
        {keyframes.map((time, index) => (
          <div
            key={index}
            className="w-1 h-4 bg-plays-accent cursor-pointer"
            onClick={() => onTimeChange(time)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;