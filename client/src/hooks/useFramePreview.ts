import { useEffect, useRef, useCallback } from 'react';
import { drawFramePreview } from '../lib/canvas';

interface PreviewOptions {
  photoUrl?: string;
  orientation: 'Portrait' | 'Landscape';
  finish: string;
  width?: number;
  height?: number;
}

export function useFramePreview(options: PreviewOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = options.width ?? 600;
    canvas.height = options.height ?? 500;
    await drawFramePreview(canvas, {
      photoUrl: options.photoUrl,
      orientation: options.orientation,
      finish: options.finish,
    });
  }, [options.photoUrl, options.orientation, options.finish, options.width, options.height]);

  useEffect(() => {
    void render();
  }, [render]);

  return { canvasRef, render };
}
