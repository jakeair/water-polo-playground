import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Player from './Player';
import Timeline from './Timeline';
import { toast } from 'sonner';

interface PlayerPosition {
  x: number;
  y: number;
}

interface KeyframeData {
  time: number;
  positions: {
    [key: string]: PlayerPosition;
  };
}

interface WaterPoloCourtProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
}

const WaterPoloCourt: React.FC<WaterPoloCourtProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange
}) => {
  const courtRef = useRef<HTMLDivElement>(null);
  const topGoalNetRef = useRef<HTMLDivElement>(null);
  const bottomGoalNetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1400 });
  
  const [playerPositions, setPlayerPositions] = useState<{[key: string]: PlayerPosition}>({});
  const lastInterpolatedPositions = useRef<{[key: string]: PlayerPosition}>({});
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const ballRef = useRef<HTMLDivElement>(null);
  const isDraggingBall = useRef(false);
  const ballStartPos = useRef({ x: 0, y: 0 });
  const initialBallPos = useRef({ x: 0, y: 0 });

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyframes, setKeyframes] = useState<KeyframeData[]>([]);
  const animationRef = useRef<number>();
  const ANIMATION_DURATION = 2500;

  useEffect(() => {
    const updateDimensions = () => {
      if (courtRef.current) {
        const containerWidth = courtRef.current.parentElement?.clientWidth || 1000;
        const width = Math.min(containerWidth - 40, 1000);
        const height = (width * 7) / 5;
        setDimensions({ width, height });
      }
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

  const recordKeyframe = () => {
    const newKeyframe: KeyframeData = {
      time: currentTime,
      positions: { ...playerPositions }
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

    if (!prevKeyframe && !nextKeyframe) return;
    if (!prevKeyframe) return nextKeyframe?.positions;
    if (!nextKeyframe) return prevKeyframe.positions;

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

    return interpolated;
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

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const interpolated = interpolatePositions(currentTime);
    if (interpolated) {
      Object.entries(interpolated).forEach(([playerId, position]) => {
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
      lastInterpolatedPositions.current = interpolated;
      setPlayerPositions(interpolated);
    }
  }, [currentTime]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBallMouseDown = (e: React.MouseEvent) => {
    if (ballRef.current) {
      isDraggingBall.current = true;
      ballStartPos.current = {
        x: e.clientX,
        y: e.clientY
      };
      initialBallPos.current = {
        x: ballPosition.x,
        y: ballPosition.y
      };
      e.preventDefault();
    }
  };

  const handleBallMouseMove = (e: MouseEvent) => {
    if (isDraggingBall.current && ballRef.current) {
      const courtRect = ballRef.current.parentElement?.getBoundingClientRect();
      if (courtRect) {
        const deltaX = (e.clientX - ballStartPos.current.x) / courtRect.width * 100;
        const deltaY = (e.clientY - ballStartPos.current.y) / courtRect.height * 100;
        
        const newX = Math.max(0, Math.min(100, initialBallPos.current.x + deltaX));
        const newY = Math.max(0, Math.min(100, initialBallPos.current.y + deltaY));
        
        setBallPosition({ x: newX, y: newY });
      }
    }
  };

  const handleBallMouseUp = () => {
    isDraggingBall.current = false;
  };

  useEffect(() => {
    if (isDraggingBall.current) {
      window.addEventListener('mousemove', handleBallMouseMove);
      window.addEventListener('mouseup', handleBallMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleBallMouseMove);
      window.removeEventListener('mouseup', handleBallMouseUp);
    };
  }, [isDraggingBall.current]);

  return (
    <div className="space-y-12 bg-black/20 backdrop-blur-sm p-16 rounded-3xl shadow-2xl border border-white/10">
      <div 
        ref={courtRef}
        className="court"
        style={{ 
          width: dimensions.width, 
          height: dimensions.height,
          margin: '60px auto'  // Further increased margin
        }}
      >
        <div className="goal goal-top">
          <div ref={topGoalNetRef} className="goal-net" />
        </div>
        <div className="goal goal-bottom">
          <div ref={bottomGoalNetRef} className="goal-net" />
        </div>

        <div className="line two-meter-line" style={{ top: '8%' }}></div>
        <div className="line five-meter-line" style={{ top: '20%' }}></div>
        <div className="line six-meter-line" style={{ top: '24%' }}></div>
        <div className="line two-meter-line" style={{ bottom: '8%' }}></div>
        <div className="line five-meter-line" style={{ bottom: '20%' }}></div>
        <div className="line six-meter-line" style={{ bottom: '24%' }}></div>
        <div className="line halfway-line" style={{ top: '50%' }}></div>

        <div
          ref={ballRef}
          className="ball"
          style={{
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            cursor: isDraggingBall.current ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleBallMouseDown}
        />

        <Player team={1} number="G" initialX={50} initialY={5} isGoalie onPositionChange={(pos) => updatePlayerPosition('1G', pos)} id="player-1G" />
        <Player team={1} number={1} initialX={20} initialY={20} onPositionChange={(pos) => updatePlayerPosition('11', pos)} id="player-11" />
        <Player team={1} number={2} initialX={40} initialY={20} onPositionChange={(pos) => updatePlayerPosition('12', pos)} id="player-12" />
        <Player team={1} number={3} initialX={60} initialY={20} onPositionChange={(pos) => updatePlayerPosition('13', pos)} id="player-13" />
        <Player team={1} number={4} initialX={30} initialY={30} onPositionChange={(pos) => updatePlayerPosition('14', pos)} id="player-14" />
        <Player team={1} number={5} initialX={50} initialY={30} onPositionChange={(pos) => updatePlayerPosition('15', pos)} id="player-15" />
        <Player team={1} number={6} initialX={70} initialY={30} onPositionChange={(pos) => updatePlayerPosition('16', pos)} id="player-16" />

        <Player team={2} number="G" initialX={50} initialY={95} isGoalie onPositionChange={(pos) => updatePlayerPosition('2G', pos)} id="player-2G" />
        <Player team={2} number={1} initialX={20} initialY={70} onPositionChange={(pos) => updatePlayerPosition('21', pos)} id="player-21" />
        <Player team={2} number={2} initialX={40} initialY={70} onPositionChange={(pos) => updatePlayerPosition('22', pos)} id="player-22" />
        <Player team={2} number={3} initialX={60} initialY={70} onPositionChange={(pos) => updatePlayerPosition('23', pos)} id="player-23" />
        <Player team={2} number={4} initialX={30} initialY={80} onPositionChange={(pos) => updatePlayerPosition('24', pos)} id="player-24" />
        <Player team={2} number={5} initialX={50} initialY={80} onPositionChange={(pos) => updatePlayerPosition('25', pos)} id="player-25" />
        <Player team={2} number={6} initialX={70} initialY={80} onPositionChange={(pos) => updatePlayerPosition('26', pos)} id="player-26" />
      </div>

      <Timeline
        currentTime={currentTime}
        duration={ANIMATION_DURATION}
        keyframes={keyframes.map(kf => kf.time)}
        isPlaying={isPlaying}
        onTimeChange={setCurrentTime}
        onPlayPause={togglePlayPause}
        onRecordKeyframe={recordKeyframe}
      />
    </div>
  );
};

export default WaterPoloCourt;