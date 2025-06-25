export type FoodData = {
  data: {
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
};

export type FoodDataPreview = {
  data: {
    data: {
      nama_makanan: string;
      'kalori (kkal)': number;
      'karbohidrat (g)': number;
      'protein (g)': number;
      'lemak (g)': number;
      'sodium (mg)': number;
      'kalium (mg)': number;
      'serat (g)': number;
      'porsi_lainnya (kalori)': string;
    };
  };
};

export type NestedNutritionData = {
  status?: string;
  data: {
    nama_makanan: string;
    label?: string;
    sumber?: string;
    ukuran_porsi?: string;
    'kalori (kkal)': string | number;
    'energi (kj)'?: string | number;
    'lemak (g)': string | number;
    'lemak jenuh (g)'?: string | number;
    'lemak tak jenuh ganda (g)'?: string | number;
    'lemak tak jenuh tunggal (g)'?: string | number;
    'kolesterol (mg)'?: string | number;
    'protein (g)': string | number;
    'karbohidrat (g)': string | number;
    'serat (g)': string | number;
    'gula (g)'?: string | number;
    'sodium (mg)': string | number;
    'kalium (mg)': string | number;
    'porsi_lainnya (kalori)': string;
  };
};
