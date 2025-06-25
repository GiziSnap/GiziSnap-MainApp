import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import * as tf from '@tensorflow/tfjs';
import { useFoodDetection } from '../hooks/useFoodDetection';

/**
 * Hook untuk mengelola logika deteksi makanan secara real-time dari kamera
 * atau dari file yang diunggah.
 */
export const useFoodDetector = (onDetection: (foods: Set<string>) => void) => {
  const [isRealtimeScanning, setIsRealtimeScanning] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const scanTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const stopScanning = useCallback(() => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    if (scanTimeoutIdRef.current) clearTimeout(scanTimeoutIdRef.current);
    intervalIdRef.current = null;
    scanTimeoutIdRef.current = null;
    setIsRealtimeScanning(false);
  }, []);

  const { runDetection, isDetecting, detectionError } = useFoodDetection(
    onDetection,
    stopScanning,
  );

  const startRealtimeScan = (
    videoRef: React.RefObject<HTMLVideoElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) => {
    if (isRealtimeScanning || !videoRef.current) return;

    const performDetection = () => {
      if (!videoRef.current || videoRef.current.readyState < 3) return;
      const tensor = tf.tidy(() =>
        tf.browser
          .fromPixels(videoRef.current)
          .resizeBilinear([640, 640])
          .div(255.0)
          .expandDims(0),
      );
      void runDetection(tensor, videoRef.current, canvasRef);
    };

    setIsRealtimeScanning(true);
    scanTimeoutIdRef.current = setTimeout(() => {
      stopScanning();
      toast.info('Tidak ada makanan terdeteksi. Silakan coba lagi.');
    }, 10000);
    intervalIdRef.current = setInterval(performDetection, 700);
  };

  const detectFromFile = (
    file: File,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) => {
    if (!file) return;

    const newPreviewUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = newPreviewUrl;
    img.onload = () => {
      const tensor = tf.tidy(() =>
        tf.browser
          .fromPixels(img)
          .resizeBilinear([640, 640])
          .div(255.0)
          .expandDims(0),
      );
      void runDetection(tensor, img, canvasRef);
    };
    return newPreviewUrl;
  };

  return {
    isRealtimeScanning,
    isDetecting,
    detectionError,
    startRealtimeScan,
    stopScanning,
    detectFromFile,
  };
};

export default useFoodDetector;
