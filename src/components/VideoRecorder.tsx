import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { VideoRecorder as Recorder } from '@/utils/videoRecorder';

interface VideoRecorderProps {
  containerRef: React.RefObject<HTMLDivElement>;
  currentTime: number;
  duration: number;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  onRecordingComplete: (blob: Blob) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({
  containerRef,
  currentTime,
  duration,
  isRecording,
  setIsRecording,
  setIsPlaying,
  onRecordingComplete,
}) => {
  const recorderRef = useRef<Recorder>(new Recorder());
  const recordingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();

  const captureFrame = async () => {
    if (!containerRef.current) return;

    try {
      const container = containerRef.current;
      const canvas = await html2canvas(container, {
        backgroundColor: '#f0f9ff',
        logging: false,
        scale: window.devicePixelRatio || 1,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('.fixed-court-container') as HTMLElement;
          if (clonedContainer) {
            clonedContainer.style.position = 'relative';
          }
        }
      });

      if (!recordingCanvasRef.current) return;
      const ctx = recordingCanvasRef.current.getContext('2d');
      if (!ctx) return;

      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(canvas, 0, 0);

      if (currentTime < duration && isRecording) {
        animationFrameId.current = requestAnimationFrame(captureFrame);
      } else if (isRecording) {
        await stopRecording();
      }
    } catch (error) {
      console.error('Error capturing frame:', error);
      toast.error('Error recording video');
      stopRecording();
    }
  };

  const startRecording = async () => {
    if (!containerRef.current) {
      toast.error('Recording container not found');
      return;
    }
    
    try {
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      recordingCanvasRef.current = canvas;

      await captureFrame();

      const stream = canvas.captureStream(60);
      const options = {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: 8000000,
      };

      await recorderRef.current.startRecording(stream, options);
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
      setIsPlaying(false);
      toast.success('Recording completed');
      if (videoBlob) {
        onRecordingComplete(videoBlob);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      toast.error('Failed to stop recording');
      setIsRecording(false);
    }
  };

  return null; // This is a logic-only component
};

export default VideoRecorder;