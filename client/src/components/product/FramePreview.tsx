import { useFramePreview } from '../../hooks/useFramePreview';

interface FramePreviewProps {
  photoUrl?: string;
  orientation: 'Portrait' | 'Landscape';
  finish: string;
  className?: string;
}

export function FramePreview({ photoUrl, orientation, finish, className }: FramePreviewProps) {
  const { canvasRef } = useFramePreview({
    photoUrl,
    orientation,
    finish,
    width: 600,
    height: 500,
  });

  return (
    <canvas
      ref={canvasRef}
      className={className ?? 'mx-auto max-w-full rounded-card shadow-card'}
      aria-label="Frame preview"
    />
  );
}
