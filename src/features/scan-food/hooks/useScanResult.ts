import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient, useQueries } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAddUserFood } from '@/features/dashboard/hooks/useAddUserFood';
import { findPotentialMatches } from '../utils/detectionHelper';
import mlAxios from '@/lib/axios/mlAxios';
import type {
  FoodData,
  FoodNutritionResponse,
  UserFoodhistorySchema,
} from '../types';

/**
 * Hook untuk mengelola hasil deteksi, seleksi pengguna, pengambilan data nutrisi,
 * dan proses penyimpanan data makanan.
 */
export const useScanResults = (
  detectedFoods: Set<string>,
  allFoodNames: string[],
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: addUserFood, isPending: isSubmitting } = useAddUserFood(
    {},
  );
  const [userSelections, setUserSelections] = useState<Map<string, string>>(
    new Map(),
  );

  const potentialMatchesMap = useMemo(() => {
    const map = new Map<string, string[]>();
    detectedFoods.forEach((label) => {
      map.set(label, findPotentialMatches(label, allFoodNames));
    });
    return map;
  }, [detectedFoods, allFoodNames]);

  useEffect(() => {
    const newSelections = new Map(userSelections);
    let hasChanged = false;
    potentialMatchesMap.forEach((matches, label) => {
      if (matches.length === 1 && !newSelections.has(label) && matches[0]) {
        newSelections.set(label, matches[0]);
        hasChanged = true;
      }
    });
    if (hasChanged) {
      setUserSelections(newSelections);
    }
  }, [potentialMatchesMap, userSelections]);

  const foodQueries = useQueries({
    queries: Array.from(userSelections.values()).map((name) => ({
      queryKey: ['get-food-nutrition', name],
      queryFn: async (): Promise<FoodData> => {
        const response = await mlAxios.get<FoodNutritionResponse>(
          `/api/food-nutrition/${encodeURIComponent(name)}`,
        );
        if (!response.data?.data?.data)
          throw new Error(`Could not parse data for ${name}`);
        return response.data.data.data;
      },
      enabled: !!name,
      staleTime: Infinity,
    })),
  });

  const handleSubmit = async () => {
    const foodsToSubmit: UserFoodhistorySchema[] = foodQueries
      .filter((q) => q.isSuccess && q.data)
      .map((q) => {
        const foodData = q.data!;
        return {
          name: foodData.nama_makanan,
          quantity: 1,
          sumber: foodData.sumber ?? '',
          calories: Number(foodData['kalori (kkal)'] ?? 0),
          protein: Number(foodData['protein (g)'] ?? 0),
          carbs: Number(foodData['karbohidrat (g)'] ?? 0),
          fat: Number(foodData['lemak (g)'] ?? 0),
          sugar: Number(foodData['gula (g)'] ?? 0),
          fiber: Number(foodData['serat (g)'] ?? 0),
          saturatedfat: Number(foodData['lemak jenuh (g)'] ?? 0),
          monounsaturatedfat: Number(
            foodData['lemak tak jenuh tunggal (g)'] ?? 0,
          ),
          polyunsaturatedfat: Number(
            foodData['lemak tak jenuh ganda (g)'] ?? 0,
          ),
          cholesterol: Number(foodData['kolesterol (mg)'] ?? 0),
          sodium: Number(foodData['sodium (mg)'] ?? 0),
          potassium: Number(foodData['kalium (mg)'] ?? 0),
          energy: Number(foodData['energi (kj)'] ?? 0),
        };
      });

    if (foodsToSubmit.length === 0)
      return toast.warning('Tidak ada data valid untuk disimpan.');

    const toastId = toast.loading('Menyimpan data...');
    try {
      await Promise.all(foodsToSubmit.map((food) => addUserFood(food)));
      await queryClient.invalidateQueries({ queryKey: ['get-users-data'] });
      toast.success('Semua makanan berhasil disimpan!', { id: toastId });
      router.push('/dashboard');
    } catch (error) {
      toast.error(
        `Gagal menyimpan: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`,
        { id: toastId },
      );
    }
  };

  return {
    userSelections,
    setUserSelections,
    potentialMatchesMap,
    foodQueries,
    isSubmitting,
    handleSubmit,
  };
};

export default useScanResults;
