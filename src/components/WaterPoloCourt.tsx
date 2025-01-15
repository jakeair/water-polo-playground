import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Player from './Player';
import { toast } from 'sonner';

interface PlayerPosition {
  x: number;
  y: number;
}

interface WaterPoloCourtProps {
  currentTime: number;
  isPlaying: boolean;
  keyframes: number[];
}

const WaterPoloCourt: React.FC<WaterPoloCourtProps> = ({
  currentTime,
  isPlaying,
  keyframes
}) => {
  const courtRef = useRef<HTMLDivElement>(null);
  const topGoalNetRef = useRef<HTMLDivElement>(null);
  const bottomGoalNetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1400 });
  
  // Store current positions of all players
  const [playerPositions, setPlayerPositions] = useState<{[key: string]: PlayerPosition}>({});
  const lastInterpolatedPositions = useRef<{[key: string]: PlayerPosition}>({});

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

  const updatePlayerPosition = (playerId: string, position: PlayerPosition) => {
    setPlayerPositions(prev => ({
      ...prev,
      [playerId]: position
    }));
  };

  useEffect(() => {
    if (playerPositions && Object.keys(playerPositions).length > 0) {
      // Use GSAP to animate the position changes
      Object.entries(playerPositions).forEach(([playerId, position]) => {
        if (position) {
          gsap.to(`#player-${playerId}`, {
            left: `${position.x}%`,
            top: `${position.y}%`,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      });
      lastInterpolatedPositions.current = playerPositions;
    }
  }, [currentTime, playerPositions]);

  return (
    <div className="space-y-6 bg-black/20 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
      <div 
        ref={courtRef}
        className="court"
        style={{ width: dimensions.width, height: dimensions.height }}
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

        {/* Team 1 Players (Top) */}
        <Player team={1} number="G" initialX={50} initialY={5} isGoalie onPositionChange={(pos) => updatePlayerPosition('1G', pos)} id="player-1G" />
        <Player team={1} number={1} initialX={20} initialY={20} onPositionChange={(pos) => updatePlayerPosition('11', pos)} id="player-11" />
        <Player team={1} number={2} initialX={40} initialY={20} onPositionChange={(pos) => updatePlayerPosition('12', pos)} id="player-12" />
        <Player team={1} number={3} initialX={60} initialY={20} onPositionChange={(pos) => updatePlayerPosition('13', pos)} id="player-13" />
        <Player team={1} number={4} initialX={30} initialY={30} onPositionChange={(pos) => updatePlayerPosition('14', pos)} id="player-14" />
        <Player team={1} number={5} initialX={50} initialY={30} onPositionChange={(pos) => updatePlayerPosition('15', pos)} id="player-15" />
        <Player team={1} number={6} initialX={70} initialY={30} onPositionChange={(pos) => updatePlayerPosition('16', pos)} id="player-16" />

        {/* Team 2 Players (Bottom) */}
        <Player team={2} number="G" initialX={50} initialY={95} isGoalie onPositionChange={(pos) => updatePlayerPosition('2G', pos)} id="player-2G" />
        <Player team={2} number={1} initialX={20} initialY={70} onPositionChange={(pos) => updatePlayerPosition('21', pos)} id="player-21" />
        <Player team={2} number={2} initialX={40} initialY={70} onPositionChange={(pos) => updatePlayerPosition('22', pos)} id="player-22" />
        <Player team={2} number={3} initialX={60} initialY={70} onPositionChange={(pos) => updatePlayerPosition('23', pos)} id="player-23" />
        <Player team={2} number={4} initialX={30} initialY={80} onPositionChange={(pos) => updatePlayerPosition('24', pos)} id="player-24" />
        <Player team={2} number={5} initialX={50} initialY={80} onPositionChange={(pos) => updatePlayerPosition('25', pos)} id="player-25" />
        <Player team={2} number={6} initialX={70} initialY={80} onPositionChange={(pos) => updatePlayerPosition('26', pos)} id="player-26" />
      </div>
    </div>
  );
};

export default WaterPoloCourt;