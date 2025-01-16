import { useState } from 'react';
import { toast } from 'sonner';

export interface KeyframeData {
  time: number;
  positions: {
    [key: string]: PlayerPosition;
  };
  ballPosition?: {
    x: number;
    y: number;
  };
}

interface PlayerPosition {
  x: number;
  y: number;
}

export const useKeyframes = (currentTime: number) => {
  const [keyframes, setKeyframes] = useState<KeyframeData[]>([]);

  const recordKeyframe = (positions: { [key: string]: PlayerPosition }, ballPosition: { x: number; y: number }) => {
    const newKeyframe: KeyframeData = {
      time: currentTime,
      positions,
      ballPosition
    };

    setKeyframes(prev => {
      const filtered = prev.filter(kf => kf.time !== currentTime);
      return [...filtered, newKeyframe].sort((a, b) => a.time - b.time);
    });

    toast.success('Keyframe recorded', {
      description: `Saved positions at ${currentTime/100} seconds`
    });
  };

  const interpolatePositions = (time: number) => {
    const prevKeyframe = [...keyframes]
      .reverse()
      .find(kf => kf.time <= time);
    const nextKeyframe = keyframes
      .find(kf => kf.time > time);

    if (!prevKeyframe && !nextKeyframe) return null;
    if (!prevKeyframe) return nextKeyframe;
    if (!nextKeyframe) return prevKeyframe;

    const factor = (time - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);

    const interpolated: {[key: string]: PlayerPosition} = {};
    Object.keys(prevKeyframe.positions).forEach(playerId => {
      const prev = prevKeyframe.positions[playerId];
      const next = nextKeyframe.positions[playerId];
      
      interpolated[playerId] = {
        x: prev.x + (next.x - prev.x) * factor,
        y: prev.y + (next.y - prev.y) * factor
      };
    });

    return {
      positions: interpolated,
      ballPosition: prevKeyframe.ballPosition && nextKeyframe.ballPosition ? {
        x: prevKeyframe.ballPosition.x + (nextKeyframe.ballPosition.x - prevKeyframe.ballPosition.x) * factor,
        y: prevKeyframe.ballPosition.y + (nextKeyframe.ballPosition.y - prevKeyframe.ballPosition.y) * factor
      } : prevKeyframe.ballPosition || nextKeyframe.ballPosition
    };
  };

  return {
    keyframes,
    recordKeyframe,
    interpolatePositions
  };
};