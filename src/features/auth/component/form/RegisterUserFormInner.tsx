import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { type RegisterUserFormSchema } from '../../types';
import { Eye, EyeOff } from 'lucide-react';

type CreateUserFormInnerProps = {
  formId: string;
  onSubmit: () => void;
};

export default function RegisterUserFormInner({
  formId,
  onSubmit,
}: CreateUserFormInnerProps) {
  const form = useFormContext<RegisterUserFormSchema>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className='mb-4 space-y-4'
    >
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder='Buat username Anda'
                {...field}
                className='border-green-300 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='email_address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type='email'
                placeholder='Masukkan email Anda'
                {...field}
                className='border-green-300 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kata Sandi</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword.password ? 'text' : 'password'}
                  placeholder='Buat kata sandi Anda'
                  {...field}
                  className='border-green-300 pr-10 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-green-600'
                  aria-label={
                    showPassword.password
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                >
                  {showPassword.password ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage className='mt-1 text-xs text-red-500' />
          </FormItem>
        )}
      />
    </form>
  );
}
