'use client';

import { useGetFoodNutrition } from '@/features/machine-learning/hooks/useGetFoodNutrition';
import type { UserFoodhistorySchema } from '../../../types';
import { ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = { food: UserFoodhistorySchema };

export const FoodItemRow = ({ food }: Props) => {
  const {
    data: sourceFood,
    isLoading: isLoadingNutrition,
    error: nutritionError,
  } = useGetFoodNutrition({ foodName: food.name });

  return (
    <div className='flex items-start border-b border-gray-100 pb-3 transition-colors duration-200 last:border-b-0 hover:bg-gray-50'>
      <div className='flex-1 p-2'>
        <h3 className='text-base font-medium text-gray-800'>{food.name}</h3>

        <div className='mt-1 grid grid-cols-2 gap-2 text-sm text-wrap text-gray-600'>
          <p>
            Porsi: <span className='font-medium'>{food.quantity}</span>
          </p>
          <p>
            Kalori: <span className='font-medium'>{food.calories} kcal</span>
          </p>
          <p>
            Protein: <span className='font-medium'>{food.protein} g</span>
          </p>
          <p>
            Karbo: <span className='font-medium'>{food.carbs} g</span>
          </p>
          <p>
            Lemak: <span className='font-medium'>{food.fat} g</span>
          </p>

          <div className='flex items-center'>
            Sumber: <span className='mr-1 font-medium'>{food.sumber}</span>
            {isLoadingNutrition ? (
              <span>
                <Skeleton className='h-4 w-12 bg-slate-200' />
              </span>
            ) : nutritionError ? (
              <span className='ml-1 text-red-500'>
                {nutritionError.message || 'Nutrition data not found'}
              </span>
            ) : sourceFood?.data?.data?.sumber ? (
              <a
                href={sourceFood.data.data.sumber}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-1 text-green-600 transition-colors duration-200 hover:text-green-800'
                aria-label='Open source link'
              >
                <ExternalLink className='h-4 w-4' />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
