import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Player from './Player';
import Timeline from './Timeline';
import Ball from './Ball';
import Court from './Court';
import DrawingCanvas from './DrawingCanvas';
import { useAnimation } from '@/hooks/useAnimation';
import { useKeyframes } from '@/hooks/useKeyframes';
import SavePlayDialog from './SavePlayDialog';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { VideoRecorder } from '@/utils/videoRecorder';

interface WaterPoloCourtProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
  isDrawing: boolean;
  onDrawingChange: (isDrawing: boolean) => void;
  strokeColor: string;
  onStrokeColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  drawingTool: 'pen' | 'dottedLine' | 'eraser';
  onDrawingToolChange: (tool: 'pen' | 'dottedLine' | 'eraser') => void;
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
  const lastInterpolatedPositions = useRef<{[key: string]: { x: number; y: number }}>({});
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const ANIMATION_DURATION = 2500;
  const courtRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<VideoRecorder>(new VideoRecorder());
  const [isRecording, setIsRecording] = useState(false);
  const recordingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();

  const { keyframes, recordKeyframe, interpolatePositions } = useKeyframes(currentTime);

  const updatePlayerPosition = (playerId: string, position: { x: number; y: number }) => {
    setPlayerPositions(prev => ({
      ...prev,
      [playerId]: position
    }));
  };

  const captureFrame = async () => {
    if (!courtRef.current || !recordingCanvasRef.current) return;

    try {
      const courtElement = courtRef.current.querySelector('.court');
      if (!courtElement) {
        throw new Error('Court element not found');
      }

      const originalBackground = (courtElement as HTMLElement).style.background;
      (courtElement as HTMLElement).style.background = '#f0f9ff';

      const canvas = await html2canvas(courtElement as HTMLElement, {
        backgroundColor: '#f0f9ff',
        logging: false,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        removeContainer: true,
        width: courtElement.clientWidth,
        height: courtElement.clientHeight,
      });

      (courtElement as HTMLElement).style.background = originalBackground;
      
      const ctx = recordingCanvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, recordingCanvasRef.current.width, recordingCanvasRef.current.height);
      
      const scale = Math.min(
        recordingCanvasRef.current.width / canvas.width,
        recordingCanvasRef.current.height / canvas.height
      );
      
      const x = (recordingCanvasRef.current.width - canvas.width * scale) / 2;
      const y = (recordingCanvasRef.current.height - canvas.height * scale) / 2;
      
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(0, 0, recordingCanvasRef.current.width, recordingCanvasRef.current.height);
      
      ctx.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);
      
      animationFrameId.current = requestAnimationFrame(captureFrame);
    } catch (error) {
      console.error('Error capturing frame:', error);
      toast.error('Error recording video');
    }
  };

  const startRecording = async () => {
    try {
      setCurrentTime(0);
      setIsPlaying(false);
      
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      recordingCanvasRef.current = canvas;

      await new Promise(resolve => setTimeout(resolve, 100));

      await captureFrame();
      const stream = canvas.captureStream(60);
      await recorderRef.current.startRecording(stream);
      setIsRecording(true);
      
      setIsPlaying(true);
      toast.success('Started recording');
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Failed to start recording');
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    try {
      const videoBlob = await recorderRef.current.stopRecording();
      setIsRecording(false);
      toast.success('Recording completed');
      return videoBlob;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      toast.error('Failed to stop recording');
      setIsRecording(false);
    }
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

  const handleRecordKeyframe = () => {
    recordKeyframe(playerPositions, ballPosition);
  };

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

  useEffect(() => {
    if (!isPlaying && isRecording) {
      stopRecording();
    }
  }, [isPlaying, isRecording]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative min-h-0" ref={courtRef}>
        <Court>
          <DrawingCanvas
            isDrawing={isDrawing}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            drawingTool={drawingTool}
          />
          <Ball position={ballPosition} onPositionChange={setBallPosition} />
          
          <Player team={1} number="G" initialX={50} initialY={5} isGoalie onPositionChange={(pos) => updatePlayerPosition('1G', pos)} id="player-1G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={1} number={1} initialX={20} initialY={20} onPositionChange={(pos) => updatePlayerPosition('11', pos)} id="player-11" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={2} initialX={40} initialY={20} onPositionChange={(pos) => updatePlayerPosition('12', pos)} id="player-12" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={3} initialX={60} initialY={20} onPositionChange={(pos) => updatePlayerPosition('13', pos)} id="player-13" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={4} initialX={30} initialY={30} onPositionChange={(pos) => updatePlayerPosition('14', pos)} id="player-14" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={5} initialX={50} initialY={30} onPositionChange={(pos) => updatePlayerPosition('15', pos)} id="player-15" style={{ backgroundColor: team1Color }} />
          <Player team={1} number={6} initialX={70} initialY={30} onPositionChange={(pos) => updatePlayerPosition('16', pos)} id="player-16" style={{ backgroundColor: team1Color }} />

          <Player team={2} number="G" initialX={50} initialY={95} isGoalie onPositionChange={(pos) => updatePlayerPosition('2G', pos)} id="player-2G" style={{ backgroundColor: 'var(--goalie-color)' }} />
          <Player team={2} number={1} initialX={20} initialY={70} onPositionChange={(pos) => updatePlayerPosition('21', pos)} id="player-21" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={2} initialX={40} initialY={70} onPositionChange={(pos) => updatePlayerPosition('22', pos)} id="player-22" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={3} initialX={60} initialY={70} onPositionChange={(pos) => updatePlayerPosition('23', pos)} id="player-23" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={4} initialX={30} initialY={80} onPositionChange={(pos) => updatePlayerPosition('24', pos)} id="player-24" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={5} initialX={50} initialY={80} onPositionChange={(pos) => updatePlayerPosition('25', pos)} id="player-25" style={{ backgroundColor: team2Color }} />
          <Player team={2} number={6} initialX={70} initialY={80} onPositionChange={(pos) => updatePlayerPosition('26', pos)} id="player-26" style={{ backgroundColor: team2Color }} />
        </Court>
      </div>
      
      <div className="h-[5vh]" />
      
      <div className="flex items-center gap-4 px-4 mb-4">
        <Timeline
          currentTime={currentTime}
          duration={ANIMATION_DURATION}
          isPlaying={isPlaying}
          onTimeChange={setCurrentTime}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          keyframes={keyframes}
          onRecordKeyframe={handleRecordKeyframe}
        />
      </div>

      <SavePlayDialog
        isOpen={isSaveDialogOpen}
        onClose={() => {
          setIsSaveDialogOpen(false);
          setIsRecording(false);
          setIsPlaying(false);
        }}
        canvasData={playerPositions}
        keyframesData={keyframes}
        onVideoRecorded={stopRecording}
      />
    </div>
  );
};

export default WaterPoloCourt;