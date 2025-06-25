import type { ApiResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import mlAxios from '@/lib/axios/mlAxios';
import type { FoodData } from '../types';

export const useGetFoodNutrition = ({ foodName }: { foodName: string }) => {
  return useQuery<ApiResponse<FoodData>, Error>({
    queryKey: ['get-food-nutrition', foodName],
    queryFn: async () => {
      if (!foodName) {
        throw new Error('foodName is required');
      }
      const response = await mlAxios.get<ApiResponse<FoodData>>(
        `/api/food-nutrition/${foodName}`,
      );
      return response.data;
    },
    enabled: !!foodName,
    staleTime: 60000,
  });
};
