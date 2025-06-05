import { ChartLine } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import { useMemo } from 'react';
import { useUserData } from '../utils/useUserData';
import { id } from 'date-fns/locale';

const WeeklyNutritionAnalysisCard = ({
  selectedDate,
}: {
  selectedDate: Date;
}) => {
  const { userFoodshistories, isLoading } = useUserData();

  const weeklyNutritionChartData = useMemo(() => {
    if (!userFoodshistories || !selectedDate) {
      return [
        { day: 'Senin', calories: 0, protein: 0, carbs: 0 },
        { day: 'Selasa', calories: 0, protein: 0, carbs: 0 },
        { day: 'Rabu', calories: 0, protein: 0, carbs: 0 },
        { day: 'Kamis', calories: 0, protein: 0, carbs: 0 },
        { day: 'Jumat', calories: 0, protein: 0, carbs: 0 },
        { day: 'Sabtu', calories: 0, protein: 0, carbs: 0 },
        { day: 'Minggu', calories: 0, protein: 0, carbs: 0 },
      ];
    }

    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const daysInWeek = eachDayOfInterval({ start, end });

    const result = daysInWeek.map((day) => ({
      day: format(day, 'EEE', { locale: id }),
      calories: 0,
      protein: 0,
      carbs: 0,
    }));

    userFoodshistories.forEach((food) => {
      if (food.created_at) {
        const foodDate = new Date(food.created_at);
        const dayIndex = daysInWeek.findIndex((day) =>
          isSameDay(day, foodDate),
        );
        if (dayIndex >= 0 && result[dayIndex]) {
          result[dayIndex].calories += food.calories || 0;
          result[dayIndex].protein += food.protein || 0;
          result[dayIndex].carbs += food.carbs || 0;
        }
      }
    });

    return result;
  }, [userFoodshistories, selectedDate]);

  return (
    <section className='mb-8 rounded-2xl bg-white shadow-md md:p-4 xl:p-6'>
      <div className='mb-6 flex items-center p-4'>
        <ChartLine className='mr-2 text-purple-500' />
        <h3 className='text-lg font-semibold text-gray-800'>
          Analisis Nutrisi Mingguan
        </h3>
      </div>
      <div className='h-64 w-full'>
        {isLoading ? (
          <div className='flex h-full items-center justify-center'>
            <p className='text-gray-500'>Memuat data...</p>
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={weeklyNutritionChartData}
              margin={{ top: 5, right: 5, left: 0, bottom: 10 }}
            >
              <CartesianGrid vertical={true} strokeDasharray='3 3' />
              <XAxis
                dataKey='day'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={'equidistantPreserveStart'}
                angle={0}
                tick={{ fontSize: 12, fontWeight: 'bold' }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                padding={{ top: 10, bottom: 10 }}
                tick={{ fontSize: 14 }}
              />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='calories'
                stroke='#8884d8'
                dot={true}
                name='Kalori (kcal)'
              />
              <Line
                type='monotone'
                dataKey='protein'
                stroke='#82ca9d'
                dot={true}
                name='Protein (g)'
              />
              <Line
                type='monotone'
                dataKey='carbs'
                stroke='#ffc658'
                dot={true}
                name='Karbohidrat (g)'
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default WeeklyNutritionAnalysisCard;
