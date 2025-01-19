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
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import { VideoRecorder } from '@/utils/videoRecorder';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

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

  const handleRecordKeyframe = () => {
    recordKeyframe(playerPositions, ballPosition);
    toast.success('Keyframe recorded');
  };

  const captureFrame = async () => {
    if (!courtRef.current || !recordingCanvasRef.current) return;

    try {
      // Find the court element within the container
      const courtElement = courtRef.current.querySelector('.court');
      if (!courtElement) {
        throw new Error('Court element not found');
      }

      // Set background color and remove any gradients temporarily
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

      // Restore original background
      (courtElement as HTMLElement).style.background = originalBackground;
      
      const ctx = recordingCanvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear previous frame
      ctx.clearRect(0, 0, recordingCanvasRef.current.width, recordingCanvasRef.current.height);
      
      // Calculate scaling while maintaining aspect ratio
      const scale = Math.min(
        recordingCanvasRef.current.width / canvas.width,
        recordingCanvasRef.current.height / canvas.height
      );
      
      const x = (recordingCanvasRef.current.width - canvas.width * scale) / 2;
      const y = (recordingCanvasRef.current.height - canvas.height * scale) / 2;
      
      // Draw white background
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(0, 0, recordingCanvasRef.current.width, recordingCanvasRef.current.height);
      
      // Draw the captured frame
      ctx.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);
      
      animationFrameId.current = requestAnimationFrame(captureFrame);
    } catch (error) {
      console.error('Error capturing frame:', error);
      toast.error('Error recording video');
    }
  };

  const startRecording = async () => {
    if (!courtRef.current || !keyframes.length) {
      toast.error('No keyframes to record');
      return;
    }
    
    try {
      // Reset timeline to start
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Create recording canvas with fixed dimensions
      const canvas = document.createElement('canvas');
      canvas.width = 1920; // Increased width for better quality
      canvas.height = 1080; // 16:9 aspect ratio
      recordingCanvasRef.current = canvas;

      // Wait a brief moment for the timeline to reset
      await new Promise(resolve => setTimeout(resolve, 100));

      // Start capture and recording
      await captureFrame();
      const stream = canvas.captureStream(60); // Increased FPS
      await recorderRef.current.startRecording(stream);
      setIsRecording(true);
      
      // Start playback
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
        <Button
          onClick={handleSaveClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          disabled={isRecording}
        >
          <Save className="w-4 h-4" />
          Save Play
        </Button>
        
        <Timeline
          currentTime={currentTime}
          duration={ANIMATION_DURATION}
          keyframes={keyframes.map(kf => kf.time)}
          isPlaying={isPlaying}
          onTimeChange={setCurrentTime}
          onPlayPause={() => setIsPlaying(!isPlaying)}
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