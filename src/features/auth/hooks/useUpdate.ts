import type { ApiProps } from '@/types/api';
import type { UpdateUserFormSchema } from '../types';
import { useMutation } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { UserResponse } from '../types/user';
import authAxios from '@/lib/axios/authAxios';
import { useSession } from 'next-auth/react';

export const useUpdateUser = ({ onMutate, onSuccess, onError }: ApiProps) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (values: UpdateUserFormSchema) => {
      const response = await authAxios.put<ApiResponse<UserResponse>>(
        '/users',
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
