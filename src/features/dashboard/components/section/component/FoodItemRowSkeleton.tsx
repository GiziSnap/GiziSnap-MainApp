import { Skeleton } from '@/components/ui/skeleton';

export const FoodItemRowSkeleton = () => {
  return (
    <div className='flex items-start border-b border-gray-100 pb-3 transition-colors duration-200 last:border-b-0 hover:bg-gray-50'>
      <div className='flex-1 p-4'>
        <h3 className='text-base font-medium text-gray-800'>
          <Skeleton className='mb-2 h-5 w-3/4' />
        </h3>

        <div className='mt-1 grid grid-cols-2 gap-2 text-sm text-gray-600'>
          <span>
            Porsi:{' '}
            <span className='font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
          </span>
          <span>
            Kalori:{' '}
            <span className='font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
          </span>
          <span>
            Protein:{' '}
            <span className='font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
          </span>
          <span>
            Karbo:{' '}
            <span className='font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
          </span>
          <span>
            Lemak:{' '}
            <span className='font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
          </span>

          <div className='flex items-center'>
            Sumber:{' '}
            <span className='mr-1 font-medium'>
              <Skeleton className='h-4 w-1/4' />
            </span>
            <Skeleton className='h-4 w-12 bg-slate-200' />
          </div>
        </div>
      </div>
    </div>
  );
};
