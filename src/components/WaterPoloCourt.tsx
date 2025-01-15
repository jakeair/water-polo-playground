import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Player from './Player';

const WaterPoloCourt: React.FC = () => {
  const courtRef = React.useRef<HTMLDivElement>(null);
  const topGoalNetRef = useRef<HTMLDivElement>(null);
  const bottomGoalNetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 1000, height: 1400 });

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

  const animateNet = (netRef: React.RefObject<HTMLDivElement>) => {
    if (netRef.current) {
      gsap.to(netRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        transformOrigin: 'center'
      });
    }
  };

  return (
    <div 
      ref={courtRef}
      className="court"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Goals with nets */}
      <div className="goal goal-top">
        <div ref={topGoalNetRef} className="goal-net" />
      </div>
      <div className="goal goal-bottom">
        <div ref={bottomGoalNetRef} className="goal-net" />
      </div>

      {/* Lines */}
      <div className="line two-meter-line" style={{ top: '8%' }}></div>
      <div className="line five-meter-line" style={{ top: '20%' }}></div>
      <div className="line six-meter-line" style={{ top: '24%' }}></div>
      <div className="line two-meter-line" style={{ bottom: '8%' }}></div>
      <div className="line five-meter-line" style={{ bottom: '20%' }}></div>
      <div className="line six-meter-line" style={{ bottom: '24%' }}></div>
      <div className="line halfway-line" style={{ top: '50%' }}></div>

      {/* Team 1 Players (Top) */}
      <Player team={1} number={1} initialX={dimensions.width / 2 - 25} initialY={50} isGoalie />
      <Player team={1} number={2} initialX={dimensions.width * 0.2} initialY={dimensions.height * 0.2} />
      <Player team={1} number={3} initialX={dimensions.width * 0.4} initialY={dimensions.height * 0.2} />
      <Player team={1} number={4} initialX={dimensions.width * 0.6} initialY={dimensions.height * 0.2} />
      <Player team={1} number={5} initialX={dimensions.width * 0.3} initialY={dimensions.height * 0.3} />
      <Player team={1} number={6} initialX={dimensions.width * 0.5} initialY={dimensions.height * 0.3} />
      <Player team={1} number={7} initialX={dimensions.width * 0.7} initialY={dimensions.height * 0.3} />

      {/* Team 2 Players (Bottom) */}
      <Player team={2} number={1} initialX={dimensions.width / 2 - 25} initialY={dimensions.height - 100} isGoalie />
      <Player team={2} number={2} initialX={dimensions.width * 0.2} initialY={dimensions.height * 0.7} />
      <Player team={2} number={3} initialX={dimensions.width * 0.4} initialY={dimensions.height * 0.7} />
      <Player team={2} number={4} initialX={dimensions.width * 0.6} initialY={dimensions.height * 0.7} />
      <Player team={2} number={5} initialX={dimensions.width * 0.3} initialY={dimensions.height * 0.8} />
      <Player team={2} number={6} initialX={dimensions.width * 0.5} initialY={dimensions.height * 0.8} />
      <Player team={2} number={7} initialX={dimensions.width * 0.7} initialY={dimensions.height * 0.8} />
    </div>
  );
};

export default WaterPoloCourt;