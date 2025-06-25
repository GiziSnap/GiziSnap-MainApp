import type { ApiProps } from '@/types/api';
import type { RegisterUserFormSchema } from '../types';
import { useMutation } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/api';
import type { UserResponse } from '../types/user';
import authAxios from '@/lib/axios/authAxios';

export const useRegister = ({ onMutate, onSuccess, onError }: ApiProps) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (values: RegisterUserFormSchema) => {
      const response = await authAxios.post<ApiResponse<UserResponse>>(
        '/registers',
        values,
      );
      return response.data;
    },
    onMutate,
    onSuccess,
    onError,
  });
};
