'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddFoodItemDialog } from '../fooditemdialog/AddFoodItemDialog';
import { Pencil } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserFoodhistorySchema } from '../../types';
import { FoodItemRow } from './component/FoodItemRow';
import { useUserData } from '../../utils/useUserData';
import { Separator } from '@/components/ui/separator';
import { FoodItemRowSkeleton } from './component/FoodItemRowSkeleton';

type FoodLogProps = {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  refetch: () => void;
};

export const FoodLogSection = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: FoodLogProps) => {
  const { userFoodshistories, isLoading, error } = useUserData();

  const filterFoodByToday = (history: UserFoodhistorySchema[]) => {
    const today = new Date().toISOString().split('T')[0];
    return history.filter((f) =>
      new Date(f.created_at ?? new Date())
        .toISOString()
        .startsWith(today + 'T'),
    );
  };

  if (error)
    return <span className='text-red-500'>Error: {error.message}</span>;

  const todayFoodHistory = filterFoodByToday(userFoodshistories ?? []);

  return (
    <Card className='relative lg:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          {isLoading ? (
            <div className='space-y-4'>
              {[...Array<number>(3)].map((_, i) => (
                <FoodItemRowSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className='flex items-center text-lg font-semibold text-gray-800'>
                <Pencil className='mr-2 text-orange-500' />
                Today&apos;s Food Log
              </div>
              <div className='text-right text-sm font-medium text-gray-600'>
                {todayFoodHistory.length} items
              </div>
            </>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-72 overflow-y-auto'>
          {isLoading ? (
            /* Skeleton list */
            <div className='space-y-4'>
              {[...Array<number>(3)].map((_, i) => (
                <div
                  key={i}
                  className='mb-4 flex items-start border-b border-gray-100 pb-3'
                >
                  <div className='flex-1'>
                    <Skeleton className='mb-2 h-5 w-3/4' />
                    <Skeleton className='mb-1 h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                </div>
              ))}
            </div>
          ) : todayFoodHistory.length > 0 ? (
            /* Actual list */
            <div>
              {todayFoodHistory.map((food) => (
                <FoodItemRow key={food.id} food={food} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className='py-8 text-center text-gray-500'>
              <div className='mb-2 text-4xl'>📋</div>
              <p className='text-lg'>No food items logged for today</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='flex flex-col items-center justify-center p-4'>
        <Separator className='w-full' />
        <AddFoodItemDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          refetch={refetch}
        />
        <p className='mt-2 text-sm text-gray-600'>
          Click the button above to add a new food item.
        </p>
      </CardFooter>
    </Card>
  );
};
