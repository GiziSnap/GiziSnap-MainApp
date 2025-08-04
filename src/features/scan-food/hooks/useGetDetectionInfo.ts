import { useQuery } from '@tanstack/react-query';
import type { DetectionInfo } from '../types';
import mlAxios from '@/lib/axios/mlAxios';

export const useGetDetectionInfo = () => {
  return useQuery<DetectionInfo, Error>({
    queryKey: ['get-detection-info'],
    queryFn: async () =>
      (await mlAxios.get<DetectionInfo>(`/api/models/detection/info`)).data,
    staleTime: Infinity,
  });
};
