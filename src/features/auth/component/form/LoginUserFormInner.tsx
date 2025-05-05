import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { type LoginUserFormSchema } from '../../types';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type LoginUserFormInnerProps = {
  formId: string;
  onSubmit: () => void;
};

export const LoginUserFormInner = ({
  formId,
  onSubmit,
}: LoginUserFormInnerProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useFormContext<LoginUserFormSchema>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="mb-4 space-y-4"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                {...field}
                className="border-green-300 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kata Sandi</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi Anda"
                  {...field}
                  className="border-green-300 pr-10 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-green-600"
                  aria-label={
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
