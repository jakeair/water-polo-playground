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
import { VideoRecorder } from '@/utils/videoRecorder';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
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
    toast.success('Keyframe recorded');
  };

  const captureFrame = async () => {
    if (!containerRef.current) return;

    try {
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();

      // Create a temporary canvas for recording if it doesn't exist
      if (!recordingCanvasRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        recordingCanvasRef.current = canvas;
      }

      // Use html2canvas to capture the entire container
      const canvas = await html2canvas(container, {
        backgroundColor: '#f0f9ff',
        logging: false,
        scale: window.devicePixelRatio || 1,
        useCORS: true,
        allowTaint: true,
        width,
        height,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('.fixed-court-container') as HTMLElement;
          if (clonedContainer) {
            clonedContainer.style.position = 'relative';
          }
        }
      });

      const ctx = recordingCanvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear and draw the new frame
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(canvas, 0, 0);

      // Request the next frame
      animationFrameId.current = requestAnimationFrame(captureFrame);
    } catch (error) {
      console.error('Error capturing frame:', error);
      toast.error('Error recording video');
      stopRecording();
    }
  };

  const startRecording = async () => {
    if (!containerRef.current || !keyframes.length) {
      toast.error('No keyframes to record');
      return;
    }
    
    try {
      setCurrentTime(0);
      setIsPlaying(false);
      
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();

      // Create and setup recording canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      recordingCanvasRef.current = canvas;

      await new Promise(resolve => setTimeout(resolve, 100));

      // Start capturing frames
      await captureFrame();

      // Configure stream with high quality settings
      const stream = canvas.captureStream(120); // 120fps for smoother motion
      
      // Configure recorder with high quality settings
      const options = {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 8000000, // 8 Mbps for high quality
      };

      await recorderRef.current.startRecording(stream, options);
      setIsRecording(true);
      setIsPlaying(true);
      toast.success('Started recording');
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Failed to start recording. Please try a different browser or device.');
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

  const handleSaveClick = () => {
    if (!keyframes.length) {
      toast.error('Add some keyframes before saving');
      return;
    }
    startRecording();
    setIsSaveDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
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
      
      <Timeline
        currentTime={currentTime}
        duration={ANIMATION_DURATION}
        keyframes={keyframes.map(kf => kf.time)}
        isPlaying={isPlaying}
        onTimeChange={setCurrentTime}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onRecordKeyframe={handleRecordKeyframe}
        onSave={handleSaveClick}
        isRecording={isRecording}
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
        onVideoRecorded={stopRecording}
      />
    </div>
  );
};

export default WaterPoloCourt;
