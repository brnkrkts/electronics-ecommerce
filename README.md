Bu proje, elektronik ürünlerin listelenip satın alınabildiği tam donanımlı bir e-ticaret platformudur.  
2 ayrı Next.js uygulamasından oluşur:

- front/ → Kullanıcı arayüzü (müşteri tarafı)
- admin/ → Yönetim paneli (ürün, kategori, sipariş, görsel yönetimi)

Her iki uygulama bağımsız geliştirilmiş olup tek bir repo içinde toplanmıştır.

Özellikler

Front (Kullanıcı Arayüzü)
- Ürün listeleme
- Ürün detay sayfası
- Sepet sistemi
- Stripe ile ödeme akışı (test modunda çalışır)
- Sipariş oluşturma

Admin Panel
- Google OAuth ile giriş
- Ürün ekleme/ silme/ güncelleme
- Kategori yönetimi
- AWS S3 ile görsel yükleme
- Admin ekleme-silme sayfası

1) Repoyu Klonla
git clone https://github.com/brnkrkts/electronics-ecommerce.git
cd electronics-ecommerce

Frontend Kurulumu
cd front
npm install

.env dosyası oluştur:
cp .env.example .env

## 🛠 Admin Panel Kurulumu
cd ../admin
npm install

bash
Kodu kopyala

.env dosyası oluştur:
cp .env.example .env


Çalıştırma

Front:
cd front
npm run dev

Admin:
cd admin
npm run dev

Varsayılan portlar:
- Front → http://localhost:3000  
- Admin → http://localhost:3001  

Admin Doğrulaması

Admin paneli Google OAuth ile çalışır.

Kurulum sırasında:

1. Google OAuth bilgilerini '.env' dosyasına ekleyin  
2. 'pages/api/auth/[...nextauth].js' dosyasındaki admin kontrol alanında bulunan:

return true; // development için kolaylık sağlar satırını kaldırarak gerçek admin doğrulamasını aktifleştirebilirsiniz.

Admin olarak kabul edilmek için, MongoDB’de 'Admin' koleksiyonuna e-posta eklemeniz yeterlidir.

Gerekli Servisler

Projeyi tam çalışır halde kullanmak için:

MongoDB (Atlas)
- Ürünler, kategoriler, siparişler, adminler burada tutulur
- Bağlantı adresini '.env' içine ekleyin

Google OAuth
- Admin girişleri için gereklidir

AWS S3
- Görsel yükleme sistemi burada çalışır

Stripe (Opsiyonel)
- Ödeme akışı için test anahtarları gereklidir

Hepsi '.env.example' dosyasında belirtilmiştir.

Not:
Bu proje eğitim ve portfolyo amaçlı geliştirilmiştir.  
Bağlantılar, test anahtarları ve servisler güvenlik gereği repoda paylaşılmamaktadır.
