// --- File: src/components/PersonalizedRecommendationsCard.tsx ---
// Deskripsi: Komponen ini sekarang menangani penambahan makanan secara mandiri.
// Mengklik item akan membuka modal internal untuk konfirmasi jumlah,
// lalu langsung menambahkan makanan menggunakan hook useAddUserFood.
// PERBARUAN: Informasi nutrisi lengkap sekarang ditampilkan di dalam modal.

'use client';

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Lightbulb,
  PlusCircle,
  RefreshCw,
  Search,
  Utensils,
  Wheat,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import type { UserFoodhistorySchema } from '../types';
import { useAddUserFood } from '../hooks/useAddUserFood';
import IconRounded from '@/../public/icon512_rounded.png';

// Fungsi helper untuk mengirim notifikasi browser
const sendNotification = async (title: string, icon: string, body: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon });
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body, icon });
    }
  }
};

export interface FoodRecommendation {
  name: string;
  region: string;
  origin: string;
  is_general: boolean;
  score: number;
  nutrition: Record<string, number | string>; // Bisa string atau number
  calories?: number;
  icon?: React.ElementType;
}

export type PersonalizedRecommendationsCardProps = {
  recommendations: FoodRecommendation[];
  selectedLocation: string;
  onRefresh: () => void;
  isLoading: boolean;
  loggedFoodsCount: number;
  onAddFood: (food: FoodRecommendation) => void;
};

const PersonalizedRecommendationsCard = ({
  recommendations = [],
  onRefresh,
  isLoading,
  loggedFoodsCount,
  selectedLocation,
}: PersonalizedRecommendationsCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodRecommendation | null>(
    null,
  );
  const [count, setCount] = useState(1);

  const { mutate: addUserFood, isPending } = useAddUserFood({
    onSuccess: async () => {
      toast.success(`'${selectedFood?.name}' berhasil ditambahkan!`);
      onRefresh();
      setIsModalOpen(false);
    },
    onError: async (error: unknown) => {
      if (error instanceof Error) {
        const errorMessage = error.message;
        toast.error(`Gagal menambahkan makanan: ${errorMessage}`);
      } else if (error && typeof error === 'object' && error !== null) {
        const errorResponse = error as {
          response: { data: { errors: string[] } };
        };
        const errorMessage = errorResponse.response?.data?.errors?.join(', ');
        toast.error(`Gagal menambahkan makanan: ${errorMessage}`);
      } else {
        toast.error('Gagal menambahkan makanan: Unknown error');
      }
    },
  });

  const handleAddFood = useCallback(async () => {
    if (selectedFood?.nutrition) {
      const foodData = selectedFood.nutrition;

      const foodToAdd = {
        name: selectedFood.name,
        quantity: count,
        sumber: selectedFood.origin ?? '',
        calories: Number(foodData['kalori (kkal)'] ?? 0) * count,
        protein: Number(foodData['protein (g)'] ?? 0) * count,
        carbs: Number(foodData['karbohidrat (g)'] ?? 0) * count,
        fat: Number(foodData['lemak (g)'] ?? 0) * count,
        sugar: Number(foodData['gula (g)'] ?? 0) * count,
        fiber: Number(foodData['serat (g)'] ?? 0) * count,
        saturatedfat: Number(foodData['lemak jenuh (g)'] ?? 0) * count,
        monounsaturatedfat:
          Number(foodData['lemak tak jenuh tunggal (g)'] ?? 0) * count,
        polyunsaturatedfat:
          Number(foodData['lemak tak jenuh ganda (g)'] ?? 0) * count,
        cholesterol: Number(foodData['kolesterol (mg)'] ?? 0) * count,
        sodium: Number(foodData['sodium (mg)'] ?? 0) * count,
        potassium: Number(foodData['kalium (mg)'] ?? 0) * count,
        energy: Number(foodData['energi (kj)'] ?? 0) * count,
      };

      addUserFood(foodToAdd as UserFoodhistorySchema);

      try {
        await sendNotification(
          `Berhasil menambahkan ${selectedFood.name}`,
          IconRounded.src,
          `${count} porsi ${selectedFood.name} telah ditambahkan ke catatan harian Anda.`,
        );
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    } else {
      if (!selectedFood) toast.error('Tidak ada makanan yang dipilih.');
      if (!selectedFood?.nutrition)
        toast.error('Data nutrisi tidak tersedia untuk makanan ini.');
    }
  }, [selectedFood, count, addUserFood, onRefresh]);

  const handleOpenModal = (food: FoodRecommendation) => {
    setSelectedFood(food);
    setCount(1);
    setIsModalOpen(true);
  };

  const localRecs = recommendations.filter((r) => !r.is_general);
  const generalRecs = recommendations.filter((r) => r.is_general);

  const nutritionDetailsConfig = useMemo(
    () => [
      { key: 'kalori (kkal)', label: 'Kalori', unit: 'kcal' },
      { key: 'protein (g)', label: 'Protein', unit: 'g' },
      { key: 'karbohidrat (g)', label: 'Karbohidrat', unit: 'g' },
      { key: 'lemak (g)', label: 'Lemak', unit: 'g' },
      { key: 'gula (g)', label: 'Gula', unit: 'g' },
      { key: 'serat (g)', label: 'Serat', unit: 'g' },
      { key: 'sodium (mg)', label: 'Sodium', unit: 'mg' },
      { key: 'kolesterol (mg)', label: 'Kolesterol', unit: 'mg' },
    ],
    [],
  );

  const nutritionInModal = useMemo(() => {
    if (!selectedFood) return [];
    return nutritionDetailsConfig.map((nutr) => ({
      ...nutr,
      value: (Number(selectedFood.nutrition[nutr.key] ?? 0) * count).toFixed(1),
    }));
  }, [selectedFood, count, nutritionDetailsConfig]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='text-muted-foreground flex h-[200px] flex-col items-center justify-center text-center'>
          <RefreshCw className='mx-auto mb-2 h-10 w-10 animate-spin' />
          <p className='text-sm'>Mencari rekomendasi...</p>
        </div>
      );
    }

    if (loggedFoodsCount === 0) {
      return (
        <div className='text-muted-foreground flex h-[200px] flex-col items-center justify-center py-8 text-center'>
          <Search className='mx-auto mb-2 h-10 w-10' />
          <p className='text-sm'>Catat makanan Anda terlebih dahulu</p>
          <p className='mt-1 text-xs'>Rekomendasi akan muncul di sini.</p>
        </div>
      );
    }

    if (recommendations.length === 0) {
      return (
        <div className='text-muted-foreground flex h-[200px] flex-col items-center justify-center py-8 text-center'>
          <Search className='mx-auto mb-2 h-10 w-10' />
          <p className='text-sm'>Tidak ada rekomendasi yang cocok.</p>
          <p className='mt-1 text-xs'>
            Coba segarkan lagi nanti atau ganti lokasi.
          </p>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <h4 className='text-md mb-2 flex items-center font-semibold'>
            <Wheat className='mr-2 h-5 w-5 text-green-600' />
            Rekomendasi Lokal
          </h4>
          {localRecs.length > 0 ? (
            <div className='space-y-3'>
              {localRecs.map((item) => (
                <RecommendationItem
                  key={item.name}
                  item={item}
                  onAddClick={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground rounded-lg bg-slate-50 p-3 text-sm'>
              Tidak ada rekomendasi lokal untuk {selectedLocation}.
            </p>
          )}
        </div>
        <div>
          <h4 className='text-md mb-2 flex items-center font-semibold'>
            <Utensils className='mr-2 h-5 w-5 text-blue-600' />
            Rekomendasi Umum
          </h4>
          {generalRecs.length > 0 ? (
            <div className='space-y-3'>
              {generalRecs.map((item) => (
                <RecommendationItem
                  key={item.name}
                  item={item}
                  onAddClick={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <p className='text-muted-foreground rounded-lg bg-slate-50 p-3 text-sm'>
              Tidak ada rekomendasi umum.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className='rounded-2xl bg-white shadow-md'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <div className='flex items-center'>
            <Lightbulb className='mr-2 h-5 w-5 text-yellow-500' />
            <CardTitle className='text-lg font-semibold'>
              Rekomendasi Makanan Personal
            </CardTitle>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='text-green-500 hover:text-green-600'
            onClick={onRefresh}
            disabled={isLoading || loggedFoodsCount === 0}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
          </Button>
        </CardHeader>
        <CardContent className='min-h-[240px] pt-4 pb-6'>
          {renderContent()}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Tambah {selectedFood?.name}</DialogTitle>
            <DialogDescription>
              Tambahkan {selectedFood?.name} ke daftar makanan Anda
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='flex items-center gap-4'>
              <Label htmlFor='quantity' className='text-nowrap'>
                Jumlah Porsi
              </Label>
              <Input
                id='quantity'
                type='number'
                value={count}
                onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
                className='col-span-3'
                min='1'
              />
            </div>
            <div className='mt-4 rounded-lg border bg-slate-50 p-4'>
              <h4 className='mb-3 flex items-center text-sm font-semibold'>
                <Info className='mr-2 h-4 w-4 text-blue-500' />
                Informasi Gizi (per {count} porsi)
              </h4>
              <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
                {nutritionInModal.map((nutr) => (
                  <div key={nutr.key} className='flex justify-between'>
                    <span className='text-muted-foreground'>{nutr.label}</span>
                    <span className='font-medium'>
                      {nutr.value} {nutr.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Batal
              </Button>
            </DialogClose>
            <Button type='button' onClick={handleAddFood} disabled={isPending}>
              {isPending ? 'Menambahkan...' : 'Tambah Makanan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const RecommendationItem = ({
  item,
  onAddClick,
}: {
  item: FoodRecommendation;
  onAddClick: (food: FoodRecommendation) => void;
}) => {
  return (
    <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700'>
      <div className='flex flex-1 items-center overflow-hidden pr-2'>
        <Utensils className='mr-4 h-6 w-6 flex-shrink-0 text-green-500' />
        <div className='flex-1'>
          <p className='text-card-foreground font-medium' title={item.name}>
            {item.name}
          </p>
          <p
            className='text-muted-foreground truncate text-xs'
            title={`Region: ${item.region}, Origin: ${item.origin}`}
          >
            {item.region} - {item.origin}
          </p>
        </div>
      </div>
      <div className='flex items-center'>
        {item.calories !== undefined && (
          <span className='ml-2 w-20 flex-shrink-0 rounded-full bg-green-100 px-2 py-1 text-center text-xs font-semibold text-green-700'>
            {Number(item.calories).toFixed(0)} kcal
          </span>
        )}
        <Button
          size='icon'
          variant='ghost'
          className='ml-2 h-8 w-8 text-blue-500 hover:bg-blue-100 hover:text-blue-600'
          onClick={() => onAddClick(item)}
        >
          <PlusCircle className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedRecommendationsCard;
