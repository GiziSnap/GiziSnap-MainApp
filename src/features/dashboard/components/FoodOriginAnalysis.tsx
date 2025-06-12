import React, { useMemo } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetFoodName } from '@/features/machine-learning/hooks/useGetFoodName';
import Link from 'next/link';

const FoodOriginAnalysis = () => {
  const { data: foodNames, isLoading, isError } = useGetFoodName();

  const processedFoods = useMemo(() => {
    const actualData = foodNames?.data;

    if (!Array.isArray(actualData) || actualData.length === 0) {
      return [];
    }

    return actualData
      .slice(1)
      .filter((item) => item?.[0] && !item[0].startsWith('testing'))
      .map(([name, label], index) => ({
        id: index,
        name: name,
        general: typeof label === 'string' && label.includes('General'),
      }));
  }, [foodNames?.data]);

  if (isLoading) {
    return (
      <Card className='flex w-full items-center justify-center rounded-2xl bg-white p-6 shadow-md md:w-1/2'>
        <span className='flex items-center text-gray-600'>
          Loading analysis... <Loader2 className='animate-spin' />
        </span>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className='flex w-full items-center justify-center rounded-2xl bg-red-50 p-6 shadow-md md:w-1/2'>
        <p className='text-red-600'>Failed to load food data.</p>
      </Card>
    );
  }

  const totalFoodCount = processedFoods.length;
  const generalFoodCount = processedFoods.filter((food) => food.general).length;
  const regionalFoodCount = processedFoods.filter(
    (food) => !food.general,
  ).length;

  const generalFoodPercentage =
    totalFoodCount > 0
      ? ((generalFoodCount / totalFoodCount) * 100).toFixed(1)
      : '0.0';
  const regionalFoodPercentage =
    totalFoodCount > 0
      ? ((regionalFoodCount / totalFoodCount) * 100).toFixed(1)
      : '0.0';

  return (
    <Card className='w-full max-w-2xl rounded-2xl bg-white shadow-md md:w-1/2'>
      <CardHeader className='mb-4 w-full'>
        <div className='flex items-center'>
          <Globe className='mr-2 h-6 w-6 text-blue-500' />
          <CardTitle className='text-lg font-semibold text-gray-800'>
            Food Origin Analysis
          </CardTitle>
        </div>
        <CardAction className='mt-1 text-sm'>
          <Link
            href={'/dashboard/food-data'}
            className='text-blue-500 decoration-green-400'
          >
            Learn More
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='mb-4 space-y-4'>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-sm font-medium text-gray-600'>
                General Foods ({generalFoodCount})
              </div>
              <div className='text-sm font-medium text-green-600'>
                {generalFoodPercentage}%
              </div>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-green-500 transition-all duration-500'
                style={{ width: `${generalFoodPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-sm font-medium text-gray-600'>
                Regional Foods ({regionalFoodCount})
              </div>
              <div className='text-sm font-medium text-blue-600'>
                {regionalFoodPercentage}%
              </div>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-blue-500 transition-all duration-500'
                style={{ width: `${regionalFoodPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className='text-sm text-gray-600'>
          Total Foods Analyzed: {totalFoodCount}
        </p>
      </CardFooter>
    </Card>
  );
};

export default FoodOriginAnalysis;
