import { useRef, useEffect } from 'react';

export const useAnimation = (isPlaying: boolean, callback: () => void) => {
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(callback);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, callback]);

  return animationRef;
};