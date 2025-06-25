import { useCallback, useState } from 'react';
import useLoadDetectionModel from './useLoadDetectionModel';
import { type Tensor } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import type { DetectionResult } from '../types';
import { drawDetections } from '../utils/detectionHelper';
import { toast } from 'sonner';

export const useFoodDetection = (
  onDetectionSuccess: (foods: Set<string>) => void,
  onStopScanning: () => void,
) => {
  const { yoloModel, yoloLabels } = useLoadDetectionModel();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState('');

  const runDetection = useCallback(
    async (
      tensor: Tensor,
      sourceElement: HTMLVideoElement | HTMLImageElement,
      canvasRef: React.RefObject<HTMLCanvasElement>,
    ) => {
      if (!yoloModel || !yoloLabels) {
        setDetectionError('Model atau label belum siap.');
        return;
      }
      setIsDetecting(true);
      setDetectionError('');
      try {
        const predictions = await yoloModel.executeAsync(tensor);
        const outputTensor = Array.isArray(predictions)
          ? predictions[0]
          : predictions;
        if (!outputTensor) throw new Error('Model output is invalid.');

        const modelWidth = 640;
        const modelHeight = 640;
        const proposals = (await tf
          .tidy(() => outputTensor.squeeze([0]).transpose())
          .array()) as number[][];

        const boxes_data: number[][] = [];
        const scores_data: number[] = [];
        const classes_data: number[] = [];
        const scoreThreshold = 0.5;

        proposals.forEach((proposal) => {
          const classScores = proposal.slice(4);
          const bestClassScore = Math.max(...classScores);
          if (bestClassScore > scoreThreshold) {
            const bestClassIndex = classScores.indexOf(bestClassScore);
            const [x_c, y_c, w, h] = proposal.slice(0, 4);
            // Use non-null assertion operator instead of type assertion
            boxes_data.push([
              y_c! - h! / 2,
              x_c! - w! / 2,
              y_c! + h! / 2,
              x_c! + w! / 2,
            ]);
            scores_data.push(bestClassScore);
            classes_data.push(bestClassIndex);
          }
        });

        const newDetectedFoodsInFrame = new Set<string>();
        const currentDetections: DetectionResult[] = [];

        if (boxes_data.length > 0) {
          const boxesTensor = tf.tensor2d(boxes_data);
          const nmsIndicesTensor = await tf.image.nonMaxSuppressionAsync(
            boxesTensor,
            scores_data,
            20,
            0.45,
            0.5,
          );
          const keptIndices = await nmsIndicesTensor.array();

          keptIndices.forEach((i) => {
            const classIndex = classes_data[i];
            // Check if classIndex is valid and within the bounds of yoloLabels array
            const label =
              classIndex !== undefined &&
              classIndex >= 0 &&
              classIndex < yoloLabels.length
                ? yoloLabels[classIndex]
                : undefined;

            if (label) {
              newDetectedFoodsInFrame.add(label);
              // Fix: Ensure boxes_data[i] exists and is an array before destructuring
              const boxData = boxes_data[i];
              if (boxData && boxData.length >= 4) {
                const [y1_norm, x1_norm, y2_norm, x2_norm] = boxData;
                if (
                  y1_norm !== undefined &&
                  x1_norm !== undefined &&
                  y2_norm !== undefined &&
                  x2_norm !== undefined
                ) {
                  const box: [number, number, number, number] = [
                    x1_norm * modelWidth,
                    y1_norm * modelHeight,
                    (x2_norm - x1_norm) * modelWidth,
                    (y2_norm - y1_norm) * modelHeight,
                  ];
                  const score = scores_data[i] ?? 0;
                  currentDetections.push({ box, label, score });
                }
              }
            }
          });
          tf.dispose([boxesTensor, nmsIndicesTensor, outputTensor]);
        }

        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          const targetWidth =
            sourceElement instanceof HTMLVideoElement
              ? sourceElement.videoWidth
              : sourceElement.width;
          const targetHeight =
            sourceElement instanceof HTMLVideoElement
              ? sourceElement.videoHeight
              : sourceElement.height;
          if (ctx) {
            canvasRef.current.width = targetWidth;
            canvasRef.current.height = targetHeight;
            drawDetections(ctx, currentDetections, targetWidth, targetHeight);
            if (newDetectedFoodsInFrame.size === 0) {
              setTimeout(
                () => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height),
                500,
              );
            }
          }
        }

        if (newDetectedFoodsInFrame.size > 0) {
          onDetectionSuccess(newDetectedFoodsInFrame);
          onStopScanning();
          toast.success('Makanan berhasil terdeteksi!');
        }
      } catch (e: unknown) {
        const error =
          e instanceof Error
            ? e
            : new Error('An unknown error occurred during detection.');
        setDetectionError(`Gagal melakukan deteksi: ${error.message}`);
        onStopScanning();
      } finally {
        tf.dispose(tensor);
        setIsDetecting(false);
      }
    },
    [yoloModel, yoloLabels, onDetectionSuccess, onStopScanning],
  );

  return { runDetection, isDetecting, detectionError };
};
