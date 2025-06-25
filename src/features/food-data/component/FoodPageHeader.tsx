import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const FoodPageHeader = () => (
  <Card className='mb-8 w-full shadow-md'>
    <CardHeader className='text-center'>
      <CardTitle className='text-3xl font-bold tracking-tight text-green-800 sm:text-4xl'>
        Jelajahi Kekayaan Kuliner Nusantara
      </CardTitle>
      <CardDescription className='text-md mx-auto mt-2 max-w-2xl text-gray-600'>
        Temukan daftar lengkap makanan khas dari berbagai penjuru Indonesia,
        dari Sabang sampai Merauke.
      </CardDescription>
    </CardHeader>
  </Card>
);
