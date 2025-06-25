import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingOverlay = ({
  isVisible,
  message,
}: {
  isVisible: boolean;
  message: string;
}) => {
  if (!isVisible) return null;
  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm dark:bg-black/80'>
      <Loader2 className='h-12 w-12 animate-spin text-emerald-500' />
      <p className='mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300'>
        {message}
      </p>
    </div>
  );
};

export default LoadingOverlay;
