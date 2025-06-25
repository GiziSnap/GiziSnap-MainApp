import type { DetectionResult } from '../types';

export const drawDetections = (
  ctx: CanvasRenderingContext2D,
  detections: DetectionResult[],
  targetWidth: number,
  targetHeight: number,
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = '16px sans-serif';
  ctx.textBaseline = 'top';

  detections.forEach(({ box, label, score }) => {
    const [x, y, width, height] = box;
    const scaledX = (x / 640) * targetWidth;
    const scaledY = (y / 640) * targetHeight;
    const scaledWidth = (width / 640) * targetWidth;
    const scaledHeight = (height / 640) * targetHeight;
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 4;
    ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
    const text = `${label} (${Math.round(score * 100)}%)`;
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = '#10B981';
    const textHeight = 20;
    ctx.fillRect(scaledX, scaledY - textHeight, textWidth + 8, textHeight);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, scaledX + 4, scaledY - textHeight + 2);
  });
};

export const findPotentialMatches = (
  detectedLabel: string,
  allFoodNames: string[] | undefined,
): string[] => {
  if (!detectedLabel || !allFoodNames) return [];
  const lowerCaseLabel = detectedLabel.toLowerCase().replace(/_/g, ' ');

  const potentialMatches = allFoodNames.filter((name) =>
    name.toLowerCase().includes(lowerCaseLabel),
  );

  const uniqueMatches = [...new Set(potentialMatches)];

  uniqueMatches.sort((a, b) => a.length - b.length);
  return uniqueMatches;
};
