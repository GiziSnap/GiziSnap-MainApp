'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginUserFormInner } from './LoginUserFormInner';
import { loginUserFormSchema } from '../../schemas';
import { type LoginUserFormSchema } from '../../types';
import { useLogin } from '../../api/useLogin';

export const LoginUserForm = () => {
  const router = useRouter();

  const form = useForm<LoginUserFormSchema>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: login, isPending: isLoginPending } = useLogin({
    onSuccess: async () => {
      toast.success('Login berhasil');
      router.push('/dashboard');
    },
    onError: async () => {
      toast.error('Login gagal karena username atau kata sandi salah.');
    },
  });

  const onSubmit = async (values: LoginUserFormSchema) => login(values);

  return (
    <Form {...form}>
      <LoginUserFormInner
        formId='login-user-form'
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <Button
        form='login-user-form'
        type='submit'
        disabled={isLoginPending}
        className='w-full transform rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-700 active:scale-[0.98]'
      >
        {isLoginPending ? 'Memproses...' : 'Masuk'}
      </Button>
    </Form>
  );
};
