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

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    progress: 'bg-blue-500',
    tagBg: 'bg-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    progress: 'bg-green-500',
    tagBg: 'bg-green-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    progress: 'bg-purple-500',
    tagBg: 'bg-purple-100',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    progress: 'bg-red-500',
    tagBg: 'bg-red-100',
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    progress: 'bg-yellow-500',
    tagBg: 'bg-yellow-100',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    progress: 'bg-indigo-500',
    tagBg: 'bg-indigo-100',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-700',
    progress: 'bg-pink-500',
    tagBg: 'bg-pink-100',
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    progress: 'bg-gray-500',
    tagBg: 'bg-gray-100',
  },
};

const NutritionCard = ({ title, items }: NutritionCardProps) => {
  const getSafeColorClasses = (color: string) => {
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
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
              const colorClasses = getSafeColorClasses(item.color);
              return (
                <div
                  key={item.label}
                  className={`${colorClasses.bg} rounded-xl p-3 sm:p-4`}
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='text-xs font-medium text-gray-600 sm:text-sm'>
                      {item.label}
                    </div>
                    <div
                      className={`${colorClasses.tagBg} ${colorClasses.text} truncate rounded-full px-2 py-1 text-xs sm:text-sm`}
                    >
                      <CountUp
                        from={0}
                        to={item.consumed}
                        duration={0.75}
                        separator='.'
                      />
                      /{item.target} {item.unit}
                    </div>
                  </div>
                  <Progress
                    value={Math.min(item.progress, 100)}
                    className='h-2 w-full bg-gray-200'
                    indicatorClassName={colorClasses.progress}
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
