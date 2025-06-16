'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { MainLoading } from '@/components/MainLoading';
import { useSession } from 'next-auth/react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  HeartPulse,
  List,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import NutritionCard from '../components/NutritionCard';
import UserCard from '../components/UserCard';
import PersonalizedRecommendationsCard, {
  type FoodRecommendation,
} from '../components/PersonalizedRecommendationsCard';
import WeeklyNutritionAnalysisCard from '../components/WeeklyNutritionAnalysisCard';
import FoodOriginAnalysis from '../components/FoodOriginAnalysis';
import { Calendar } from '@/components/ui/calendar';
import { useUserData } from '../utils/useUserData';
import { FoodLogSection } from '../components/section/FoodLogSection';
import { isAfter, isSameDay, format } from 'date-fns';
import { toast } from 'sonner';
import useLoadRecommendationModel from '../hooks/useLoadRecommedationModel';
import * as tf from '@tensorflow/tfjs';

type FoodData = {
  food_name: string;
  calories?: number;
  [key: string]: string | number | undefined;
};

type DailyNeeds = Record<string, number>;

export const DashboardPage = () => {
  const [isRecoModalOpen, setIsRecoModalOpen] = useState(false);
  const [recoFoodToLog, setRecoFoodToLog] = useState<
    Partial<FoodData> | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { status } = useSession();
  const { userInfo, refetch, userFoodshistories, userAvatar } = useUserData();
  const {
    recoModel,
    foodLabels,
    foodMetadata,
    allNutritions,
    isLoading: isModelLoading,
  } = useLoadRecommendationModel();

  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>(
    [],
  );
  const [isRecoGenerating, setIsRecoGenerating] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Jakarta');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // State untuk paginasi rekomendasi
  const [localRecPage, setLocalRecPage] = useState(0);
  const [generalRecPage, setGeneralRecPage] = useState(0);

  const locations = [
    'Jakarta',
    'Bali',
    'Yogyakarta',
    'Surabaya',
    'Bandung',
    'Medan',
    'Makassar',
    'Palembang',
    'Semarang',
    'Padang',
    'Bengkulu',
    'Jambi',
    'Riau',
    'Sumatra Utara',
  ];

  const dataUser = useMemo(
    () => ({
      userName: userInfo?.username ?? 'User',
      userAvatar: userAvatar ?? '',
      userAvatarFallback: userInfo?.username?.charAt(0) ?? 'U',
    }),
    [userInfo, userAvatar],
  );

  const loggedFoodsOnSelectedDate = useMemo(() => {
    if (!userFoodshistories) return [];
    return userFoodshistories.filter(
      (food) =>
        food.created_at && isSameDay(new Date(food.created_at), selectedDate),
    );
  }, [userFoodshistories, selectedDate]);

  // Reset paginasi jika konteks (lokasi, tanggal, data makanan) berubah
  useEffect(() => {
    setLocalRecPage(0);
    setGeneralRecPage(0);
  }, [selectedLocation, selectedDate, userFoodshistories]);

  const generateRecommendations = useCallback(async () => {
    setIsRecoGenerating(true);

    try {
      if (
        !recoModel ||
        !foodLabels ||
        !foodMetadata ||
        !allNutritions ||
        !userInfo ||
        !foodMetadata.nutritional_columns ||
        !foodMetadata.daily_requirements ||
        Object.keys(allNutritions).length === 0 ||
        loggedFoodsOnSelectedDate.length === 0
      ) {
        setRecommendations([]);
        return;
      }

      const nutritional_columns = foodMetadata.nutritional_columns;
      const consumedNutrition: Record<
        (typeof nutritional_columns)[number],
        number
      > = {};
      nutritional_columns.forEach((col) => {
        consumedNutrition[col] = 0;
      });

      loggedFoodsOnSelectedDate.forEach((food) => {
        nutritional_columns.forEach((col) => {
          const value = parseFloat(food[col as keyof typeof food] as string);
          if (!isNaN(value)) {
            consumedNutrition[col]! += value;
          }
        });
      });

      const dailyNeeds: DailyNeeds = foodMetadata.daily_requirements;
      const nutritionDeficiency = nutritional_columns.map((col) =>
        Math.max(0, (dailyNeeds[col] ?? 0) - (consumedNutrition[col] ?? 0)),
      );

      const inputTensor = tf.tensor2d([nutritionDeficiency]);
      const prediction = recoModel.predict(inputTensor) as tf.Tensor;
      const scores = await prediction.data();
      tf.dispose([inputTensor, prediction]);

      const eatenFoodNames = new Set(
        loggedFoodsOnSelectedDate.map((f) => f.name),
      );

      const allPossibleRecs = foodLabels
        .map((food, index) => {
          if (!allNutritions[food.nama_makanan]) {
            console.warn(`Missing nutrition data for: ${food.nama_makanan}`);
            return null;
          }
          return {
            name: food.nama_makanan,
            region: food.region || 'N/A',
            origin: food.origin || 'N/A',
            is_general: (food.availability || '').toLowerCase() === 'general',
            score: scores[index] ?? 0,
            nutrition: allNutritions[food.nama_makanan] ?? {},
            calories:
              parseFloat(
                String(
                  allNutritions[food.nama_makanan]?.['kalori (kkal)'] ?? '0',
                ),
              ) ?? 0,
          };
        })
        .filter(Boolean)
        .filter(
          (food) => !eatenFoodNames.has(food!.name),
        ) as FoodRecommendation[];

      // Logika paginasi untuk rekomendasi LOKAL
      const allLocalRecs = allPossibleRecs
        .filter((food) =>
          (food.region || '')
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()),
        )
        .sort((a, b) => b.score - a.score);

      let localRecs = allLocalRecs.slice(
        localRecPage * 4,
        localRecPage * 4 + 4,
      );
      if (localRecs.length === 0 && allLocalRecs.length > 0) {
        setLocalRecPage(0); // Kembali ke halaman pertama jika sudah habis
        localRecs = allLocalRecs.slice(0, 4);
      }

      const localRecNames = new Set(localRecs.map((r) => r.name));

      // Logika paginasi untuk rekomendasi UMUM
      const allGeneralRecs = allPossibleRecs
        .filter((food) => food.is_general && !localRecNames.has(food.name))
        .sort((a, b) => b.score - a.score);

      let generalRecs = allGeneralRecs.slice(
        generalRecPage * 4,
        generalRecPage * 4 + 4,
      );
      if (generalRecs.length === 0 && allGeneralRecs.length > 0) {
        setGeneralRecPage(0); // Kembali ke halaman pertama
        generalRecs = allGeneralRecs.slice(0, 4);
      }

      const newRecommendations = [...localRecs, ...generalRecs];
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error('Error generating recommendations with new logic:', error);
      toast.error('Gagal membuat rekomendasi berbasis ML.');
      setRecommendations([]);
    } finally {
      setIsRecoGenerating(false);
    }
  }, [
    recoModel,
    foodLabels,
    foodMetadata,
    allNutritions,
    userInfo,
    loggedFoodsOnSelectedDate,
    selectedLocation,
    localRecPage,
    generalRecPage,
  ]);

  // Handler untuk tombol refresh, hanya menaikkan halaman
  const handleRefreshRecommendations = useCallback(() => {
    toast.info('Mencari rekomendasi baru...');
    setLocalRecPage((prev) => prev + 1);
    setGeneralRecPage((prev) => prev + 1);
  }, []);

  // Panggil generateRecommendations ketika dependensinya berubah
  useEffect(() => {
    void generateRecommendations();
  }, [generateRecommendations]);

  const handleAddFoodFromRecommendation = (food: FoodRecommendation) => {
    const foodDataToLog: Partial<FoodData> = {
      food_name: food.name,
      'kalori (kkal)': food.calories,
      ...food.nutrition,
    };
    setRecoFoodToLog(foodDataToLog);
    setIsRecoModalOpen(true);
  };

  const onAddSuccess = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const historyDates = useMemo(() => {
    if (!userFoodshistories) return [];
    return userFoodshistories
      .filter(
        (food): food is typeof food & { created_at: string } =>
          !!food.created_at,
      )
      .map((food) => format(new Date(food.created_at), 'yyyy-MM-dd'))
      .filter((date) => !!date);
  }, [userFoodshistories]);

  const detailedNutritionData = useMemo(() => {
    const nutritionDetails = [
      {
        key: 'kalori (kkal)',
        label: 'Kalori',
        unit: 'kcal',
        target: userInfo?.calorieGoal ?? 2000,
        color: 'blue',
      },
      {
        key: 'energi (kj)',
        label: 'Energi',
        unit: 'kJ',
        target: (userInfo?.calorieGoal ?? 2000) * 4.184,
        color: 'yellow',
      },
      {
        key: 'protein (g)',
        label: 'Protein',
        unit: 'g',
        target: userInfo?.proteinGoal ?? 56,
        color: 'green',
      },
      {
        key: 'karbohidrat (g)',
        label: 'Karbohidrat',
        unit: 'g',
        target: userInfo?.carbsGoal ?? 275,
        color: 'purple',
      },
      {
        key: 'lemak (g)',
        label: 'Lemak Total',
        unit: 'g',
        target: 65,
        color: 'red',
      },
      {
        key: 'lemak jenuh (g)',
        label: 'Lemak Jenuh',
        unit: 'g',
        target: 20,
        color: 'pink',
      },
      {
        key: 'lemak tak jenuh ganda (g)',
        label: 'Lemak Tak Jenuh Ganda',
        unit: 'g',
        target: 20,
        color: 'indigo',
      },
      {
        key: 'lemak tak jenuh tunggal (g)',
        label: 'Lemak Tak Jenuh Tunggal',
        unit: 'g',
        target: 25,
        color: 'blue',
      },
      {
        key: 'kolesterol (mg)',
        label: 'Kolesterol',
        unit: 'mg',
        target: 300,
        color: 'yellow',
      },
      {
        key: 'serat (g)',
        label: 'Serat',
        unit: 'g',
        target: 30,
        color: 'green',
      },
      {
        key: 'gula (g)',
        label: 'Gula',
        unit: 'g',
        target: 50,
        color: 'purple',
      },
      {
        key: 'sodium (mg)',
        label: 'Sodium',
        unit: 'mg',
        target: 2300,
        color: 'red',
      },
      {
        key: 'kalium (mg)',
        label: 'Kalium',
        unit: 'mg',
        target: 3500,
        color: 'pink',
      },
    ];
    const totalNutrition: Record<string, number> = {};
    nutritionDetails.forEach((detail) => {
      totalNutrition[detail.key] = 0;
    });

    const keyMap: Record<string, string> = {
      'kalori (kkal)': 'calories',
      'energi (kj)': 'energy',
      'protein (g)': 'protein',
      'karbohidrat (g)': 'carbs',
      'lemak (g)': 'fat',
      'lemak jenuh (g)': 'saturatedfat',
      'lemak tak jenuh ganda (g)': 'polyunsaturatedfat',
      'lemak tak jenuh tunggal (g)': 'monounsaturatedfat',
      'gula (g)': 'sugar',
      'serat (g)': 'fiber',
      'sodium (mg)': 'sodium',
      'kolesterol (mg)': 'cholesterol',
      'kalium (mg)': 'potassium',
    };

    loggedFoodsOnSelectedDate.forEach((food) => {
      nutritionDetails.forEach((detail) => {
        const primaryKey = detail.key;
        const fallbackKey = keyMap[primaryKey];
        let value = 0;
        let rawValue = food[primaryKey as keyof typeof food];
        if (rawValue !== null && rawValue !== undefined) {
          value = parseFloat(rawValue as string);
        } else if (
          fallbackKey &&
          Object.prototype.hasOwnProperty.call(food, fallbackKey)
        ) {
          rawValue = food[fallbackKey as keyof typeof food];
          if (rawValue !== null && rawValue !== undefined) {
            value = parseFloat(rawValue as string);
          }
        }
        if (!isNaN(value)) {
          totalNutrition[primaryKey] =
            (totalNutrition[primaryKey] ?? 0) + value;
        }
      });
    });

    return nutritionDetails.map((detail) => ({
      ...detail,
      consumed: totalNutrition[detail.key] ?? 0,
      progress:
        detail.target > 0
          ? ((totalNutrition[detail.key] ?? 0) / detail.target) * 100
          : 0,
    }));
  }, [loggedFoodsOnSelectedDate, userInfo]);

  const summaryNutritionData = useMemo(() => {
    const mainNutrients = ['Kalori', 'Protein', 'Karbohidrat', 'Lemak Total', 'Gula', 'Sodium', 'Kalium', 'Kolesterol', 'Serat'];
    return detailedNutritionData.filter((item) =>
      mainNutrients.includes(item.label),
    );
  }, [detailedNutritionData]);

  const healthAssessment = useMemo(() => {
    if (loggedFoodsOnSelectedDate.length === 0) {
      return {
        status: 'empty',
        title: 'Belum Ada Data',
        description: 'Catat makananmu untuk melihat penilaian kesehatan.',
        messages: [],
        icon: HeartPulse,
        color: 'text-gray-500',
        bg: 'bg-gray-100',
      };
    }
    let status: 'good' | 'warning' | 'danger' = 'good';
    const messages: string[] = [];
    const nutrientsToCheck = [
      { label: 'Kalori', low: 80, high: 110 },
      { label: 'Lemak Total', low: 70, high: 120 },
      { label: 'Lemak Jenuh', low: 0, high: 110 },
      { label: 'Gula', low: 0, high: 110 },
      { label: 'Sodium', low: 0, high: 100 },
      { label: 'Serat', low: 75, high: 200 },
    ];
    nutrientsToCheck.forEach((nutrient) => {
      const data = detailedNutritionData.find(
        (d) => d.label === nutrient.label,
      );
      if (data) {
        if (data.progress > nutrient.high) {
          messages.push(
            `Asupan ${nutrient.label.toLowerCase()} Anda terlalu tinggi.`,
          );
          status = 'danger';
        } else if (data.progress < nutrient.low) {
          messages.push(
            `Asupan ${nutrient.label.toLowerCase()} Anda masih kurang.`,
          );
          if (status !== 'danger') status = 'warning';
        }
      }
    });
    if (status === 'good' && messages.length === 0) {
      messages.push('Keseimbangan nutrisi Anda berada dalam rentang sehat.');
    }
    const assessmentDetails = {
      good: {
        title: 'Pola Makan Sehat!',
        description: 'Terus pertahankan pola makan seimbang Anda.',
        icon: CheckCircle2,
        color: 'text-green-500',
        bg: 'bg-green-100',
      },
      warning: {
        title: 'Perlu Perhatian',
        description: 'Beberapa asupan nutrisi Anda masih kurang.',
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bg: 'bg-yellow-100',
      },
      danger: {
        title: 'Perlu Perbaikan',
        description: 'Beberapa asupan nutrisi Anda berlebihan.',
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-100',
      },
      empty: {
        title: 'Belum Ada Data',
        description: 'Catat makananmu untuk melihat penilaian kesehatan.',
        icon: HeartPulse,
        color: 'text-gray-500',
        bg: 'bg-gray-100',
      },
    };
    return { ...assessmentDetails[status], messages };
  }, [detailedNutritionData, loggedFoodsOnSelectedDate]);

  const isToday = useMemo(
    () => isSameDay(selectedDate, new Date()),
    [selectedDate],
  );
  const isDateDisabled = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const historySet = new Set(historyDates);
    return (date: Date) =>
      isAfter(date, today) ||
      (!isSameDay(date, today) && !historySet.has(format(date, 'yyyy-MM-dd')));
  }, [historyDates]);

  if (status === 'loading') return <MainLoading />;

  return (
    <PageContainer title='Dashboard' withFooter withHeader isDashboard>
      <SectionContainer padded container className='min-h-screen'>
        <main className='mx-auto w-full px-4 py-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-screen-lg xl:max-w-[1280px] 2xl:max-w-screen-xl'>
          <UserCard
            {...dataUser}
            {...{ selectedLocation, setSelectedLocation, locations }}
          />
          <div className='mb-6 flex flex-col gap-4 md:flex-row'>
            <section className='w-full rounded-2xl bg-white p-4 shadow-md md:w-1/3'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                  Pilih Tanggal
                </h3>
                <Button
                  variant='outline'
                  className='rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 md:px-3 md:text-sm'
                  onClick={() => setSelectedDate(new Date())}
                  disabled={isToday}
                >
                  <CalendarIcon className='mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4' />
                  {isToday ? 'Hari Ini' : 'Atur Ulang'}
                </Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className='w-full justify-start text-left text-sm font-normal md:text-base'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDate ? (
                      format(selectedDate, 'PPP')
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </section>
            <NutritionCard
              title='Ringkasan Nutrisi Harian'
              items={summaryNutritionData}
            />
          </div>

          <div className='mb-6 flex flex-col gap-4 md:flex-row'>
            <section className='w-full rounded-2xl bg-white p-4 shadow-md md:w-1/2'>
              <div className='mb-3 flex items-center'>
                <HeartPulse className='mr-2 h-5 w-5 text-red-500' />
                <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                  Penilaian Kesehatan
                </h3>
              </div>
              <div className='mb-3 rounded-lg bg-gray-50 p-3'>
                <div className='mb-2 flex items-start'>
                  <div
                    className={`mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full md:h-10 md:w-10 ${healthAssessment.bg}`}
                  >
                    {((Icon) => (
                      <Icon
                        className={`h-5 w-5 md:h-6 md:w-6 ${healthAssessment.color}`}
                      />
                    ))(healthAssessment.icon)}
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-gray-800 md:text-base'>
                      {healthAssessment.title}
                    </h4>
                    <p className='text-xs text-gray-600 md:text-sm'>
                      {healthAssessment.description}
                    </p>
                  </div>
                </div>
                {healthAssessment.messages.length > 0 && (
                  <ul className='mt-2 list-disc pl-5 text-xs text-gray-700 md:text-sm'>
                    {healthAssessment.messages.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            <FoodOriginAnalysis />
          </div>

          <div className='mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='lg:col-span-1'>
              <FoodLogSection
                refetch={refetch}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
            <div className='lg:col-span-2'>
              <PersonalizedRecommendationsCard
                {...{ recommendations, selectedLocation }}
                onRefresh={handleRefreshRecommendations}
                isLoading={isModelLoading || isRecoGenerating}
                loggedFoodsCount={loggedFoodsOnSelectedDate.length}
                onAddFood={handleAddFoodFromRecommendation}
              />
            </div>
          </div>

          <WeeklyNutritionAnalysisCard selectedDate={selectedDate} />

          <section className='mb-6 rounded-2xl bg-white p-4 shadow-md md:p-6'>
            <div className='mb-4 flex items-center md:mb-6'>
              <List className='mr-2 h-5 w-5 text-blue-500' />
              <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                Rincian Nutrisi
              </h3>
            </div>
            <div className='overflow-x-auto'>
              <Table className='min-w-full'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-left text-xs md:text-sm'>
                      Nutrisi
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Dikonsumsi
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Target
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Persentase
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedNutritionData.map((item) => (
                    <TableRow key={item.label}>
                      <TableCell className='font-medium'>
                        {item.label}
                      </TableCell>
                      <TableCell className='text-right'>
                        {item.consumed.toFixed(1)} {item.unit}
                      </TableCell>
                      <TableCell className='text-right'>
                        {item.target > 0
                          ? `${item.target.toFixed(1)} ${item.unit}`
                          : '-'}
                      </TableCell>
                      <TableCell className='text-right'>
                        {item.target > 0 ? `${item.progress.toFixed(0)}%` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};

export default DashboardPage;
