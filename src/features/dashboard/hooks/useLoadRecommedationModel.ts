/*
|--------------------------------------------------------------------------
| File: src/utils/useLoadRecommendationModel.ts
|--------------------------------------------------------------------------
|
| Hook ini menggunakan path dari `useGetRecommendationInfo` untuk memuat
| semua aset yang diperlukan untuk sistem rekomendasi. Versi ini berisi
| logika untuk memproses data nutrisi dari format array ke objek.
|
*/
import { type LayersModel } from '@tensorflow/tfjs';
import { useQuery } from '@tanstack/react-query';
import mlAxios from '@/lib/axios/mlAxios';
import type { FoodLabel, FoodRecommendationMetadata } from '../types';
import { env } from '@/env';
import * as tf from '@tensorflow/tfjs';
import { useGetRecommendationInfo } from './useRecomentaionInfo';

type NutritionData = (string | number)[][];
type NutritionDetails = Record<string, string | number>;
type ProcessedNutritions = Record<string, NutritionDetails>;

const safeDataExtractor = <T>(response: unknown): T => {
  if (response && (response as { data: T }).data) {
    return (response as { data: T }).data;
  }
  return response as T;
};

const useLoadRecommendationModel = () => {
  const {
    data: recoInfo,
    isLoading: isInfoLoading,
    error: infoError,
  } = useGetRecommendationInfo();

  const {
    data: foodLabels,
    isLoading: areLabelsLoading,
    error: labelsError,
  } = useQuery<FoodLabel[], Error>({
    queryKey: ['get-food-labels', recoInfo?.labelJsonPath],
    queryFn: async () => {
      if (!recoInfo?.labelJsonPath) return [];
      const url = new URL(recoInfo.labelJsonPath, env.NEXT_PUBLIC_ML_API_URL)
        .href;
      const { data } = await mlAxios.get<{ data: FoodLabel[] }>(url);
      const extractedData = safeDataExtractor(data);
      if (!Array.isArray(extractedData)) return [];
      return extractedData as FoodLabel[];
    },
    enabled: !!recoInfo?.labelJsonPath,
    staleTime: Infinity,
  });

  const {
    data: foodMetadata,
    isLoading: isMetadataLoading,
    error: metadataError,
  } = useQuery<FoodRecommendationMetadata, Error>({
    queryKey: ['get-reco-metadata', recoInfo?.metadataPath],
    queryFn: async () => {
      if (!recoInfo?.metadataPath) return null;
      const url = new URL(recoInfo.metadataPath, env.NEXT_PUBLIC_ML_API_URL)
        .href;
      const { data } = await mlAxios.get<{ data: FoodRecommendationMetadata }>(
        url,
      );
      return safeDataExtractor<FoodRecommendationMetadata>(data);
    },
    enabled: !!recoInfo?.metadataPath,
    staleTime: Infinity,
  });

  const {
    data: recoModel,
    isLoading: isModelLoading,
    error: modelError,
  } = useQuery<LayersModel, Error>({
    queryKey: ['load-reco-model', recoInfo?.modelJsonPath],
    queryFn: async () => {
      if (!recoInfo?.modelJsonPath) return null;
      const url = new URL(recoInfo.modelJsonPath, env.NEXT_PUBLIC_ML_API_URL)
        .href;
      await tf.setBackend('webgl');
      await tf.ready();
      const model = await tf.loadLayersModel(url);
      return model;
    },
    enabled: !!recoInfo?.modelJsonPath,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: allNutritions,
    isLoading: isNutritionsLoading,
    error: nutritionsError,
  } = useQuery<Record<string, Record<string, string | number>>, Error>({
    queryKey: ['get-all-nutritions'],
    queryFn: async () => {
      const { data: rawData } = await mlAxios.get<NutritionData>(
        '/api/sheet-data/Result_Food_Name_List',
      );
      const extractedData = safeDataExtractor(rawData);

      if (!Array.isArray(extractedData) || extractedData.length < 2) {
        return {};
      }
      const headers = extractedData[0] as string[];
      const rows = extractedData.slice(1) as (string | number)[][];
      const foodNameIndex = headers.indexOf('nama_makanan');

      if (foodNameIndex === -1) {
        return {};
      }

      const processedNutritions = rows.reduce<ProcessedNutritions>(
        (acc, row) => {
          const foodName = String(row[foodNameIndex]);
          if (foodName) {
            const nutritionDetails: NutritionDetails = {};
            headers.forEach((header: string, index: number) => {
              const value = row[index];
              if (value !== undefined) {
                nutritionDetails[header] = value;
              }
            });
            acc[foodName] = nutritionDetails;
          }
          return acc;
        },
        {},
      );

      return processedNutritions;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    recoModel,
    foodLabels,
    foodMetadata,
    allNutritions,
    isLoading:
      isInfoLoading ||
      areLabelsLoading ||
      isModelLoading ||
      isMetadataLoading ||
      isNutritionsLoading,
    error:
      infoError ??
      labelsError ??
      modelError ??
      metadataError ??
      nutritionsError,
  };
};

export default useLoadRecommendationModel;
