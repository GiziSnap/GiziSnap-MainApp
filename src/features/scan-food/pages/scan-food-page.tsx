'use client';

import { useState, useCallback } from 'react';

import { PageContainer, SectionContainer } from '@/components/layouts';
import Scanner from '../component/Scanner';
import ScanResults, { type FoodQueryResult } from '../component/ScanResult';

import useLoadDetectionModel from '../hooks/useLoadDetectionModel';
import useFoodList from '../hooks/useFoodList';
import useScanMode from '../hooks/useScanMode';
import useFoodDetector from '../hooks/useFoodDetector';
import useScanResults from '../hooks/useScanResult';

export const ScanFoodPage = () => {
  const { isLoading: isModelLoading, error: modelError } =
    useLoadDetectionModel();
  const { allFoodNames, isLoading: isFoodListLoading } = useFoodList();

  const {
    mode,
    previewUrls,
    isCameraReady,
    videoRef,
    canvasRef,
    setPreviewUrls,
    handleModeChange,
    cleanup: cleanupUI,
  } = useScanMode();

  const [detectedFoods, setDetectedFoods] = useState<Set<string>>(new Set());

  const onNewDetection = useCallback((newlyDetected: Set<string>) => {
    setDetectedFoods(
      (prev) => new Set([...Array.from(prev), ...Array.from(newlyDetected)]),
    );
  }, []);

  const {
    isRealtimeScanning,
    isDetecting,
    detectionError,
    startRealtimeScan,
    stopScanning,
    detectFromFile,
  } = useFoodDetector(onNewDetection);

  const {
    userSelections,
    setUserSelections,
    potentialMatchesMap,
    foodQueries,
    isSubmitting,
    handleSubmit,
  } = useScanResults(
    detectedFoods,
    allFoodNames?.filter((name): name is string => name !== undefined) || [],
  );

  const isAppLoading = isFoodListLoading || isModelLoading;
  const errorMessage = modelError?.message ?? detectionError;

  const handleFileChange = (file: File) => {
    const newPreviewUrl = detectFromFile(
      file,
      canvasRef as React.RefObject<HTMLCanvasElement>,
    );
    if (newPreviewUrl) {
      setPreviewUrls((prev) => [...prev, newPreviewUrl]);
    }
  };

  const handleScanButtonClick = () => {
    if (videoRef.current && canvasRef.current) {
      startRealtimeScan(
        videoRef as React.RefObject<HTMLVideoElement>,
        canvasRef as React.RefObject<HTMLCanvasElement>,
      );
    }
  };

  const clearAll = useCallback(() => {
    cleanupUI();
    stopScanning();
    setDetectedFoods(new Set());
    setUserSelections(new Map());
  }, [cleanupUI, stopScanning, setUserSelections]);

  const handleRemoveFood = (label: string) => {
    setDetectedFoods((prev) => {
      const newSet = new Set(prev);
      newSet.delete(label);
      return newSet;
    });
    setUserSelections((prev) => {
      const newMap = new Map(prev);
      newMap.delete(label);
      return newMap;
    });
  };

  const handleModeChangeAndClear = (newMode: 'camera' | 'upload') => {
    handleModeChange(newMode);
    clearAll();
  };

  return (
    <PageContainer title='Pindai Makanan' withFooter withHeader isDashboard>
      <SectionContainer
        padded
        container
        className='min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900'
      >
        <div className='flex w-full flex-col items-center'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            Pindai Makanan Anda
          </h1>
          <p className='mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300'>
            Arahkan kamera atau unggah gambar untuk analisis gizi instan.
          </p>
        </div>
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-5'>
          <div className='lg:col-span-3'>
            <Scanner
              mode={mode}
              isCameraReady={isCameraReady}
              isSubmitting={isSubmitting}
              isRealtimeScanning={isRealtimeScanning}
              isAppLoading={isAppLoading}
              isDetecting={isDetecting}
              videoRef={videoRef}
              canvasRef={canvasRef}
              previewUrls={previewUrls}
              onModeChange={handleModeChangeAndClear}
              onScanButtonClick={handleScanButtonClick}
              onFileChange={handleFileChange}
            />
          </div>
          <div className='lg:col-span-2'>
            <ScanResults
              detectedFoods={detectedFoods}
              userSelections={userSelections}
              potentialMatchesMap={potentialMatchesMap}
              foodQueries={foodQueries as unknown as FoodQueryResult[]}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage || ''}
              onSelectionChange={(label, name) =>
                setUserSelections((prev) => new Map(prev).set(label, name))
              }
              onRemoveFood={handleRemoveFood}
              onSubmit={handleSubmit}
              onClearAll={clearAll}
            />
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};

export default ScanFoodPage;
