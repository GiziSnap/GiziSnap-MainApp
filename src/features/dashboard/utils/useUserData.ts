import { useEffect, useMemo } from 'react';
import { useGetUsersData } from '../hooks/useGetUsersData';
import { useSession } from 'next-auth/react';
import type {
  UserFoodhistorySchema,
  UserInformationSchema,
  UserNutritionSchema,
  UserSchema,
} from '../types';

export const useUserData = () => {
  const { data: session, status } = useSession();

  const {
    data: userDataSchema,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersData();

  const userInfo = useMemo<UserInformationSchema>(
    () => (userDataSchema as UserSchema)?.userinformation ?? {},
    [userDataSchema],
  );

  const userFoodshistories = useMemo<UserFoodhistorySchema[]>(
    () => (userDataSchema as UserSchema)?.userfoodshistory ?? [],
    [userDataSchema],
  );

  const userNutrition = useMemo<UserNutritionSchema>(
    () =>
      (userDataSchema as UserSchema)?.usernutrition ?? {
        id: 0,
        user_id: 0,
        created_at: '',
        updated_at: '',
        calories: 0,
        protein: 0,
        carbs: 0,
      },
    [userDataSchema],
  );

  const userAvatar = useMemo(
    () => (userDataSchema as UserSchema)?.user_avatar ?? '',
    [userDataSchema],
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem(
        'userFoodshistories',
        JSON.stringify(userFoodshistories),
      );
      localStorage.setItem('userNutrition', JSON.stringify(userNutrition));
      localStorage.setItem('userAvatar', JSON.stringify(userAvatar));
    }
  }, [
    userInfo,
    userFoodshistories,
    userNutrition,
    userAvatar,
    isLoading,
    isError,
  ]);

  return {
    userInfo,
    userAvatar,
    isLoading,
    isError,
    error,
    userFoodshistories,
    userNutrition,
    refetch,
    sessionStatus: status,
  };
};
