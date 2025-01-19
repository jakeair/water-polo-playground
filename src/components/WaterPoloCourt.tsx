import React, { useState, useRef } from 'react';
import Player from './Player';
import Ball from './Ball';
import Court from './Court';
import DrawingCanvas from './DrawingCanvas';
import { useAnimation } from '@/hooks/useAnimation';
import { useKeyframes } from '@/hooks/useKeyframes';
import SavePlayDialog from './SavePlayDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import VideoRecorder from './VideoRecorder';
import KeyframeManager from './KeyframeManager';

interface WaterPoloCourtProps {
  team1Color: string;
  team2Color: string;
  isDrawing: boolean;
  strokeColor: string;
  strokeWidth: number;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
}

const WaterPoloCourt: React.FC<WaterPoloCourtProps> = ({
  team1Color,
  team2Color,
  isDrawing,
  strokeColor,
  strokeWidth,
  drawingTool,
}) => {
  const [playerPositions, setPlayerPositions] = useState<{[key: string]: { x: number; y: number }}>({});
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const ANIMATION_DURATION = 2500;
  const containerRef = useRef<HTMLDivElement>(null);

  const { keyframes, recordKeyframe, interpolatePositions } = useKeyframes(currentTime);

  const updatePlayerPosition = (playerId: string, position: { x: number; y: number }) => {
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

  React.useEffect(() => {
    const interpolated = interpolatePositions(currentTime);
    if (interpolated) {
      const { positions, ballPosition: newBallPosition } = interpolated;
      setPlayerPositions(positions);
      if (newBallPosition) {
        setBallPosition(newBallPosition);
      }
    }
  }, [currentTime]);

  const handleSaveClick = () => {
    if (!keyframes.length) {
      toast.error('Add some keyframes before saving');
      return;
    }
    setCurrentTime(0);
    setIsSaveDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="flex-1 relative min-h-0">
        <Court>
          <DrawingCanvas
            isDrawing={isDrawing}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            drawingTool={drawingTool}
          />
          <Ball position={ballPosition} onPositionChange={setBallPosition} />
          
          {/* Team 1 Players */}
          <Player team={1} number="G" initialX={50} initialY={5} isGoalie onPositionChange={(pos) => updatePlayerPosition('1G', pos)} id="player-1G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={1} number={1} initialX={20} initialY={20} onPositionChange={(pos) => updatePlayerPosition('11', pos)} id="player-11" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={2} initialX={40} initialY={20} onPositionChange={(pos) => updatePlayerPosition('12', pos)} id="player-12" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={3} initialX={60} initialY={20} onPositionChange={(pos) => updatePlayerPosition('13', pos)} id="player-13" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={4} initialX={30} initialY={30} onPositionChange={(pos) => updatePlayerPosition('14', pos)} id="player-14" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={5} initialX={50} initialY={30} onPositionChange={(pos) => updatePlayerPosition('15', pos)} id="player-15" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={6} initialX={70} initialY={30} onPositionChange={(pos) => updatePlayerPosition('16', pos)} id="player-16" style={{ backgroundColor: team1Color }} />

          {/* Team 2 Players */}
          <Player team={2} number="G" initialX={50} initialY={95} isGoalie onPositionChange={(pos) => updatePlayerPosition('2G', pos)} id="player-2G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={2} number={1} initialX={20} initialY={70} onPositionChange={(pos) => updatePlayerPosition('21', pos)} id="player-21" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={2} initialX={40} initialY={70} onPositionChange={(pos) => updatePlayerPosition('22', pos)} id="player-22" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={3} initialX={60} initialY={70} onPositionChange={(pos) => updatePlayerPosition('23', pos)} id="player-23" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={4} initialX={30} initialY={80} onPositionChange={(pos) => updatePlayerPosition('24', pos)} id="player-24" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={5} initialX={50} initialY={80} onPositionChange={(pos) => updatePlayerPosition('25', pos)} id="player-25" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={6} initialX={70} initialY={80} onPositionChange={(pos) => updatePlayerPosition('26', pos)} id="player-26" style={{ backgroundColor: team2Color }} />
        </Court>
      </div>
      
      <KeyframeManager
        currentTime={currentTime}
        duration={ANIMATION_DURATION}
        keyframes={keyframes}
        isPlaying={isPlaying}
        isRecording={isRecording}
        onTimeChange={setCurrentTime}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onRecordKeyframe={handleRecordKeyframe}
        onSave={handleSaveClick}
      />

      <VideoRecorder
        containerRef={containerRef}
        currentTime={currentTime}
        duration={ANIMATION_DURATION}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setIsPlaying={setIsPlaying}
        onRecordingComplete={(blob) => {
          setIsSaveDialogOpen(true);
          setIsRecording(false);
        }}
      />

      <SavePlayDialog
        isOpen={isSaveDialogOpen}
        onClose={() => {
          setIsSaveDialogOpen(false);
          setIsRecording(false);
          setIsPlaying(false);
        }}
        canvasData={playerPositions}
        keyframesData={keyframes}
        onVideoRecorded={async () => {
          if (!isRecording) {
            setCurrentTime(0);
            setIsRecording(true);
            return new Promise((resolve) => {
              const checkRecording = setInterval(() => {
                if (!isRecording) {
                  clearInterval(checkRecording);
                  resolve(undefined);
                }
              }, 100);
            });
          }
          return undefined;
        }}
      />
    </div>
  );
};

export default WaterPoloCourt;