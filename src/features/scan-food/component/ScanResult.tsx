import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertTriangle,
  CheckCircle2,
  Drumstick,
  Loader2,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import type { FoodData } from '../types';

export interface FoodDataItem {
  nama_makanan: string;
  ukuran_porsi: string;
  'kalori (kkal)': number;
  'protein (g)': number;
  'karbohidrat (g)': number;
  'lemak (g)': number;
}

export interface FoodQueryResult {
  data: FoodDataItem;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export interface ScanResultsProps {
  detectedFoods: Set<string>;
  userSelections: Map<string, string>;
  foodQueries: FoodQueryResult[];
  potentialMatchesMap: Map<string, string[]>;
  isSubmitting: boolean;
  errorMessage: string;
  onSelectionChange: (detectedLabel: string, selectedFoodName: string) => void;
  onRemoveFood: (foodLabel: string) => void;
  onSubmit: () => void;
  onClearAll: () => void;
}

const ScanResults = ({
  detectedFoods,
  userSelections,
  potentialMatchesMap,
  foodQueries,
  isSubmitting,
  errorMessage,
  onSelectionChange,
  onRemoveFood,
  onSubmit,
  onClearAll,
}: ScanResultsProps) => {
  const selectedNames = useMemo(
    () => Array.from(userSelections.values()),
    [userSelections],
  );

  const allSelectionsMade =
    detectedFoods.size > 0 &&
    Array.from(detectedFoods).every(
      (label) =>
        userSelections.has(label) ||
        (potentialMatchesMap.get(label)?.length ?? 0) === 0,
    );

  return (
    <Card className='border-gray-200/80 shadow-lg'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Hasil Pindaian</CardTitle>
            <CardDescription>
              Pilih makanan untuk melihat detail gizi.
            </CardDescription>
          </div>
          {detectedFoods.size > 0 && (
            <Button
              variant='ghost'
              size='icon'
              onClick={onClearAll}
              className='h-8 w-8'
              title='Hapus semua'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='max-h-[350px] min-h-[150px] overflow-y-auto px-2'>
        {errorMessage && (
          <div className='flex items-center rounded-md bg-red-50 p-3 text-red-600 dark:bg-red-900/20'>
            <AlertTriangle className='mr-2 h-4 w-4' /> {errorMessage}
          </div>
        )}
        {Array.from(detectedFoods).length === 0 && !errorMessage && (
          <p className='py-10 text-center text-gray-500'>
            Belum ada makanan yang dipindai.
          </p>
        )}

        <Accordion type='multiple' className='w-full'>
          {Array.from(detectedFoods).map((detectedLabel) => {
            const potentialMatches =
              potentialMatchesMap.get(detectedLabel) ?? [];
            const selectedName = userSelections.get(detectedLabel);
            const queryIndex = selectedName
              ? selectedNames.indexOf(selectedName)
              : -1;
            const query =
              queryIndex !== -1 ? foodQueries[queryIndex] : undefined;
            const { isFetching, isSuccess, isError, data, error } = query ?? {};
            const nutritionData = data as FoodData | undefined;

            return (
              <AccordionItem
                value={detectedLabel}
                key={detectedLabel}
                className='border-b border-gray-200 dark:border-gray-700'
              >
                <AccordionTrigger className='px-4 py-3 hover:no-underline'>
                  <div className='flex w-full items-center justify-between'>
                    <div className='mr-4 flex items-center gap-3'>
                      <Drumstick className='h-5 w-5 flex-shrink-0 text-emerald-500' />
                      <span className='text-left font-medium text-gray-800 dark:text-gray-200'>
                        {detectedLabel.charAt(0).toUpperCase() +
                          detectedLabel.slice(1).replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      {isFetching && (
                        <Loader2 className='h-4 w-4 animate-spin text-gray-400' />
                      )}
                      {isError && (
                        <div title={error!.message}>
                          <XCircle className='h-5 w-5 text-red-500' />
                        </div>
                      )}
                      {isSuccess && (
                        <CheckCircle2 className='h-5 w-5 text-emerald-500' />
                      )}
                      <div
                        role='button'
                        aria-label={`Hapus ${detectedLabel}`}
                        title={`Hapus ${detectedLabel}`}
                        className='z-10 flex-shrink-0 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700'
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFood(detectedLabel);
                        }}
                      >
                        <Trash2 className='h-4 w-4 text-gray-500' />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='bg-gray-50 p-4 dark:bg-gray-800/50'>
                  {potentialMatches.length === 0 ? (
                    <div className='flex items-center rounded-md bg-yellow-50 p-3 text-sm text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'>
                      <AlertTriangle className='mr-2 h-4 w-4 flex-shrink-0' />
                      <span>Makanan ini belum tersedia di database kami.</span>
                    </div>
                  ) : potentialMatches.length > 1 && !selectedName ? (
                    <div className='pb-2'>
                      <p className='mb-3 text-sm font-semibold'>
                        Pilih variasi yang paling sesuai:
                      </p>
                      <RadioGroup
                        onValueChange={(value) =>
                          onSelectionChange(detectedLabel, value)
                        }
                        className='gap-2'
                      >
                        {potentialMatches.map((match, matchIndex) => (
                          <div
                            key={`${match}-${matchIndex}`}
                            className='flex items-center space-x-2'
                          >
                            <RadioGroupItem
                              value={match}
                              id={`${detectedLabel}-${match}-${matchIndex}`}
                            />
                            <Label
                              htmlFor={`${detectedLabel}-${match}-${matchIndex}`}
                            >
                              {match}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ) : (
                    <>
                      {isFetching && (
                        <p className='text-sm text-gray-500'>
                          Memuat detail untuk {selectedName}...
                        </p>
                      )}
                      {isError && (
                        <p className='text-sm text-red-500'>{error?.message}</p>
                      )}
                      {isSuccess && nutritionData && (
                        <div className='space-y-1.5 border-l-2 border-emerald-500 pl-4 text-sm text-gray-700 dark:text-gray-300'>
                          <p className='text-base font-semibold text-emerald-600 dark:text-emerald-400'>
                            {nutritionData.nama_makanan}
                          </p>
                          <div className='flex justify-between'>
                            <span>Ukuran Porsi:</span>{' '}
                            <span>{nutritionData.ukuran_porsi}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Kalori:</span>{' '}
                            <span className='font-bold'>
                              {nutritionData['kalori (kkal)']} kkal
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Protein:</span>{' '}
                            <span>{nutritionData['protein (g)']} g</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Karbohidrat:</span>{' '}
                            <span>{nutritionData['karbohidrat (g)']} g</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Lemak:</span>{' '}
                            <span>{nutritionData['lemak (g)']} g</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
      {detectedFoods.size > 0 && (
        <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
          <Button
            onClick={onSubmit}
            className='w-full bg-emerald-500 text-white hover:bg-emerald-600'
            disabled={!allSelectionsMade || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Menyimpan...
              </>
            ) : allSelectionsMade ? (
              'Simpan ke Riwayat'
            ) : (
              'Pilih semua variasi'
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ScanResults;
