import { useQuery } from '@tanstack/react-query';
import mlAxios from '@/lib/axios/mlAxios';

type ApiResponse = {
  data: string[][];
};

export const useFoodList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-all-food-names'],
    queryFn: async () => {
      const response = await mlAxios.get<ApiResponse>(
        '/api/sheet-data/Result_Food_Name_List',
      );
      const foodNames = response.data.data
        .slice(1)
        .map((row) => row[0])
        .filter(Boolean);
      return foodNames;
    },
    staleTime: Infinity,
  });

  return { allFoodNames: data ?? [], isLoading };
};

export default useFoodList;
