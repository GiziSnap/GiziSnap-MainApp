'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import RegisterUserFormInner from './RegisterUserFormInner';
import { registerUserFormSchema } from '../../schemas';
import { Button } from '@/components/ui/button';
import type { RegisterUserFormSchema } from '../../types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useRegister } from '../../api/useRegister';

export const RegisterUserForm = () => {
  const router = useRouter();

  const form = useForm<RegisterUserFormSchema>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      username: '',
      email_address: '',
      password: '',
      // confirmPassword: '',
    },
  });

  const { mutate: register, isPending: isRegisterPending } = useRegister({
    onSuccess: () => {
      toast.success('Pendaftaran berhasil');
      router.push('/auth/login');
      return Promise.resolve();
    },
    onError: () => {
      toast.error('Pendaftaran gagal');
      return Promise.resolve();
    },
  });

  const onSubmit = async (values: RegisterUserFormSchema) => register(values);

  return (
    <Form {...form}>
      <RegisterUserFormInner
        formId="create-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <Button
        type="submit"
        form="create-user-form"
        disabled={
          !form.formState.isValid ||
          form.formState.isSubmitting ||
          isRegisterPending
        }
        className="w-full transform rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRegisterPending ? 'Loading...' : 'Daftar'}
      </Button>
    </Form>
  );
};
