import { useQuery } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import mlAxios from '@/lib/axios/mlAxios';

export const useGetFoodName = () => {
  return useQuery<ApiResponse<string[]>, Error>({
    queryKey: ['foodNames'],
    queryFn: async () => {
      try {
        const response = await mlAxios.get<ApiResponse<string[]>>(
          '/api/sheet-data/scrap_food_name_list',
        );
        return response.data;
      } catch (error) {
        console.error('Failed to fetch food names:', error);
        throw new Error('Unable to fetch food names. Please try again later.');
      }
    },
    staleTime: 60000,
  });
};
