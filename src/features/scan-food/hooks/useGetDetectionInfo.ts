import { useQuery } from '@tanstack/react-query';
import type { DetectionInfo } from '../types';
import mlAxios from '@/lib/axios/mlAxios';

export const useGetDetectionInfo = () => {
  return useQuery<DetectionInfo, Error>({
    queryKey: ['get-detection-info'],
    queryFn: async () => {
      const response = await mlAxios.get<DetectionInfo>(
        `/api/models/detection/info`,
      );
      const data = response.data;
      if (data.labelJsonPath === 'N/A') {
        data.labelJsonPath = null;
      }
      if (data.modelJsonPath === 'N/A') {
        data.modelJsonPath = null;
      }
      return data;
    },
    staleTime: Infinity,
  });
};
