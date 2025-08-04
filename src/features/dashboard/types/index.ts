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

/*
|--------------------------------------------------------------------------
| File: src/types/index.ts
|--------------------------------------------------------------------------
|
| File ini berisi definisi tipe TypeScript yang digunakan di seluruh 
| aplikasi untuk memastikan konsistensi dan keamanan data.
|
*/

// Tipe untuk informasi yang diterima dari endpoint info model rekomendasi
export interface RecommendationInfo {
  modelType: string;
  version: string;
  modelJsonPath: string | null;
  labelJsonPath: string | null;
  labelJsonVersion: string;
  message: string;
  scalerXVersion?: string;
  scalerXPath?: string;
  scalerYVersion?: string;
  scalerYPath?: string;
  metadataVersion: string;
  metadataPath: string | null;
}

// Tipe untuk setiap item dalam file label makanan
export interface FoodLabel {
  nama_makanan: string;
  label: string;
  region: string;
  availability: string;
  origin: string;
}

// Tipe untuk metadata model rekomendasi
export interface FoodRecommendationMetadata {
  nutritional_columns: string[];
  daily_requirements: Record<string, number>;
}

// Tipe untuk informasi yang diterima dari endpoint info model deteksi
export interface DetectionInfo {
  modelType: string;
  version: string;
  modelJsonPath: string;
  labelJsonPath: string;
  labelJsonVersion: string;
  message: string;
}

// Tipe untuk data label dari model deteksi
export interface DetectionLabels {
  labels: string[];
}

// Anda mungkin juga perlu menambahkan atau menyesuaikan tipe ini
export interface UserFoodHistory {
  id: string;
  user_id: string;
  food_name: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
  [key: string]: unknown; // Untuk properti nutrisi dinamis lainnya
}

// export type FoodAddFormSchema = z.infer<typeof foodAddFormSchema>;
// export type FoodUpdateFormSchema = z.infer<typeof foodUpdateFormSchema>;
