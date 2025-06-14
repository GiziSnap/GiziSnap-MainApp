import { Camera, Upload, ScanLine, Loader2, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRef, useState, useEffect } from 'react';
import LoadingOverlay from './LoadingOverlay';
import type { ScannerProps } from '../types';

const Scanner = ({
  mode,
  isCameraReady,
  isSubmitting,
  isRealtimeScanning,
  isAppLoading,
  isDetecting,
  videoRef,
  canvasRef,
  previewUrls,
  onModeChange,
  onScanButtonClick,
  onFileChange,
}: ScannerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
    e.target.value = '';
  };

  useEffect(() => {
    if (previewUrls.length > 0) {
      setMainPreview(previewUrls[previewUrls.length - 1] ?? null);
    } else {
      setMainPreview(null);
    }
  }, [previewUrls]);

  return (
    <Card className='w-full border-gray-200/80 shadow-lg'>
      <CardHeader>
        <div className='text-muted-foreground grid inline-flex h-10 w-full grid-cols-2 items-center justify-center gap-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800'>
          <button
            onClick={() => onModeChange('camera')}
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${mode === 'camera' ? 'bg-white text-emerald-600 shadow-sm dark:bg-gray-900' : 'hover:bg-gray-200/80 dark:hover:bg-gray-700/80'}`}
          >
            <Camera className='mr-2 h-4 w-4' />
            Kamera
          </button>
          <button
            onClick={() => onModeChange('upload')}
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${mode === 'upload' ? 'bg-white text-emerald-600 shadow-sm dark:bg-gray-900' : 'hover:bg-gray-200/80 dark:hover:bg-gray-700/80'}`}
          >
            <Upload className='mr-2 h-4 w-4' />
            Unggah
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800'>
          <LoadingOverlay
            isVisible={isAppLoading}
            message={
              isAppLoading
                ? 'Menyiapkan model...'
                : isCameraReady
                  ? ''
                  : 'Menyalakan kamera...'
            }
          />
          {mode === 'camera' && (
            <video
              ref={videoRef}
              className={`h-full w-full object-contain transition-opacity duration-300 ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
              playsInline
              muted
            />
          )}
          {/* MODIFIED: Menampilkan pratinjau utama atau placeholder */}
          {mode === 'upload' && (
            <>
              {mainPreview ? (
                <img
                  src={mainPreview}
                  alt='Pratinjau Unggahan'
                  className='h-full w-full object-contain'
                />
              ) : (
                <div className='p-4 text-center text-gray-500 dark:text-gray-400'>
                  <FileImage className='mx-auto h-24 w-24 text-gray-400' />
                  <p className='mt-2 text-sm'>
                    Klik tombol di bawah untuk memilih gambar.
                  </p>
                </div>
              )}
            </>
          )}
          <canvas
            ref={canvasRef}
            className='pointer-events-none absolute top-0 left-0 h-full w-full object-contain'
          />
        </div>

        {/* NEW: Galeri thumbnail untuk semua gambar yang diunggah */}
        {mode === 'upload' && previewUrls.length > 0 && (
          <div className='mt-2 flex space-x-2 overflow-x-auto rounded-md bg-gray-100 p-2 dark:bg-gray-800'>
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Pratinjau ${index + 1}`}
                onClick={() => setMainPreview(url)}
                className={`h-16 w-16 cursor-pointer rounded-md border-2 object-cover transition-all ${mainPreview === url ? 'border-emerald-500' : 'border-transparent hover:border-gray-400'}`}
              />
            ))}
          </div>
        )}

        {/* --- Tombol Aksi --- */}
        <div className='mt-4'>
          {mode === 'camera' && isCameraReady && (
            <Button
              onClick={onScanButtonClick}
              disabled={isRealtimeScanning || isSubmitting}
              className='w-full bg-emerald-500 py-6 text-lg text-white hover:bg-emerald-600'
            >
              {isRealtimeScanning ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Memindai...
                </>
              ) : (
                <>
                  <ScanLine className='mr-2 h-5 w-5' /> Pindai Sekarang
                </>
              )}
            </Button>
          )}
          {mode === 'upload' && (
            <>
              {/* MODIFIED: Logika tombol disesuaikan untuk beberapa file */}
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAppLoading || isSubmitting || isDetecting}
                className='w-full bg-emerald-500 py-6 text-lg text-white hover:bg-emerald-600'
              >
                {isDetecting ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />{' '}
                    Menganalisis...
                  </>
                ) : previewUrls.length > 0 ? (
                  <>
                    <FileImage className='mr-2 h-5 w-5' /> Tambah Gambar Lain
                  </>
                ) : (
                  <>
                    <FileImage className='mr-2 h-5 w-5' /> Pilih File dari
                    Galeri
                  </>
                )}
              </Button>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleInputChange}
                className='hidden'
                accept='image/*'
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Scanner;
