export async function drawFramePreview(
  canvas: HTMLCanvasElement,
  options: {
    photoUrl?: string;
    orientation: 'Portrait' | 'Landscape';
    finish: string;
  }
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = '#F0EBE3';
  ctx.fillRect(0, 0, w, h);

  const isPortrait = options.orientation === 'Portrait';
  const frameW = isPortrait ? w * 0.55 : w * 0.7;
  const frameH = isPortrait ? h * 0.7 : h * 0.55;
  const fx = (w - frameW) / 2;
  const fy = (h - frameH) / 2;

  // Outer frame (maroon)
  ctx.fillStyle = '#7B1D2E';
  ctx.fillRect(fx - 12, fy - 12, frameW + 24, frameH + 24);

  // Inner mat
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(fx - 4, fy - 4, frameW + 8, frameH + 8);

  const photoArea = { x: fx, y: fy, w: frameW, h: frameH };

  if (options.photoUrl) {
    try {
      const img = await loadImage(options.photoUrl);
      drawCoverImage(ctx, img, photoArea.x, photoArea.y, photoArea.w, photoArea.h);
      if (options.finish === 'Glossy') {
        const grad = ctx.createLinearGradient(photoArea.x, photoArea.y, photoArea.x + photoArea.w, photoArea.y);
        grad.addColorStop(0, 'rgba(255,255,255,0.15)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(photoArea.x, photoArea.y, photoArea.w, photoArea.h);
      }
    } catch {
      drawPlaceholder(ctx, photoArea);
    }
  } else {
    drawPlaceholder(ctx, photoArea);
  }
}

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  area: { x: number; y: number; w: number; h: number }
): void {
  ctx.fillStyle = '#E8E0D5';
  ctx.fillRect(area.x, area.y, area.w, area.h);
  ctx.strokeStyle = '#C9972B';
  ctx.setLineDash([8, 8]);
  ctx.strokeRect(area.x + 16, area.y + 16, area.w - 32, area.h - 32);
  ctx.setLineDash([]);
  ctx.fillStyle = '#6B6B6B';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Your photo here', area.x + area.w / 2, area.y + area.h / 2);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  const imgRatio = img.width / img.height;
  const areaRatio = w / h;
  let sw: number, sh: number, sx: number, sy: number;
  if (imgRatio > areaRatio) {
    sh = img.height;
    sw = sh * areaRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / areaRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
}
