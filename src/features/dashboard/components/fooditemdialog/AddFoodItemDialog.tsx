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

import IconRounded from '@/../public/icon512_rounded.png'

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
        setSelectedFood(null);
        setSearchQuery('');
        setSearchResults([]);
        setIsModalOpen(false);
        setCount(1);
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
    if (foodData && Array.isArray(foodData.data) && searchQuery) {
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
  }, [searchQuery, foodData]);

  const handleSelectFood = (item: [string, string]) => {
    if (item?.[0]) {
      setSelectedFood({ name: item[0], label: item[1] });
      setSearchQuery(item[0]);
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

  const handleAddFood = async () => {
    if (selectedFood) {
      const foodToAdd = {
        name: selectedFood.name,
        quantity: count,
        calories: Number(nutrition?.data?.data?.['kalori (kkal)'] ?? 0) * count,
        protein: Number(nutrition?.data?.data['protein (g)'] ?? 0) * count,
        carbs: Number(nutrition?.data?.data['karbohidrat (g)'] ?? 0) * count,
        fat: Number(nutrition?.data?.data['lemak (g)'] ?? 0) * count,
      };

      addUserFood(foodToAdd);

      try {
        await sendNotification(`Berhasil menambahkan ${selectedFood.name}. Makanan ini telah ditambahkan!`, IconRounded.src, `${selectedFood.name} telah ditambahkan!`);
        console.log("Push notification sent successfully!");
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    } else {
      throw new Error('No food selected');
    }
  };

  if (foodError) return <div>Error: {foodError.message}</div>;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center justify-center px-4 py-2 mt-4 text-white transition duration-200 bg-orange-500 rounded-md hover:bg-orange-600'
          onClick={() => setIsModalOpen(true)}
          disabled={isLoadingFood}
        >
          {isLoadingFood ? (
            <span className='flex items-center gap-2'>
              Loading <Loader2 className='w-4 h-4 animate-spin' />
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
