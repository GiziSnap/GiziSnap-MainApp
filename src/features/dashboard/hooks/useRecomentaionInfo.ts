import { useQuery } from '@tanstack/react-query';
import type { RecommendationInfo } from '../types';
import mlAxios from '@/lib/axios/mlAxios';

export const useGetRecommendationInfo = () => {
  return useQuery<RecommendationInfo, Error>({
    queryKey: ['get-recommendation-info'],
    queryFn: async () =>
      (await mlAxios.get<RecommendationInfo>(`/api/models/recommendation/info`))
        .data,
    staleTime: Infinity, // Informasi model jarang berubah
  });
};
