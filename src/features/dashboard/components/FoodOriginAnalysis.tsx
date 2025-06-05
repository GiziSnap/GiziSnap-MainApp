import React from 'react';
import { Globe } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const FoodOriginAnalysis = () => {
  // Data dummy untuk analisis asal makanan
  const foodOrigins = [
    { id: 1, name: 'Nasi Goreng', origin: 'Local', general: true }, // Makanan lokal umum
    { id: 2, name: 'Bingka Kentang', origin: 'Local', general: false }, // Makanan daerah
    { id: 3, name: 'Pizza', origin: 'International', general: true }, // Makanan internasional
    { id: 4, name: 'Sushi', origin: 'International', general: true }, // Makanan internasional
    { id: 5, name: 'Rendang', origin: 'Local', general: false }, // Makanan daerah
  ];

  // Hitung total makanan
  const totalFoodCount = foodOrigins.length;

  // Hitung jumlah makanan umum dan daerah
  const generalFoodCount = foodOrigins.filter((food) => food.general).length;
  const regionalFoodCount = foodOrigins.filter((food) => !food.general).length;

  // Hitung persentase
  const generalFoodPercentage = (
    (generalFoodCount / totalFoodCount) *
    100
  ).toFixed(2);
  const regionalFoodPercentage = (
    (regionalFoodCount / totalFoodCount) *
    100
  ).toFixed(2);

  return (
    <Card className='w-full rounded-2xl bg-white shadow-md md:w-1/2'>
      <CardHeader className='mb-4 flex items-center'>
        <Globe className='mr-2 text-blue-500' />
        <CardTitle className='text-lg font-semibold text-gray-800'>
          Food Origin Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-4 space-y-4'>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-sm font-medium text-gray-600'>
                General Foods
              </div>
              <div className='text-sm font-medium text-green-600'>
                {generalFoodPercentage}%
              </div>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-green-500'
                style={{ width: `${generalFoodPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='text-sm font-medium text-gray-600'>
                Regional Foods
              </div>
              <div className='text-sm font-medium text-blue-600'>
                {regionalFoodPercentage}%
              </div>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-blue-500'
                style={{ width: `${regionalFoodPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className='text-sm text-gray-600'>Total Foods: {totalFoodCount}</p>
      </CardFooter>
    </Card>
  );
};

export default FoodOriginAnalysis;
