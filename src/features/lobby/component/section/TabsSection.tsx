
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function TabsSection() {

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">Bagaimana Cara Menggunakan GiziSnap?</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Berikut adalah penjelasan singkat bagaimana cara sistem kami digunakan untuk melacak dan memahami nutrisi makanan Anda.
                </p>
            </div>

            <Tabs defaultValue="mulai" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-4 max-md:grid-cols-2">
                    <TabsTrigger value="mulai">Memulai</TabsTrigger>
                    <TabsTrigger value="fitur">Fitur Utama</TabsTrigger>
                    <TabsTrigger value="tips">Tips & Keamanan</TabsTrigger>
                </TabsList>

                <TabsContent value="mulai">
                    <Card>
                        <CardHeader>
                            <CardTitle>Memulai Perjalanan Nutrisi</CardTitle>
                            <CardDescription>Langkah awal menggunakan GiziSnap</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Persiapan</h3>
                                    <p className="text-base text-muted-foreground">
                                        Buka website GiziSnap melalui browser smartphone Anda.
                                        Tidak perlu download aplikasi khusus – kami hadir sebagai
                                        Progressive Web App yang dapat diakses dari mana saja.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Registrasi</h3>
                                    <p className="text-base text-muted-foreground">
                                        Buat akun dengan cepat menggunakan email. Lengkapi profil
                                        kesehatan dasar seperti usia, berat, dan tinggi badan untuk
                                        mendapatkan rekomendasi nutrisi personal.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="fitur">
                    <Card>
                        <CardHeader>
                            <CardTitle>Fitur Utama GiziSnap</CardTitle>
                            <CardDescription>Cara kerja sistem pemindaian nutrisi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Pemindaian Makanan</h3>
                                    <p className="text-base text-muted-foreground">
                                        Gunakan kamera untuk memindai makanan atau input manual.
                                        Teknologi AI kami secara instan mengenali jenis makanan
                                        dan menganalisis komposisi nutrisinya.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Analisis Nutrisi</h3>
                                    <p className="text-base text-muted-foreground">
                                        Dapatkan informasi detail seperti kalori, protein,
                                        karbohidrat, lemak, dan vitamin. Grafik riwayat
                                        membantu Anda memantau asupan gizi harian.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tips">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tips & Keamanan</CardTitle>
                            <CardDescription>Maksimalkan pengalaman dan lindungi privasi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Tips Penggunaan</h3>
                                    <p className="text-base text-muted-foreground">
                                        Gunakan pencahayaan baik saat memindai. Pindai sebelum
                                        makan untuk analisis akurat. Perbarui profil kesehatan
                                        secara berkala.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Keamanan Data</h3>
                                    <p className="text-base text-muted-foreground">
                                        Data Anda diamankan dengan enkripsi tingkat lanjut.
                                        Kami menjamin privasi dan kontrol penuh atas
                                        informasi kesehatan pribadi Anda.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}