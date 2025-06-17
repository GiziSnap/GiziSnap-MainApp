'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import SearchFood from './SearchFood';
import SearchResults from './SearchResults';
import QuantityInput from './QuantityInput';
import NutritionPreview from './NutritionPreview';
import { useGetFoodNutrition } from '@/features/machine-learning/hooks/useGetFoodNutrition';
import { useGetFoodName } from '@/features/machine-learning/hooks/useGetFoodName';
import { toast } from 'sonner';
import DialogActions from './DialogAction';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
import { useAddUserFood } from '../../hooks/useAddUserFood';
import { sendNotification } from '@/components/action/action';

import IconRounded from '@/../public/icon512_rounded.png';

type AddFoodItemDialogProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch: () => void;
};

export const AddFoodItemDialog = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
}: AddFoodItemDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<[string, string][]>([]);
  const [selectedFood, setSelectedFood] = useState<{
    name: string;
    label: string;
  } | null>(null);
  const [count, setCount] = useState(1);

  const {
    data: foodData,
    error: foodError,
    isLoading: isLoadingFood,
  } = useGetFoodName();

  const {
    data: nutrition,
    error: nutritionError,
    isLoading: isLoadingNutrition,
  } = useGetFoodNutrition({
    foodName: selectedFood ? selectedFood.name : '',
  });

  const { mutate: addUserFood, isPending: isAddUserFoodPending } =
    useAddUserFood({
      onSuccess: async () => {
        toast.success('Makanan berhasil ditambahkan');
        setIsModalOpen(false);
        // --- Panggil handleCancel untuk reset state ---
        handleCancel();
        refetch();
      },
      onError: async () => {
        toast.error('Makanan gagal ditambahkan');
      },
    });

  useEffect(() => {
    if (nutritionError) {
      console.log('Error fetching nutrition:', nutritionError);
    } else if (nutrition) {
      console.log('Fetched nutrition data:', nutrition);
    }
  }, [nutrition, nutritionError]);

  useEffect(() => {
    // --- TAMBAHAN: Jangan cari jika sudah ada makanan yang dipilih ---
    if (
      foodData &&
      Array.isArray(foodData.data) &&
      searchQuery &&
      !selectedFood
    ) {
      const results = foodData.data
        .filter(
          (item) =>
            Array.isArray(item) &&
            item.length >= 2 &&
            typeof item[0] === 'string' &&
            typeof item[1] === 'string' &&
            item[0]?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((item) => [item[0], item[1]] as [string, string]);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, foodData, selectedFood]); // --- TAMBAHAN: Tambahkan selectedFood sebagai dependency

  // --- MODIFIKASI: Sederhanakan fungsi ini ---
  const handleSelectFood = (item: [string, string]) => {
    if (item?.[0]) {
      setSelectedFood({ name: item[0], label: item[1] });
      // Hapus setSearchQuery dan setSearchResults agar tampilan langsung berubah
      setSearchResults([]);
    }
  };

  const handleCancel = () => {
    setSelectedFood(null);
    setSearchQuery('');
    setSearchResults([]);
    setIsModalOpen(false);
    setCount(1);
  };

  // --- BARU: Fungsi untuk kembali ke mode pencarian ---
  const handleChangeSelection = () => {
    setSelectedFood(null);
    setSearchQuery('');
  };

  const handleAddFood = async () => {
    if (selectedFood && nutrition?.data?.data) {
      const foodData = nutrition.data.data;

      const foodToAdd = {
        // --- Data Dasar ---
        name: selectedFood.name,
        quantity: count,
        sumber: foodData.sumber ?? '',

        // --- Makronutrien Utama (sudah ada) ---
        calories: Number(foodData['kalori (kkal)'] ?? 0) * count,
        protein: Number(foodData['protein (g)'] ?? 0) * count,
        carbs: Number(foodData['karbohidrat (g)'] ?? 0) * count,
        fat: Number(foodData['lemak (g)'] ?? 0) * count,

        // --- Nutrisi Tambahan (baru ditambahkan) ---
        sugar: Number(foodData['gula (g)'] ?? 0) * count,
        fiber: Number(foodData['serat (g)'] ?? 0) * count,

        // --- Rincian Lemak (baru ditambahkan) ---
        saturatedfat: Number(foodData['lemak jenuh (g)'] ?? 0) * count,
        monounsaturatedfat:
          Number(foodData['lemak tak jenuh tunggal (g)'] ?? 0) * count,
        polyunsaturatedfat:
          Number(foodData['lemak tak jenuh ganda (g)'] ?? 0) * count,

        // --- Mineral & Lainnya (baru ditambahkan) ---
        cholesterol: Number(foodData['kolesterol (mg)'] ?? 0) * count,
        sodium: Number(foodData['sodium (mg)'] ?? 0) * count,
        potassium: Number(foodData['kalium (mg)'] ?? 0) * count,
        energy: Number(foodData['energi (kj)'] ?? 0) * count,
      };

      addUserFood(foodToAdd);

      try {
        await sendNotification(
          `Berhasil menambahkan ${selectedFood.name}. Makanan ini telah ditambahkan!`,
          IconRounded.src,
          `${selectedFood.name} telah ditambahkan!`,
        );
        console.log('Push notification sent successfully!');
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    } else {
      if (!selectedFood) {
        console.error('No food selected');
        throw new Error('No food selected');
      }
      if (!nutrition?.data?.data) {
        console.error('Nutrition data is not available');
        throw new Error('Nutrition data is not available');
      }
    }
  };

  if (foodError) return <div>Error: {foodError.message}</div>;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          className='mt-4 flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-white transition duration-200 hover:bg-orange-600'
          onClick={() => setIsModalOpen(true)}
          disabled={isLoadingFood}
        >
          {isLoadingFood ? (
            <span className='flex items-center gap-2'>
              Loading <Loader2 className='h-4 w-4 animate-spin' />
            </span>
          ) : (
            <span className='flex items-center gap-2 text-sm'>
              <Pencil size={20} />
              Tambah Makanan
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='px-4 py-6 sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-sm'>Add Food Item</DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-sm'>
          Tambahkan menu makanan baru harianmu
        </DialogDescription>
        <div className='space-y-2'>
          {/* --- MODIFIKASI: Render kondisional untuk form pencarian --- */}
          {!selectedFood ? (
            <>
              <SearchFood
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                handleSelectFood={handleSelectFood}
              />
              {searchResults.length > 0 && (
                <SearchResults
                  searchResults={searchResults}
                  handleSelectFood={handleSelectFood}
                />
              )}
            </>
          ) : (
            <div className='flex items-center justify-between rounded-md border bg-slate-50 p-3'>
              <span className='text-sm font-medium text-slate-800'>
                {selectedFood.label}
              </span>
              <Button variant='ghost' size='sm' onClick={handleChangeSelection}>
                <Pencil className='mr-2 h-4 w-4' />
                Ubah
              </Button>
            </div>
          )}

          <QuantityInput
            count={count}
            incrementCount={() => setCount(count + 1)}
            decrementCount={() => count > 1 && setCount(count - 1)}
            setCount={setCount}
          />
          <NutritionPreview
            isLoading={isLoadingNutrition}
            error={nutritionError}
            nutrition={nutrition ?? null}
            quantity={count}
          />
        </div>
        <DialogFooter>
          <DialogActions
            onCancel={handleCancel}
            onAdd={handleAddFood}
            isPending={isAddUserFoodPending}
            isDisabled={!selectedFood}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
