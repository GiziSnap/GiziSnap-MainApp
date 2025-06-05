'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

type DialogActionsProps = {
  onCancel: () => void;
  onAdd: () => void;
  isPending: boolean;
  isDisabled: boolean;
};

const DialogActions = ({
  onCancel,
  onAdd,
  isPending,
  isDisabled,
}: DialogActionsProps) => {
  return (
    <div className='flex justify-end gap-2'>
      <Button variant='outline' onClick={onCancel}>
        Cancel
      </Button>
      <Button
        className='bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700'
        onClick={onAdd}
        disabled={isDisabled}
      >
        {isPending ? (
          <span className='flex items-center gap-2'>
            Loading <Circle className='h-4 w-4 animate-spin' />
          </span>
        ) : (
          'Tambahkan'
        )}
      </Button>
    </div>
  );
};

export default DialogActions;
