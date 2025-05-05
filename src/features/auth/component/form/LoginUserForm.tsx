'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoginUserFormInner } from './LoginUserFormInner';
import type { LoginUserFormSchema } from '../../types';
import { loginUserFormSchema } from '../../schemas';

export const LoginUserForm = () => {
  const form = useForm<LoginUserFormSchema>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginUserFormSchema) {
    console.log('Login:', values);
  }

  return (
    <Form {...form}>
      <LoginUserFormInner
        formId="login-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
      />

      <Button
        form="login-user-form"
        variant="default"
        type="submit"
        disabled={!form.formState.isValid}
        className="p w-full transform rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-700 active:scale-[0.98]"
      >
        Masuk
      </Button>
    </Form>
  );
};
