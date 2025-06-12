'use client';

import { PageContainer, SectionContainer } from '@/components/layouts';
import { MainLoading } from '@/components/MainLoading';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, HeartPulse, List } from 'lucide-react';
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
import PersonalizedRecommendationsCard from '../components/PersonalizedRecommendationsCard';
import WeeklyNutritionAnalysisCard from '../components/WeeklyNutritionAnalysisCard';
import FoodOriginAnalysis from '../components/FoodOriginAnalysis';
import { Calendar } from '@/components/ui/calendar';
import { useUserData } from '../utils/useUserData';
import { FoodLogSection } from '../components/section/FoodLogSection';
import { isAfter, isSameDay, format } from 'date-fns';

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Jakarta');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { status } = useSession();
  const { userInfo, refetch, userFoodshistories, userAvatar } = useUserData();

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
  ];

  // Data pengguna untuk UserCard
  const dataUser = useMemo(
    () => ({
      userName: userInfo?.username ?? 'User',
      userAvatar: userAvatar ?? '',
      userAvatarFallback: userInfo?.username?.charAt(0) ?? 'U',
    }),
    [userInfo],
  );

  // Membuat daftar tanggal dengan riwayat dari userFoodshistories
  const historyDates = useMemo(() => {
    if (!userFoodshistories) return [];
    const dates = userFoodshistories
      .filter(
        (food): food is typeof food & { created_at: string } =>
          !!food.created_at,
      )
      .map((food) => {
        const date = new Date(food.created_at);
        return format(date, 'yyyy-MM-dd');
      })
      .filter((date) => date && date !== '');
    return dates;
  }, [userFoodshistories]);

  // Menghitung total nutrisi berdasarkan tanggal yang dipilih
  const nutritionData = useMemo(() => {
    if (!userFoodshistories || !selectedDate) {
      return [
        {
          label: 'Kalori',
          consumed: 0,
          target: 2000,
          unit: 'kcal',
          color: 'green',
          progress: 0,
        },
        {
          label: 'Protein',
          consumed: 0,
          target: 56,
          unit: 'g',
          color: 'blue',
          progress: 0,
        },
        {
          label: 'Karbohidrat',
          consumed: 0,
          target: 275,
          unit: 'g',
          color: 'red',
          progress: 0,
        },
        {
          label: 'Lemak',
          consumed: 0,
          target: 65,
          unit: 'g',
          color: 'yellow',
          progress: 0,
        },
      ];
    }

    const todayString = format(selectedDate, 'yyyy-MM-dd');
    const totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    userFoodshistories.forEach((food) => {
      const foodDate =
        food.created_at && !isNaN(new Date(food.created_at).getTime())
          ? format(new Date(food.created_at), 'yyyy-MM-dd')
          : '';
      if (foodDate === todayString) {
        totalNutrition.calories += food.calories || 0;
        totalNutrition.protein += food.protein || 0;
        totalNutrition.carbs += food.carbs || 0;
        totalNutrition.fat += food.fat || 0;
      }
    });

    const calorieTarget = userInfo?.calorieGoal ?? 2000;
    const proteinTarget = userInfo?.proteinGoal ?? 56;
    const carbsTarget = userInfo?.carbsGoal ?? 275;

    return [
      {
        label: 'Kalori',
        consumed: totalNutrition.calories,
        target: calorieTarget,
        unit: 'kcal',
        color: 'green',
        progress: (totalNutrition.calories / calorieTarget) * 100,
      },
      {
        label: 'Protein',
        consumed: totalNutrition.protein,
        target: proteinTarget,
        unit: 'g',
        color: 'blue',
        progress: (totalNutrition.protein / proteinTarget) * 100,
      },
      {
        label: 'Karbohidrat',
        consumed: totalNutrition.carbs,
        target: carbsTarget,
        unit: 'g',
        color: 'red',
        progress: (totalNutrition.carbs / carbsTarget) * 100,
      },
    ];
  }, [userFoodshistories, selectedDate, userInfo]);

  // useEffect(() => {
  //   if (status === 'loading') return;
  //   if (status === 'authenticated' && userInfo?.username) {
  //     toast.success(`Selamat datang ${userInfo.username}`, {
  //       description: 'Selamat datang di dashboard',
  //       richColors: true,
  //       duration: 3000,
  //       icon: '🎉',
  //     });
  //   }
  // }, [status, userInfo]);

  // Mengecek apakah tanggal yang dipilih adalah hari ini
  const isToday = useMemo(() => {
    const today = new Date();
    return selectedDate && selectedDate.toDateString() === today.toDateString();
  }, [selectedDate]);

  // Fungsi untuk menonaktifkan tanggal tanpa riwayat atau di masa depan, kecuali hari ini
  const isDateDisabled = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Akhir hari ini
    const historySet = new Set(historyDates);

    return (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const isTodayDate = isSameDay(date, new Date());
      return isAfter(date, today) || (!isTodayDate && !historySet.has(dateStr));
    };
  }, [historyDates]);

  // Tampilan loading saat sesi masih dimuat
  if (status === 'loading') {
    return <MainLoading />;
  }

  return (
    <PageContainer title='Dashboard' withFooter withHeader isDashboard>
      <SectionContainer padded container className='min-h-screen'>
        <main className='mx-auto w-full px-4 py-6 sm:max-w-[640px] md:max-w-[768px] lg:max-w-screen-lg xl:max-w-[1280px] 2xl:max-w-screen-xl'>
          {/* Profile and Location Section */}
          <UserCard
            // userAvatar={dataUser.userAvatar}
            userAvatar={dataUser.userAvatar}
            userAvatarFallback={dataUser.userAvatarFallback}
            userName={dataUser.userName}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            locations={locations}
          />

          {/* Date Selector and Summary */}
          <div className='mb-6 flex flex-col gap-4 md:flex-row'>
            <section className='w-full rounded-2xl bg-white p-4 shadow-md md:w-1/3'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                  Select Date
                </h3>
                <Button
                  variant='outline'
                  className='rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 md:px-3 md:text-sm'
                  onClick={() => setSelectedDate(new Date())}
                >
                  <CalendarIcon className='mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4' />
                  {isToday ? 'Today' : 'Reset'}
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
                      selectedDate.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date: Date | undefined) =>
                      date && setSelectedDate(date)
                    }
                    disabled={isDateDisabled}
                  />
                </PopoverContent>
              </Popover>
            </section>
            <NutritionCard
              title='Daily Nutrition Summary'
              items={nutritionData}
            />
          </div>

          {/* Health Assessment and Food Origin */}
          <div className='mb-6 flex flex-col gap-4 md:flex-row'>
            <section className='w-full rounded-2xl bg-white p-4 shadow-md md:w-1/2'>
              <div className='mb-3 flex items-center'>
                <HeartPulse className='mr-2 h-5 w-5 text-red-500' />
                <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                  Health Assessment
                </h3>
              </div>
              <div className='mb-3 rounded-lg bg-gray-50 p-3'>
                <div className='mb-2 flex items-center'>
                  <div className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500 md:h-10 md:w-10'>
                    ✓
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-gray-800 md:text-base'>
                      Your diet looks good!
                    </h4>
                    <p className='text-xs text-gray-600 md:text-sm'>
                      Your nutritional balance is within healthy ranges.
                    </p>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2 md:gap-3'>
                <div className='rounded-lg bg-gray-50 p-2 md:p-3'>
                  <div className='mb-1 text-xs font-medium text-gray-600 md:text-sm'>
                    Balanced Diet Score
                  </div>
                  <div className='flex items-center'>
                    <div className='mr-1 text-lg font-bold text-gray-800 md:mr-2 md:text-xl'>
                      85
                    </div>
                    <div className='text-xs text-green-600'>↑ Good</div>
                  </div>
                </div>
                <div className='rounded-lg bg-gray-50 p-2 md:p-3'>
                  <div className='mb-1 text-xs font-medium text-gray-600 md:text-sm'>
                    Nutrient Variety
                  </div>
                  <div className='flex items-center'>
                    <div className='mr-1 text-lg font-bold text-gray-800 md:mr-2 md:text-xl'>
                      72
                    </div>
                    <div className='text-xs text-yellow-600'>− Average</div>
                  </div>
                </div>
              </div>
            </section>
            <FoodOriginAnalysis />
          </div>

          {/* Food Log and Recommendations */}
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <FoodLogSection
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              refetch={refetch}
            />
            <PersonalizedRecommendationsCard />
          </div>

          {/* Weekly Analysis */}
          <WeeklyNutritionAnalysisCard selectedDate={selectedDate} />

          {/* Nutritional Details */}
          <section className='mb-6 rounded-2xl bg-white p-4 shadow-md md:p-6'>
            <div className='mb-4 flex items-center md:mb-6'>
              <List className='mr-2 h-5 w-5 text-blue-500' />
              <h3 className='text-base font-semibold text-gray-800 md:text-lg'>
                Detailed Nutritional Breakdown
              </h3>
            </div>
            <div className='overflow-x-auto'>
              <Table className='min-w-full'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-left text-xs md:text-sm'>
                      Nutrient
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Consumed
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Goal
                    </TableHead>
                    <TableHead className='text-right text-xs md:text-sm'>
                      Percentage
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{/* Data will be populated here */}</TableBody>
              </Table>
            </div>
          </section>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};

export default DashboardPage;
