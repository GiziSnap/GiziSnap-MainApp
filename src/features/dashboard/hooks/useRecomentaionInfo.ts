import { useQuery } from '@tanstack/react-query';
import type { RecommendationInfo } from '../types';
import mlAxios from '@/lib/axios/mlAxios';

export const useGetRecommendationInfo = () => {
  return useQuery<RecommendationInfo, Error>({
    queryKey: ['get-recommendation-info'],
    queryFn: async () => {
      const response = await mlAxios.get<RecommendationInfo>(
        `/api/models/recommendation/info`,
      );
      const data = response.data;
      if (data.labelJsonPath === 'N/A') {
        data.labelJsonPath = null;
      }
      if (data.modelJsonPath === 'N/A') {
        data.modelJsonPath = null;
      }
      if (data.metadataPath === 'N/A') {
        data.metadataPath = null;
      }
      return data;
    },
    staleTime: Infinity, // Informasi model jarang berubah
  });
};
