import { Skeleton } from '@/components/ui/skeleton';

export const FoodItemRowSkeleton = () => {
  return (
    <div className='flex items-start pb-3 transition-colors duration-200 border-b border-gray-100 last:border-b-0 hover:bg-gray-50'>
      <div className='flex-1 p-4'>
        <h3 className='text-base font-medium text-gray-800'>
          <Skeleton className='w-3/4 h-5 mb-2' />
        </h3>

        <div className='grid grid-cols-2 gap-2 mt-1 text-sm text-gray-600'>
          <span>
            Porsi:{' '}
            <span className='font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
          </span>
          <span>
            Kalori:{' '}
            <span className='font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
          </span>
          <span>
            Protein:{' '}
            <span className='font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
          </span>
          <span>
            Karbo:{' '}
            <span className='font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
          </span>
          <span>
            Lemak:{' '}
            <span className='font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
          </span>

          <div className='flex items-center'>
            Sumber:{' '}
            <span className='mr-1 font-medium'>
              <Skeleton className='w-1/4 h-4' />
            </span>
            <Skeleton className='w-12 h-4 bg-slate-200' />
          </div>
        </div>
      </div>
    </div>
  );
};
