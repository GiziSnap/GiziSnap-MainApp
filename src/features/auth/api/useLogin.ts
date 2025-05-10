import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';  // Import signIn dari NextAuth
import authAxios from "@/lib/auth/axios/authAxios";
import type { ApiResponse } from "@/types/api";
import type { UserResponse } from "../types/user";
import type { ApiProps } from "@/types/api";
import type { LoginUserFormSchema } from "../types";

export const useLogin = ({ onMutate, onSuccess, onError }: ApiProps) => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (values: LoginUserFormSchema) => {
            const response = await authAxios.post<ApiResponse<UserResponse>>('/session', values);
            console.log(response.data); 

            const result = await signIn('credentials', {
                redirect: false,
                username: values.username,
                password: values.password,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return result;
        },
        onMutate,  
        onSuccess, 
        onError,   
    });
};
