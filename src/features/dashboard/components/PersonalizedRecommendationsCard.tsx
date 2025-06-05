import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Lightbulb,
  RefreshCw,
  Search,
  Utensils,
  ShoppingBasket,
} from 'lucide-react';
import { toast } from 'sonner';

interface FoodRecommendation {
  id: string;
  name: string;
  description?: string;
  calories?: number;
  icon?: React.ElementType;
}

const dummyRecommendationsData: FoodRecommendation[] = [
  {
    id: '1',
    name: 'Salad Ayam Panggang',
    description: 'Protein tinggi, rendah kalori.',
    calories: 350,
    icon: Utensils,
  },
  {
    id: '2',
    name: 'Smoothie Bowl Buah Naga',
    description: 'Kaya antioksidan dan vitamin.',
    calories: 280,
    icon: ShoppingBasket,
  },
  {
    id: '3',
    name: 'Nasi Goreng Shirataki',
    description: 'Versi rendah karbohidrat.',
    calories: 220,
    icon: Utensils,
  },
  {
    id: '4',
    name: 'Ikan Salmon Panggang dengan Asparagus',
    description: 'Sumber Omega-3 yang baik.',
    calories: 450,
    icon: Utensils,
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    description: 'Protein tinggi, rendah kalori.',
    calories: 400,
    icon: Utensils,
  },
];

const PersonalizedRecommendationsCard = () => {
  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>(
    dummyRecommendationsData,
  );

  const handleRefresh = () => {
    console.log('Memperbarui rekomendasi...');
    toast.success('Rekomendasi berhasil diperbarui', {
      description: 'Rekomendasi baru telah diperbarui.',
      richColors: true,
      duration: 3000,
      action: {
        label: 'Tutup',
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  return (
    <Card className='rounded-2xl bg-white shadow-md lg:col-span-2'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center'>
          <div className='relative mr-2'>
            <Lightbulb className='h-5 w-5 text-yellow-500' />
            <div className='absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-green-500' />
          </div>
          <CardTitle className='text-lg font-semibold'>
            Personalized Recommendations
          </CardTitle>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='text-green-500 hover:text-green-600'
          onClick={handleRefresh}
        >
          <RefreshCw className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className='pt-4 pb-6'>
        {recommendations.length > 0 ? (
          <div className='space-y-3'>
            {recommendations.map((item) => {
              const IconComponent = item.icon ?? Utensils;
              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700'
                >
                  <div className='flex flex-1 items-center'>
                    <IconComponent className='mr-4 h-6 w-6 text-green-500' />
                    <div className='flex-1'>
                      {' '}
                      {/* Membiarkan ruang untuk nama dan deskripsi */}
                      <p className='text-card-foreground text-sm font-medium'>
                        {item.name}
                      </p>
                      {item.description && (
                        <p className='text-muted-foreground text-xs'>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.calories && (
                    <span className='w-20 rounded-full bg-green-100 px-2 py-1 text-center text-xs font-semibold text-green-700'>
                      {item.calories} kcal
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            <Search className='mx-auto mb-2 h-10 w-10' />
            <p className='text-sm'>Tidak ada rekomendasi makanan saat ini.</p>
            <p className='mt-1 text-xs'>
              Coba refresh atau tambahkan item ke preferensi Anda.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendationsCard;
