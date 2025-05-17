### Folder Structure

```
src/
├── app/ # Next.js App Router yapısı
│ ├── [locale]/ # Dil bazlı routing
│ │ ├── blacklist/ # Blacklist sayfası ve bileşenleri
│ │ ├── forecast/ # Forecast sayfası ve bileşenleri
│ │ ├── login/ # Giriş sayfası ve bileşenleri
│ │ ├── layout.tsx # Ana layout bileşeni
│ │ └── page.tsx # Ana sayfa
│ ├── [...catchAll]/ # Yakalanmayan rotalar için 404
│ ├── providers.tsx # Query Provider
│ └── not-found.tsx # 404 sayfası
│
├── components/ # Paylaşılan bileşenler
│ ├── auth/ # Kimlik doğrulama bileşenleri
│ ├── data-table/ # Tablo bileşenleri
│ ├── error-boundaries/ # Hata sınırı bileşenleri
│ ├── home/ # Ana sayfa bileşenleri
│ ├── layout/ # Layout bileşenleri (Header, Footer)
│ └── ui/ # UI bileşenleri (button, input, vb.)
│
├── constants/ # Sabit değerler
│ ├── blacklist.ts
│ └── forecast.ts
│
├── i18n/ # Localization yapılandırması
│ ├── navigation.ts # Next.js yönlendirme API'lerinin i18 li versiyonları
│ ├── request.ts # API istekleri için dil yapılandırması
│ ├── localizationConfig.ts # Localization config
│ └── routing.ts # Rota yapılandırması için dil desteği
│
├── lib/ # Yardımcı fonksiyonlar ve kütüphaneler
│ ├── hooks/ # Özel hook'lar
│ ├── api.ts # API yapılandırması
│ └── utils.ts # Yardımcı fonksiyonlar
│
├── messages/ # Dil dosyaları
│ ├── en.json
│ └── tr.json
│
├── services/ # API servisleri
│ ├── authService.ts # Kimlik doğrulama servisi
│ ├── blacklistService.ts # Blacklist servisi
│ └── forecastService.ts # Forecast servisi
│
├── store/ # Zustand store'ları
│ └── authStore.ts # Kimlik doğrulama store'u
│
├── types/ # Özel type tanımlamaları
│ ├── blacklist.ts
│ └── forecast.ts
│
└── middleware.ts # Next.js middleware (yönlendirme ve protected routes)
```

### Teknoloji Tercihleri

#### Frontend Framework

Next.js App Router kullanılarak daha modern ve scalable bir yapı kuruldu. Next.js'in sunduğu route tabanlı dosya yapısı, sunucu bileşenleri ve optimizasyonlar sayesinde hızlı ve SEO dostu bir uygulama geliştirildi.

#### State Yönetimi

Zustand ile basit ve etkili state yönetimi sağlandı. React Query ile sunucu durumunu yönetmek, veri önbellekleme ve yeniden fetch etme işlemleri optimize edildi.

#### Bileşen Yapısı

Projede modüler bir yapı izlendi:

- Ortak componentler `/components` klasöründe toplandı.
- Sayfa özel bileşenleri ilgili sayfa klasörlerinde tutuldu.
- UI bileşenleri `/components/ui` altında gruplandı.
- Tablo gibi karmaşık bileşenler kendi klasörlerinde modüler yapıda oluşturuldu.

#### Form Yönetimi

React Hook Form ve Zod ile form validate işlemleri gerçekleştirildi.

#### API Yapısı

Axios kullanılarak merkezi API yapılandırması oluşturuldu ve interceptor'lar ile tokenler otomatikleştirildi.

#### Middleware

Middleware ile korumalı rotalar tanımlandı.

#### Hata Yönetimi

ErrorBoundary ile hata ekranları oluşturuldu ve beklenmeyen hatalar yakalandı.

### Kullanılan Bazı Kütüphaneler

TanStack React Table (Tablolar), date-fns (Tarih formatlama), recharts (Grafikler), react-error-boundary (Hata yakalama), react-to-print (Tablo yazdırma), js-cookie (Token yönetimi ve çerezler), next-intl (Localization)

### Neden Context API Yerine Zustand Seçtim?

Context API'de bir state güncellendiğinde, o context'e bağlı olan tüm componentler yeniden render edilir ve bu durum performans sorunlarına yol açabilir. Zustand ise sadece değişen state'i kullanan componentleri render eder. Ayrıca Zustand'in store yapısı daha modüler olduğundan, büyük uygulamalarda bakım daha kolaydır.
