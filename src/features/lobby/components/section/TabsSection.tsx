import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function TabsSection() {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-3xl font-bold'>
          Bagaimana Cara Menggunakan GiziSnap?
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          Berikut adalah penjelasan singkat bagaimana cara sistem kami digunakan
          untuk melacak dan memahami nutrisi makanan Anda.
        </p>
      </div>

      <Tabs defaultValue='mulai' className='mx-auto w-full max-w-4xl'>
        <ScrollArea className='w-full'>
          <TabsList className='mb-4 inline-flex w-full space-x-2'>
            <TabsTrigger
              value='mulai'
              className='flex-1 transition-all duration-300 ease-in-out data-[state=active]:bg-green-500 data-[state=active]:text-white'
            >
              Memulai
            </TabsTrigger>
            <TabsTrigger
              value='fitur'
              className='flex-1 transition-all duration-300 ease-in-out data-[state=active]:bg-green-500 data-[state=active]:text-white'
            >
              Fitur Utama
            </TabsTrigger>
            <TabsTrigger
              value='tips'
              className='flex-1 transition-all duration-300 ease-in-out data-[state=active]:bg-green-500 data-[state=active]:text-white'
            >
              Tips & Keamanan
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>

        <TabsContent value='mulai'>
          <Card>
            <CardHeader>
              <CardTitle>Memulai Perjalanan Nutrisi</CardTitle>
              <CardDescription>
                Langkah awal menggunakan GiziSnap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='mb-2 font-semibold'>Persiapan</h3>
                  <p className='text-muted-foreground text-base'>
                    Buka website GiziSnap melalui browser smartphone Anda. Tidak
                    perlu download aplikasi khusus – kami hadir sebagai
                    Progressive Web App yang dapat diakses dari mana saja.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold'>Registrasi</h3>
                  <p className='text-muted-foreground text-base'>
                    Buat akun dengan cepat menggunakan email. Lengkapi profil
                    kesehatan dasar seperti usia, berat, dan tinggi badan untuk
                    mendapatkan rekomendasi nutrisi personal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='fitur'>
          <Card>
            <CardHeader>
              <CardTitle>Fitur Utama GiziSnap</CardTitle>
              <CardDescription>
                Cara kerja sistem pemindaian nutrisi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='mb-2 font-semibold'>Pemindaian Makanan</h3>
                  <p className='text-muted-foreground text-base'>
                    Gunakan kamera untuk memindai makanan atau input manual.
                    Teknologi AI kami secara instan mengenali jenis makanan dan
                    menganalisis komposisi nutrisinya.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold'>Analisis Nutrisi</h3>
                  <p className='text-muted-foreground text-base'>
                    Dapatkan informasi detail seperti kalori, protein,
                    karbohidrat, lemak, dan vitamin. Grafik riwayat membantu
                    Anda memantau asupan gizi harian.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='tips'>
          <Card>
            <CardHeader>
              <CardTitle>Tips & Keamanan</CardTitle>
              <CardDescription>
                Maksimalkan pengalaman dan lindungi privasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className='mb-2 font-semibold'>Tips Penggunaan</h3>
                  <p className='text-muted-foreground text-base'>
                    Gunakan pencahayaan baik saat memindai. Pindai sebelum makan
                    untuk analisis akurat. Perbarui profil kesehatan secara
                    berkala.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold'>Keamanan Data</h3>
                  <p className='text-muted-foreground text-base'>
                    Data Anda diamankan dengan enkripsi tingkat lanjut. Kami
                    menjamin privasi dan kontrol penuh atas informasi kesehatan
                    pribadi Anda.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
