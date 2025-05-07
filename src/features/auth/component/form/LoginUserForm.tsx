'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginUserFormInner } from './LoginUserFormInner';
import { loginUserFormSchema } from '../../schemas';
import { type LoginUserFormSchema } from '../../types';

export const LoginUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginUserFormSchema>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginUserFormSchema) => {
    setIsLoading(true);

    try {
      // Tambahkan logging
      console.log('Login attempt:', values);

      // Cek manual ke backend terlebih dahulu
      const backendResponse = await axios.post(
        `https://rails-service-gizisnap.onrender.com/session`,
        {
          username: values.username,
          password: values.password
        }
      );

      console.log('Backend Response:', backendResponse.data);

      // Jika backend berhasil, lakukan NextAuth signin
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      console.log('NextAuth Signin Result:', result);

      if (result?.error) {
        toast.error('Login Gagal', {
          description: result.error || 'username atau kata sandi salah.',
        });
      } else {
        toast.success('Login Berhasil', {
          description: 'Anda akan dialihkan ke dashboard.',
        });

        // Pastikan redirect bekerja
        router.push('/dashboard');
      }
    } catch (error) {
      // Tangkap dan log error dengan detail
      console.error('Login Error:', error);

      toast.error('Terjadi Kesalahan', {
        description: 'Gagal melakukan login. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <LoginUserFormInner
        formId="login-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <Button
        form="login-user-form"
        type="submit"
        disabled={!form.formState.isValid || isLoading}
        className="w-full transform rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-700 active:scale-[0.98]"
      >
        {isLoading ? 'Memproses...' : 'Masuk'}
      </Button>
    </Form>
  );
};