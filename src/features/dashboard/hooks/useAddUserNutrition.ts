import type { ApiResponse, ApiProps } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import type { UserFoodhistorySchema } from '../types';
import authAxios from '@/lib/axios/authAxios';
import { useSession } from 'next-auth/react';

export const useAddUserFood = ({ onMutate, onSuccess, onError }: ApiProps) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useMutation({
    mutationKey: ['add-user-food', accessToken],
    mutationFn: async (values: UserFoodhistorySchema) => {
      if (!accessToken) throw new Error('Access token is required');

      const response = await authAxios.post<ApiResponse<UserFoodhistorySchema>>(
        'foods',
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        },
      );
      return response.data;
    },
    onMutate,
    onSuccess,
    onError,
  });
};
