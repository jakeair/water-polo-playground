import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Player from './Player';
import Timeline from './Timeline';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import Ball from './Ball';
import Court from './Court';
import { useAnimation } from '@/hooks/useAnimation';
import { useKeyframes } from '@/hooks/useKeyframes';

interface PlayerPosition {
  x: number;
  y: number;
}

interface WaterPoloCourtProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
  isDrawing: boolean;
  isErasing: boolean;
  strokeColor: string;
  strokeWidth: number;
}

const WaterPoloCourt: React.FC<WaterPoloCourtProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange,
  isDrawing: propIsDrawing,
  isErasing: propIsErasing,
  strokeColor: propStrokeColor,
  strokeWidth: propStrokeWidth
}) => {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1400 });
  const [localIsDrawing, setLocalIsDrawing] = useState(propIsDrawing);
  const [localIsErasing, setLocalIsErasing] = useState(propIsErasing);
  const [localStrokeColor, setLocalStrokeColor] = useState(propStrokeColor);
  const [localStrokeWidth, setLocalStrokeWidth] = useState(propStrokeWidth);
  const [playerPositions, setPlayerPositions] = useState<{[key: string]: PlayerPosition}>({});
  const lastInterpolatedPositions = React.useRef<{[key: string]: PlayerPosition}>({});
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const ANIMATION_DURATION = 2500;

  const { keyframes, recordKeyframe, interpolatePositions } = useKeyframes(currentTime);

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = window.innerWidth - 40;
      const width = Math.min(containerWidth, 1000);
      const height = (width * 7) / 5;
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--team1-color', team1Color);
    document.documentElement.style.setProperty('--team2-color', team2Color);
  }, [team1Color, team2Color]);

  const updatePlayerPosition = (playerId: string, position: PlayerPosition) => {
    setPlayerPositions(prev => ({
      ...prev,
      [playerId]: position
    }));
  };

  const handleRecordKeyframe = () => {
    recordKeyframe(playerPositions, ballPosition);
  };

  const animate = () => {
    if (!isPlaying) return;

    setCurrentTime(prev => {
      const next = prev + 1;
      if (next >= ANIMATION_DURATION) {
        setIsPlaying(false);
        return prev;
      }
      return next;
    });
  };

  useAnimation(isPlaying, animate);

  useEffect(() => {
    const interpolated = interpolatePositions(currentTime);
    if (interpolated) {
      const { positions, ballPosition: newBallPosition } = interpolated;
      
      Object.entries(positions).forEach(([playerId, position]) => {
        const lastPos = lastInterpolatedPositions.current[playerId];
        if (lastPos && (lastPos.x !== position.x || lastPos.y !== position.y)) {
          gsap.to(`#player-${playerId}`, {
            left: `${position.x}%`,
            top: `${position.y}%`,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      });
      
      lastInterpolatedPositions.current = positions;
      setPlayerPositions(positions);
      
      if (newBallPosition) {
        setBallPosition(newBallPosition);
      }
    }
  }, [currentTime]);

  return (
    <div className="space-y-12 bg-black/20 backdrop-blur-sm px-4 sm:px-8 md:px-12 lg:px-16 py-8 rounded-3xl shadow-2xl border border-white/10 w-full overflow-hidden">
      <Timeline
        currentTime={currentTime}
        duration={ANIMATION_DURATION}
        keyframes={keyframes.map(kf => kf.time)}
        isPlaying={isPlaying}
        onTimeChange={setCurrentTime}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onRecordKeyframe={handleRecordKeyframe}
      />
      
      <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
        <Court width={dimensions.width} height={dimensions.height}>
          <DrawingCanvas 
            isDrawing={localIsDrawing}
            isErasing={localIsErasing}
            width={dimensions.width}
            height={dimensions.height}
            strokeColor={localStrokeColor}
            strokeWidth={localStrokeWidth}
          />
          
          <Ball position={ballPosition} onPositionChange={setBallPosition} />

          <Player team={1} number="G" initialX={50} initialY={5} isGoalie onPositionChange={(pos) => updatePlayerPosition('1G', pos)} id="player-1G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={1} number={1} initialX={20} initialY={20} onPositionChange={(pos) => updatePlayerPosition('11', pos)} id="player-11" />
          <Player team={1} number={2} initialX={40} initialY={20} onPositionChange={(pos) => updatePlayerPosition('12', pos)} id="player-12" />
          <Player team={1} number={3} initialX={60} initialY={20} onPositionChange={(pos) => updatePlayerPosition('13', pos)} id="player-13" />
          <Player team={1} number={4} initialX={30} initialY={30} onPositionChange={(pos) => updatePlayerPosition('14', pos)} id="player-14" />
          <Player team={1} number={5} initialX={50} initialY={30} onPositionChange={(pos) => updatePlayerPosition('15', pos)} id="player-15" />
          <Player team={1} number={6} initialX={70} initialY={30} onPositionChange={(pos) => updatePlayerPosition('16', pos)} id="player-16" />

          <Player team={2} number="G" initialX={50} initialY={95} isGoalie onPositionChange={(pos) => updatePlayerPosition('2G', pos)} id="player-2G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={2} number={1} initialX={20} initialY={70} onPositionChange={(pos) => updatePlayerPosition('21', pos)} id="player-21" />
          <Player team={2} number={2} initialX={40} initialY={70} onPositionChange={(pos) => updatePlayerPosition('22', pos)} id="player-22" />
          <Player team={2} number={3} initialX={60} initialY={70} onPositionChange={(pos) => updatePlayerPosition('23', pos)} id="player-23" />
          <Player team={2} number={4} initialX={30} initialY={80} onPositionChange={(pos) => updatePlayerPosition('24', pos)} id="player-24" />
          <Player team={2} number={5} initialX={50} initialY={80} onPositionChange={(pos) => updatePlayerPosition('25', pos)} id="player-25" />
          <Player team={2} number={6} initialX={70} initialY={80} onPositionChange={(pos) => updatePlayerPosition('26', pos)} id="player-26" />
        </Court>
      </div>
    </div>
  );
};

export default WaterPoloCourt;