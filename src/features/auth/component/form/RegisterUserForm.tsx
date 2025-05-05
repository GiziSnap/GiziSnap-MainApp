'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import RegisterUserFormInner from './RegisterUserFormInner';
import { registerUserFormSchema } from '../../schemas';
import { Button } from '@/components/ui/button';
import type { RegisterUserFormSchema } from '../../types';

export const RegisterUserForm = () => {
  const form = useForm<RegisterUserFormSchema>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: RegisterUserFormSchema) => {
    console.log('Register:', values);
  };

  return (
    <Form {...form}>
      <RegisterUserFormInner
        formId="create-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
      />
      <Button
        type="submit"
        form="create-user-form"
        disabled={!form.formState.isValid}
        className="w-full transform rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Daftar
      </Button>
    </Form>
  );
};
