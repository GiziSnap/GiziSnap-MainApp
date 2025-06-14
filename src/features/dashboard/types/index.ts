// import type { z } from 'zod';
// import type { foodAddFormSchema, foodUpdateFormSchema } from '../schemas';

export type UserSchema = {
  userinformation?: UserInformationSchema;
  userfoodshistory?: UserFoodhistorySchema[];
  usernutrition?: UserNutritionSchema;
  user_avatar?: File | null;
};

export type UserInformationSchema = {
  id?: string;
  calorieGoal?: number;
  proteinGoal?: number;
  carbsGoal?: number;
  user_avatar?: File;
  username?: string;
  email_address?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
};

export type UserFoodhistorySchema = {
  // --- Kunci & Identitas Utama ---
  id?: number;
  user_id?: number; // Ditambahkan, sepertinya ini adalah foreign key ke user
  name: string;
  quantity: number;
  sumber?: string; // "source"

  // --- Makronutrien Utama ---
  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  // --- Nutrisi Tambahan (baru ditambahkan) ---
  energy?: number | null;
  fiber?: number | null;
  sugar?: number | null;

  // --- Rincian Lemak (baru ditambahkan) ---
  saturatedfat?: number | null;
  monounsaturatedfat?: number | null;
  polyunsaturatedfat?: number | null;

  // --- Mineral & Lainnya (baru ditambahkan) ---
  cholesterol?: number | null;
  sodium?: number | null;
  potassium?: number | null;

  // --- Timestamps ---
  created_at?: string;
  updated_at?: string;
};

export type UserNutritionSchema = {
  id: number;
  calories: number;
  protein: number;
  carbs: number;
  sumber?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

// export type FoodAddFormSchema = z.infer<typeof foodAddFormSchema>;
// export type FoodUpdateFormSchema = z.infer<typeof foodUpdateFormSchema>;
