import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import type { UpdateUserFormSchema } from '../../types';
import { updateUserFormSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { UpdateUserFormInner } from './UpdateUserFormInner';
import { useUserData } from '@/features/dashboard/utils/useUserData';
import { useUpdateUser } from '../../hooks/useUpdate';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
type UpdateUserFormProps = {
  profileId: string;
};

export const UpdateUserForm = ({ profileId }: UpdateUserFormProps) => {
  const { userInfo: data, userAvatar, refetch } = useUserData();

  const router = useRouter();

  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onChange',
    defaultValues: {
      email_address: data.email_address ?? '',
      username: data.username ?? '',
      password: '',
      avatar: null,
    },
  });

  const { mutate: updateUser, isPending: isUpdatePending } = useUpdateUser({
    onSuccess: async () => {
      toast.success('Berhasil Update Profil');

      await refetch();

      void router.push('/dashboard');
    },
    onError: async () => {
      toast.error('Gagal Update Profil');
    },
  });

  const onSubmit = async (values: UpdateUserFormSchema) => {
    const submissionData: Record<string, unknown> = { ...values };

    if (
      !submissionData.password ||
      (submissionData.password as string).trim() === ''
    ) {
      delete submissionData.password;
    }

    const formData = new FormData();

    for (const key in submissionData) {
      const value = submissionData[key];
      if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
          formData.append(key, value);
        } else if (value instanceof Blob) {
          formData.append(key, value);
        } else {
          throw new Error(`Invalid value type for key ${key}: ${typeof value}`);
        }
      }
    }

    updateUser(
      formData as unknown as {
        username: string;
        email_address: string;
        id?: string;
        avatar?: File | null;
        password?: string;
      },
    );
  };

  return (
    <Form {...form}>
      <UpdateUserFormInner
        formId='update-user-form'
        onSubmit={onSubmit}
        initialAvatar={
          userAvatar instanceof File
            ? URL.createObjectURL(userAvatar)
            : (userAvatar ?? null)
        }
      />
      <div className='flex justify-end'>
        <Button
          type='submit'
          form='update-user-form'
          className='transform rounded-lg bg-green-600 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-700 active:scale-[0.98]'
        >
          {isUpdatePending ? (
            <span className='flex items-center'>
              Memperbarui <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            </span>
          ) : (
            'Perbarui Profil'
          )}
        </Button>
      </div>
    </Form>
  );
};
