'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import type { UpdateUserFormSchema } from '../../types';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { toast } from 'sonner';
import { UploadButton } from '../../../../utils/Uploadthing';

type UpdateUserFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateUserFormSchema) => void;
  initialAvatar: string | null;
};

export const UpdateUserFormInner = ({
  formId,
  onSubmit,
  initialAvatar,
}: UpdateUserFormInnerProps) => {
  const form = useFormContext<UpdateUserFormSchema>();
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialAvatar,
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setPreviewImage(initialAvatar);
  }, [initialAvatar]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('avatar', URL.createObjectURL(file));
      // form.setValue('avatar', file);
    } else {
      setPreviewImage(null);
      form.setValue('avatar', undefined);
    }
  };

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mt-4 text-lg font-semibold text-gray-800'>
              Username
            </FormLabel>
            <FormControl>
              <Input
                type='text'
                placeholder='Masukkan Username Anda'
                {...field}
                className='w-full rounded-md border border-gray-300 shadow-sm transition focus:ring-2 focus:ring-green-500'
              />
            </FormControl>
            <FormMessage className='text-sm text-red-600' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='email_address'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mt-4 text-lg font-semibold text-gray-800'>
              Email
            </FormLabel>
            <FormControl>
              <Input
                type='email'
                placeholder='Masukkan Email Anda'
                {...field}
                className='w-full rounded-md border border-gray-300 shadow-sm transition focus:ring-2 focus:ring-green-500'
              />
            </FormControl>
            <FormMessage className='text-sm text-red-600' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='mt-4 text-lg font-semibold text-gray-800'>
              Kata Sandi
            </FormLabel>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Masukkan kata sandi baru (opsional)'
                  {...field}
                  className='w-full rounded-md border border-gray-300 pr-12 shadow-sm transition focus:ring-2 focus:ring-green-500'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center px-4 text-green-600 transition hover:text-green-800'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage className='text-sm text-red-600' />
          </FormItem>
        )}
      />

      {/* Bagian Unggah Foto Profil */}
      <FormItem className='mt-4'>
        <FormLabel className='text-lg font-semibold text-gray-800'>
          Foto Profil
        </FormLabel>
        <div className='mt-2 flex items-center gap-4'>
          {previewImage && (
            <Image
              src={previewImage}
              alt='Preview Foto Profil'
              width={100}
              height={100}
              className='rounded-full border-2 border-green-300 object-cover shadow-md'
            />
          )}
          <div className='flex flex-col gap-2'>
            <UploadButton
              className='flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                if (res && res.length > 0 && res[0]?.serverData) {
                  const url = (
                    res[0].serverData as { uploadedBy: string; fileUrl: string }
                  ).fileUrl;
                  toast.success('Foto profil berhasil diunggah.');
                  setPreviewImage(url);
                  form.setValue('avatar', url, { shouldValidate: true });
                }
              }}
            />
            {previewImage && (
              <Button
                type='button'
                variant='destructive'
                size='sm'
                onClick={() => {
                  setPreviewImage(null);
                  form.setValue('avatar', null);
                }}
              >
                Hapus Foto
              </Button>
            )}
          </div>
        </div>
        <FormMessage className='text-sm text-red-600' />
      </FormItem>
      {/* Input untuk Upload Gambar Profil */}
      {/* <FormField
        control={form.control}
        name='avatar'
        render={({ field }) => (
          <FormItem className='mt-4 space-y-2'>
            <FormLabel className='text-lg font-semibold text-gray-800'>
              Foto Profil
            </FormLabel>
            <FormControl>
              <div className='flex flex-col'>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    handleImageChange(e);
                    field.onChange(e.target.files?.[0] ?? null);
                  }}
                />
                {previewImage && (
                  <div className='mt-2 flex items-center gap-4'>
                    <Image
                      src={previewImage}
                      alt='Preview Foto Profil'
                      width={100}
                      height={100}
                      className='rounded-full border-2 border-green-300 shadow-md'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => {
                        setPreviewImage(null);
                        form.setValue('avatar', null);
                      }}
                      className='bg-red-500 transition duration-200 hover:bg-red-600'
                    >
                      Hapus
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className='text-sm text-red-600' />
          </FormItem>
        )}
      /> */}
    </form>
  );
};
