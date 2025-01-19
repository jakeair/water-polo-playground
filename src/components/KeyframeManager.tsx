import React from 'react';
import { KeyframeData } from '@/hooks/useKeyframes';
import Timeline from './Timeline';

interface KeyframeManagerProps {
  currentTime: number;
  duration: number;
  keyframes: KeyframeData[];
  isPlaying: boolean;
  isRecording: boolean;
  onTimeChange: (time: number) => void;
  onPlayPause: () => void;
  onRecordKeyframe: () => void;
  onSave: () => void;
}

const KeyframeManager: React.FC<KeyframeManagerProps> = ({
  currentTime,
  duration,
  keyframes,
  isPlaying,
  isRecording,
  onTimeChange,
  onPlayPause,
  onRecordKeyframe,
  onSave,
}) => {
  return (
    <div className="h-[5vh]">
      <Timeline
        currentTime={currentTime}
        duration={duration}
        keyframes={keyframes.map(kf => kf.time)}
        isPlaying={isPlaying}
        onTimeChange={onTimeChange}
        onPlayPause={onPlayPause}
        onRecordKeyframe={onRecordKeyframe}
        onSave={onSave}
        isRecording={isRecording}
      />
    </div>
  );
};

export default KeyframeManager;