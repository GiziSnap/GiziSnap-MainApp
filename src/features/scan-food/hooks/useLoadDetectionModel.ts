import { type GraphModel } from '@tensorflow/tfjs';
import { useGetDetectionInfo } from './useGetDetectionInfo';
import { useQuery } from '@tanstack/react-query';
import mlAxios from '@/lib/axios/mlAxios';
import type { DetectionLabels } from '../types';
import { env } from '@/env';
import * as tf from '@tensorflow/tfjs';

// Hook untuk memuat model dan label
const useLoadDetectionModel = () => {
  const {
    data: detectionInfo,
    isLoading: isInfoLoading,
    error: infoError,
  } = useGetDetectionInfo();

  const {
    data: yoloLabels,
    isLoading: areLabelsLoading,
    error: labelsError,
  } = useQuery<string[], Error>({
    queryKey: ['get-detection-labels', detectionInfo?.labelJsonPath],
    queryFn: async () => {
      if (!detectionInfo?.labelJsonPath)
        throw new Error('Label path is required.');
      const url = new URL(
        detectionInfo.labelJsonPath,
        env.NEXT_PUBLIC_ML_API_URL,
      ).href;
      const { data } = await mlAxios.get<DetectionLabels>(url);
      if (!data?.labels || !Array.isArray(data.labels))
        throw new Error('Invalid label.json format.');
      return data.labels;
    },
    enabled: !!detectionInfo?.labelJsonPath,
    staleTime: Infinity,
  });

  const {
    data: yoloModel,
    isLoading: isModelLoading,
    error: modelError,
  } = useQuery<GraphModel, Error>({
    queryKey: ['load-yolo-model', detectionInfo?.modelJsonPath],
    queryFn: async () => {
      if (!detectionInfo?.modelJsonPath)
        throw new Error('Model path is required.');
      const url = new URL(
        detectionInfo.modelJsonPath,
        env.NEXT_PUBLIC_ML_API_URL,
      ).href;
      await tf.setBackend('webgl');
      await tf.ready();
      const model = await tf.loadGraphModel(url);
      console.log('Model loaded successfully.');
      return model;
    },
    enabled: !!detectionInfo?.modelJsonPath,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    yoloModel,
    yoloLabels,
    isLoading: isInfoLoading || areLabelsLoading || isModelLoading,
    error: infoError ?? labelsError ?? modelError,
  };
};

export default useLoadDetectionModel;
