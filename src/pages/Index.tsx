import WaterPoloCourt from '@/components/WaterPoloCourt';
import Timeline from '@/components/Timeline';
import { useState } from 'react';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyframes, setKeyframes] = useState<number[]>([]);

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRecordKeyframe = () => {
    setKeyframes(prev => [...new Set([...prev, currentTime])].sort((a, b) => a - b));
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-16 text-white/90">Water Polo Court</h1>
      <div className="space-y-8">
        <WaterPoloCourt 
          currentTime={currentTime}
          isPlaying={isPlaying}
          keyframes={keyframes}
        />
        <Timeline
          currentTime={currentTime}
          duration={1000}
          keyframes={keyframes}
          isPlaying={isPlaying}
          onTimeChange={handleTimeChange}
          onPlayPause={handlePlayPause}
          onRecordKeyframe={handleRecordKeyframe}
        />
      </div>
    </div>
  );
};

export default Index;