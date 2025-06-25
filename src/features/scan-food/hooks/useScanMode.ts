import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

/**
 * Hook untuk mengelola mode scanner (kamera vs upload),
 * state kesiapan kamera, URL pratinjau, dan referensi DOM.
 */
export const useScanMode = () => {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cleanup = useCallback(() => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setIsCameraReady(false);
  }, [previewUrls]);

  useEffect(() => {
    if (mode !== 'camera') return;

    let stream: MediaStream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (err) {
        toast.error('Tidak bisa mengakses kamera.');
      }
    };

    void startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [mode]);

  const handleModeChange = (newMode: 'camera' | 'upload') => {
    if (mode === newMode) return;
    cleanup();
    setMode(newMode);
  };

  return {
    mode,
    previewUrls,
    isCameraReady,
    videoRef,
    canvasRef,
    setPreviewUrls,
    handleModeChange,
    cleanup,
  };
};

export default useScanMode;
