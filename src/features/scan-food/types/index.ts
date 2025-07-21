export interface ApiProps {
  onMutate?: () => void;
  onSuccess?: (data: ApiResponse<UserFoodhistorySchema>) => void;
  onError?: (error: Error) => void;
}

export interface DetectionInfo {
  modelJsonPath: string | null;
  labelJsonPath: string | null;
}

export interface DetectionLabels {
  labels: string[];
}

export interface DetectionResult {
  box: [number, number, number, number];
  label: string;
  score: number;
}

export type FoodData = {
  nama_makanan: string;
  label: string;
  sumber: string;
  ukuran_porsi: string;
  'kalori (kkal)': string;
  'energi (kj)': string;
  'lemak (g)': string;
  'lemak jenuh (g)': string;
  'lemak tak jenuh ganda (g)': string;
  'lemak tak jenuh tunggal (g)': string;
  'kolesterol (mg)': string;
  'protein (g)': string;
  'karbohidrat (g)': string;
  'serat (g)': string;
  'gula (g)': string;
  'sodium (mg)': string;
  'kalium (mg)': string;
  'porsi_lainnya (kalori)': string;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type FoodNutritionResponse = {
  data: {
    data: FoodData;
  };
};

export interface UserFoodhistorySchema {
  name: string;
  quantity: number;
  sumber: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  fiber: number;
  saturatedfat: number;
  monounsaturatedfat: number;
  polyunsaturatedfat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  energy: number;
}

export interface ScannerProps {
  mode: 'camera' | 'upload';
  isCameraReady: boolean;
  isSubmitting: boolean;
  isRealtimeScanning: boolean;
  isAppLoading: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  previewUrls: string[];
  isDetecting: boolean;
  onModeChange: (mode: 'camera' | 'upload') => void;
  onFileChange: (file: File) => void;
  onScanButtonClick: () => void;
}
