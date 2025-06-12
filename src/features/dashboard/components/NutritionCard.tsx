import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import CountUp from '@/components/ui/animations/count-up';

type NutritionItem = {
  label: string;
  consumed: number;
  target: number;
  unit: string;
  color: string;
  progress: number;
};

type NutritionCardProps = {
  title: string;
  items: NutritionItem[];
};

const NutritionCard = ({ title, items }: NutritionCardProps) => {
  const getSafeColor = (color: string) => {
    const validColors = [
      'green',
      'blue',
      'purple',
      'red',
      'yellow',
      'indigo',
      'pink',
    ];
    return validColors.includes(color) ? color : 'gray';
  };

  return (
    <Card className='w-full rounded-2xl bg-white shadow-md'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base font-semibold text-gray-800 sm:text-lg'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
            {items.map((item) => {
              const safeColor = getSafeColor(item.color);
              return (
                <div
                  key={item.label}
                  className={`bg-${safeColor}-50 rounded-xl p-3 sm:p-4`}
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='text-xs font-medium text-gray-600 sm:text-sm'>
                      {item.label}
                    </div>
                    <div
                      className={`bg-${safeColor}-100 text-${safeColor}-700 truncate rounded-full px-2 py-1 text-xs sm:text-sm`}
                    >
                      <CountUp
                        from={0}
                        to={item.consumed}
                        duration={0.5}
                        className='count-up-text'
                      />
                      /{item.target} {item.unit}
                    </div>
                  </div>
                  <Progress
                    value={Math.min(item.progress, 100)}
                    className='h-2 w-full bg-gray-200'
                    indicatorClassName={`bg-${safeColor}-500`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className='py-4 text-center text-sm text-gray-500'>
            No nutrition data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionCard;
