import authAxios from '@/lib/axios/authAxios';
import type { ApiProps, ApiResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import type { UserSchema } from '../types';
import { useSession } from 'next-auth/react';

export const useGetUsersData = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery<ApiResponse<UserSchema>, Error>({
    queryKey: ['get-users-data', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is required');

      const response = await authAxios.get<ApiResponse<UserSchema>>('/users', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      return response.data;
    },
    enabled: !!accessToken,
    staleTime: 60000,
  });
};
