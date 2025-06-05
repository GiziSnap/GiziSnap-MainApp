import { useGetUsersData } from '../hooks/useGetUsersData';
import { useSession } from 'next-auth/react';
import type {
  UserFoodhistorySchema,
  UserInformationSchema,
  UserNutritionSchema,
  UserSchema,
} from '../types';

export const useUserData = () => {
  // const { data: session, status } = useSession();

  const {
    data: userDataSchema,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersData();

  const userInfo: UserInformationSchema =
    (userDataSchema as UserSchema)?.userinformation ?? {};
  const userFoodshistories: UserFoodhistorySchema[] =
    (userDataSchema as UserSchema)?.userfoodshistory ?? [];
  const userNutrition: UserNutritionSchema = (userDataSchema as UserSchema)
    ?.usernutrition ?? {
    id: 0,
    user_id: 0,
    created_at: '',
    updated_at: '',
    calories: 0,
    protein: 0,
    carbs: 0,
  };
  return {
    userInfo,
    isLoading,
    isError,
    error,
    userFoodshistories,
    userNutrition,
    refetch,
    // sessionStatus: status,
  };
};
