'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { NestedNutritionData } from '@/features/machine-learning/types';
import type { ApiResponse } from '@/types/api';

// Tipe data untuk porsi lainnya
type PortionData = Record<string, number>;

// Tipe data untuk field nutrisi
type NutritionField = {
  key: keyof NestedNutritionData['data'];
  label: string;
  unit: string;
  defaultValue: string | number;
};

// Props untuk komponen
type NutritionPreviewProps = {
  isLoading: boolean;
  error: Error | null;
  nutrition: ApiResponse<NestedNutritionData> | null;
  quantity: number;
};

// Data nutrisi yang akan ditampilkan
const nutritionFields: NutritionField[] = [
  {
    key: 'nama_makanan',
    label: 'Nama Makanan',
    unit: '',
    defaultValue: 'Tidak ada data',
  },
  { key: 'kalori (kkal)', label: 'Kalori', unit: 'kcal', defaultValue: 0 },
  { key: 'karbohidrat (g)', label: 'Karbohidrat', unit: 'g', defaultValue: 0 },
  { key: 'protein (g)', label: 'Protein', unit: 'g', defaultValue: 0 },
  { key: 'lemak (g)', label: 'Lemak', unit: 'g', defaultValue: 0 },
  { key: 'sodium (mg)', label: 'Sodium', unit: 'mg', defaultValue: 0 },
  { key: 'kalium (mg)', label: 'Kalium', unit: 'mg', defaultValue: 0 },
  { key: 'serat (g)', label: 'Serat', unit: 'g', defaultValue: 0 },
];

// Komponen utama NutritionPreview
const NutritionPreview: React.FC<NutritionPreviewProps> = ({
  isLoading,
  error,
  nutrition,
  quantity,
}) => {
  // Fungsi untuk menghitung nilai nutrisi berdasarkan kuantitas
  const calculateValue = (
    rawValue: string | number,
    isTextField: boolean,
  ): string | number => {
    if (isTextField) return rawValue;
    return (Number(rawValue) * quantity).toFixed(2);
  };

  // Render skeleton untuk loading state
  if (isLoading) {
    return (
      <div>
        <h4 className='mb-2 text-sm font-medium text-gray-700'>
          Nutrition Preview
        </h4>
        <div className='flex max-h-[300px] min-w-[120px] flex-wrap gap-4 overflow-y-auto md:max-h-[150px] md:overflow-y-hidden lg:min-h-[400px]'>
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className='min-w-[150px] flex-1 rounded-lg bg-gray-50 p-2'
              >
                <Skeleton className='mb-2 h-4 w-1/3 bg-slate-200' />
                <Skeleton className='h-6 w-full bg-slate-200' />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Render pesan error jika ada
  if (error) {
    return (
      <div>
        <h4 className='mb-2 text-sm font-medium text-gray-700'>
          Nutrition Preview
        </h4>
        <p className='text-red-500'>
          Error fetching nutrition info: {error.message}
        </p>
      </div>
    );
  }

  // Render pesan jika tidak ada data
  if (!nutrition?.data?.data) {
    return (
      <div>
        <h4 className='mb-2 text-sm font-medium text-gray-700'>
          Nutrition Preview
        </h4>
        <p className='text-gray-500'>Tidak ada data nutrisi tersedia.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className='mb-2 text-sm font-medium text-gray-700'>
        Nutrition Preview
      </h4>
      <div className='flex max-h-[300px] min-w-[120px] flex-wrap gap-4 overflow-y-auto md:max-h-[150px] md:overflow-y-hidden lg:min-h-[400px]'>
        {nutritionFields.map(({ key, label, unit, defaultValue }) => {
          const rawValue = nutrition.data.data[key] ?? defaultValue;
          const displayValue = calculateValue(rawValue, key === 'nama_makanan');
          return (
            <div
              key={key}
              className='min-w-[150px] flex-1 rounded-lg bg-gray-50 p-2'
            >
              <div className='text-xs text-gray-500'>{label}</div>
              <div className='font-medium'>
                {displayValue} {unit || ''}
              </div>
            </div>
          );
        })}
        <div className='max-h-[100px] w-full min-w-[150px] flex-1 snap-center overflow-y-auto scroll-smooth rounded-lg bg-gray-50 p-2'>
          <div className='mb-1 text-xs text-gray-500'>Porsi Lainnya</div>
          <div className='w-full'>
            {nutrition.data.data['porsi_lainnya (kalori)'] ? (
              (() => {
                try {
                  const portions = JSON.parse(
                    nutrition.data.data['porsi_lainnya (kalori)'],
                  ) as PortionData;
                  return (
                    <ul className='w-full list-disc pl-5 text-xs text-gray-800'>
                      {Object.entries(portions).map(([key, value]) => (
                        <li key={key}>
                          {key}: {(value * quantity).toFixed(2)} kcal
                        </li>
                      ))}
                    </ul>
                  );
                } catch {
                  return (
                    <p className='w-full text-xs text-red-500'>
                      Error loading additional portions.
                    </p>
                  );
                }
              })()
            ) : (
              <p className='w-full text-xs text-gray-500'>
                No additional portions available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPreview;
