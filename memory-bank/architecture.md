# Catatan Arsitektur Website Multitech Tasikmalaya

Dokumen ini menjelaskan keputusan arsitektural dan struktur file/folder utama dalam proyek.

## Ikhtisar Teknologi Inti (Tahap 0)

*   **Framework:** Next.js (dengan App Router)
*   **Bahasa:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animasi:** Motion (motion/react)
*   **Linting & Formatting:** ESLint & Prettier
*   **Manajemen Konten (Awal):** File JSON statis

## Struktur Direktori Utama & File (Tahap 0)

*   **`multitech-website/` (Root Proyek)**
    *   **`src/`**: Direktori utama untuk kode sumber aplikasi.
        *   **`app/`**: Inti dari Next.js App Router.
            *   `layout.tsx`: Komponen layout root yang berlaku untuk semua halaman. Tempat mengimpor CSS global, mendefinisikan metadata dasar, dan struktur HTML utama (<html>, <body>).
            *   `page.tsx`: Komponen halaman untuk rute `/` (Beranda). Saat ini digunakan untuk tes dan menampilkan data awal. Secara default adalah Server Component.
            *   `globals.css`: File CSS global. Berisi direktif `@tailwind` untuk Tailwind CSS dan style global kustom lainnya. Diimpor di `layout.tsx`.
        *   **`components/`**: Untuk semua komponen React yang dapat digunakan kembali.
            *   `ui/`: Komponen UI atomik/generik (misalnya, `TempButton.tsx` yang kita buat). Diharapkan berisi `Button.tsx`, `Card.tsx`, dll.
            *   `layout/`: Komponen struktural besar seperti `Header.tsx`, `Footer.tsx`, `MainLayout.tsx`.
            *   `sections/`: Komponen yang merepresentasikan bagian-bagian spesifik dari sebuah halaman (misalnya, `HeroSection.tsx` untuk Beranda).
        *   **`data/`**: Menyimpan file data statis.
            *   `companyInfo.json`: Informasi umum perusahaan (nama, alamat, kontak, dll.).
            *   `services.json`: Daftar layanan yang ditawarkan.
            *   `testimonials.json`: Kumpulan testimoni pelanggan.
            *   *Catatan: Data ini dibaca di Server Components menggunakan Node.js `fs` module saat build time atau request time.*
        *   **`lib/`**: Untuk fungsi utilitas, helper, atau logika bisnis yang dapat digunakan kembali di seluruh aplikasi.
        *   **`styles/`**: (Saat ini kosong) Untuk file CSS/SCSS modular tambahan jika diperlukan di luar `globals.css` dan Tailwind.
    *   **`public/`**: Untuk aset statis yang akan disajikan secara langsung (gambar, ikon, font, robots.txt, sitemap.xml, dll.). Path ke aset ini dimulai dari `/`.
        *   `images/`: Sub-direktori yang disarankan untuk organisasi gambar.
    *   **`node_modules/`**: Direktori tempat dependensi proyek (paket npm) disimpan.
    *   **`.eslintrc.json`**: File konfigurasi untuk ESLint. Mendefinisikan aturan linting kode untuk menjaga kualitas dan konsistensi. Terintegrasi dengan `next/core-web-vitals` dan `prettier`.
    *   **`.gitignore`**: Menentukan file dan folder yang diabaikan oleh Git.
    *   **`.prettierrc.json`**: File konfigurasi untuk Prettier. Mendefinisikan aturan formatting kode. Menggunakan `prettier-plugin-tailwindcss` untuk mengurutkan kelas utilitas Tailwind.
    *   **`.prettierignore`**: Menentukan file dan folder yang diabaikan oleh Prettier.
    *   **`next-env.d.ts`**: File deklarasi tipe untuk Next.js, memastikan TypeScript mengenali tipe-tipe spesifik Next.js.
    *   **`next.config.mjs`** (atau `.js`): File konfigurasi utama untuk Next.js. Dapat digunakan untuk kustomisasi build, environment variables, redirects, headers, dll.
    *   **`package.json`**: Menyimpan metadata proyek, daftar dependensi (dependencies & devDependencies), dan skrip (npm scripts seperti `dev`, `build`, `start`, `lint`).
    *   **`package-lock.json`** (atau `yarn.lock` / `pnpm-lock.yaml`): Merekam versi pasti dari setiap dependensi yang diinstal.
    *   **`postcss.config.js`** (atau `.mjs`): File konfigurasi untuk PostCSS. Digunakan oleh Tailwind CSS untuk memproses dan menghasilkan CSS akhir.
    *   **`tailwind.config.ts`**: File konfigurasi untuk Tailwind CSS. Tempat mendefinisikan path ke file yang menggunakan kelas Tailwind (`content`), kustomisasi tema (warna, font, spacing), dan plugin Tailwind.
    *   **`tsconfig.json`**: File konfigurasi untuk TypeScript. Mendefinisikan opsi compiler TypeScript, path, dan file yang akan di-include/exclude.

## Konsep Server Components vs. Client Components (Penting di Tahap 0)

*   Dalam Next.js App Router, komponen secara default adalah **Server Components**. Mereka di-render di server dan dapat melakukan operasi sisi server (misalnya, akses filesystem, database).
*   Komponen yang memerlukan interaktivitas browser (event handlers seperti `onClick`, state dengan `useState`, lifecycle effects dengan `useEffect`, atau menggunakan React Context dan hook yang hanya berjalan di browser) harus ditandai sebagai **Client Components** dengan menambahkan direktif `'use client';` di baris paling atas file.
*   **Batasan:** Fungsi (termasuk event handlers) yang didefinisikan dalam Server Component tidak bisa langsung diteruskan sebagai props ke Client Component. Jika Client Component memerlukan fungsi yang dapat dipanggil, fungsi tersebut harus didefinisikan di dalam Client Component itu sendiri atau diteruskan dari Client Component parent lainnya.
*   **`TempButton.tsx`** adalah Client Component karena menggunakan `motion` dan menerima `onClick`.
*   **`app/page.tsx`** (HomePage) adalah Server Component untuk memungkinkan pembacaan file data dari `src/data/`.

## Komponen Global (Tahap 1)

*   **`src/components/layout/Header.tsx`**:
    *   **Tujuan**: Menyediakan navigasi utama situs yang konsisten dan modern.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan React Hooks (`useState`, `useEffect`) untuk mengelola state internal seperti status _sticky_, visibilitas menu mobile, dan path URL aktif.
    *   **Fitur Utama**:
        *   **Logo**: Teks "MULTITECH" dengan styling dua warna (biru tua/putih dan merah) yang berubah tergantung status sticky.
        *   **Navigasi Utama (Desktop)**: Daftar link dengan efek underline kustom berwarna merah pada item aktif dan saat hover. Teks navigasi berubah warna berdasarkan status sticky.
        *   **Navigasi Mobile**: Tombol ikon hamburger (`Menu`)/close (`X`) yang menampilkan/menyembunyikan menu dropdown. Tampilan dropdown juga menyesuaikan dengan status sticky header.
        *   **Efek Sticky & Visual**:
            *   Awal: Latar transparan, teks putih.
            *   Sticky: Latar semi-transparan putih (`bg-white/90`) dengan efek `backdrop-blur-md` dan `shadow-lg`. Teks berubah menjadi lebih gelap.
        *   **Styling**: Menggunakan Tailwind CSS, `clsx` untuk kelas kondisional, dan `lucide-react` untuk ikon.
    *   **Integrasi**: Diimpor dan dirender dalam `src/app/layout.tsx`.

*   **`src/components/layout/Footer.tsx`**:
    *   **Tujuan**: Menyediakan informasi kontak, navigasi sekunder, dan copyright di bagian bawah setiap halaman.
    *   **Status**: Server Component (default).
    *   **Fitur Utama**:
        *   **Styling Brand**: Latar belakang biru tua (`#001A4D`), teks utama berwarna terang (slate), dan aksen merah pada judul bagian dan link hover. Terdapat garis aksen merah horizontal di bagian atas footer.
        *   **Konten**: Informasi perusahaan (placeholder logo/nama, deskripsi singkat), daftar layanan utama (contoh), tautan navigasi, detail kontak, dan ikon media sosial (menggunakan `lucide-react`).
        *   **Layout**: Menggunakan sistem grid Tailwind CSS untuk mengatur konten dalam beberapa kolom.
        *   **Copyright**: Menampilkan tahun saat ini secara dinamis.
    *   **Integrasi**: Diimpor dan dirender dalam `src/app/layout.tsx`. Ditempatkan setelah `<main>` untuk memastikan posisinya di bawah konten utama.

*   **`src/app/layout.tsx` (Root Layout)**:
    *   **Tujuan**: Menyediakan struktur HTML dasar, layout global (Header, Footer, konten utama), font, dan metadata default untuk seluruh aplikasi.
    *   **Fitur Utama**:
        *   **Integrasi Komponen Global**: Merender komponen `Header` dan `Footer`.
        *   **Konten Halaman Dinamis**: Merender `children` yang merupakan konten halaman spesifik.
        *   **Manajemen Font**: Menggunakan `next/font/google` untuk memuat font Poppins (sebagai `--font-poppins`) dan Open Sans (sebagai `--font-open-sans`). Variabel CSS font ini di-assign ke tag `<html>` dan dikonfigurasi dalam `tailwind.config.ts` untuk digunakan dengan kelas utilitas Tailwind (`font-heading`, `font-sans`).
        *   **Metadata Default**: Mendefinisikan objek `metadata` global dengan `title.default`, `title.template`, dan `description` default untuk SEO.
        *   **Styling Global**:
            *   `flex flex-col min-h-screen` pada `<body>` dan `flex-grow` pada `<main>` untuk memastikan footer menempel di bawah.
            *   Menerapkan `antialiased` untuk rendering font yang lebih baik.
            *   Menetapkan warna latar dan teks dasar untuk `<body>`.

*   **`src/app/not-found.tsx` (Halaman 404 Kustom)**:
    *   **Tujuan**: Menyediakan pengalaman pengguna yang lebih baik ketika URL yang diminta tidak ditemukan.
    *   **Konvensi Next.js**: File ini secara otomatis digunakan oleh App Router untuk menangani error 404.
    *   **Status**: Server Component (default).
    *   **Fitur Utama**:
        *   **Pesan Jelas**: Menampilkan kode error 404, judul, dan pesan deskriptif.
        *   **Visual**: Menggunakan ikon (placeholder `AlertTriangle` dari `lucide-react`) untuk menarik perhatian.
        *   **Navigasi Kembali**: Tombol "Kembali ke Beranda" yang jelas untuk membantu pengguna kembali ke situs.
        *   **Styling**: Disesuaikan dengan palet warna dan tema website (biru tua, merah, slate) serta menggunakan font kustom yang telah dikonfigurasi (`font-heading`, `font-sans`).

    

### Halaman Beranda (`src/app/page.tsx`)

*   **`src/components/sections/home/HeroSection.tsx`**:
    *   **Tujuan**: Menciptakan impresi pertama yang kuat dan menarik, menyampaikan tagline utama, dan mengarahkan pengguna ke layanan.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi pada elemen teks dan tombol.
    *   **Fitur Utama**:
        *   **Layout Full Viewport Awal**: Menggunakan `min-h-screen` untuk mengisi layar saat pertama kali dimuat.
        *   **Gambar Latar Dinamis**: Menampilkan gambar latar full-screen dengan efek Ken Burns (animasi CSS kustom yang diaktifkan via kelas Tailwind) untuk memberikan kesan dinamis.
        *   **Overlay Gradasi**: Lapisan gradasi warna (biru tua ke aksen merah tipis) di atas gambar latar untuk meningkatkan keterbacaan teks dan memperkuat identitas visual.
        *   **Konten Teks Animasi**: Tagline utama, sub-tagline, dan sebuah badge/sub-heading muncul dengan animasi fade-in dan pergeseran menggunakan `motion/react`.
        *   **Tombol CTA (Call to Action)**: Tombol utama yang mengarahkan ke halaman layanan, didesain dengan gradasi, shadow, dan ikon yang interaktif saat hover.
        *   **Indikator Scroll**: Ikon panah ke bawah yang dianimasikan untuk memberi petunjuk kepada pengguna bahwa ada lebih banyak konten di bawah.
        *   **Responsivitas**: Desain dan elemen disesuaikan untuk berbagai ukuran layar.
    *   **Styling**: Tailwind CSS, kelas animasi kustom di `globals.css`.

*   **`src/components/sections/home/AboutSummarySection.tsx`**:
    *   **Tujuan**: Memberikan pengenalan singkat namun menarik tentang Multitech, menyoroti keunikan dan nilai-nilai inti perusahaan.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi elemen saat masuk ke viewport.
    *   **Fitur Utama**:
        *   **Latar Belakang Terang**: Menggunakan `bg-white` atau `bg-slate-50` untuk tampilan yang bersih dan cerah.
        *   **Layout Asimetris**: Pembagian kolom yang tidak simetris (misalnya, 5-1-6 dari 12 kolom grid) untuk tampilan yang lebih dinamis.
        *   **Penyajian Poin Keunggulan**: Poin-poin disajikan sebagai item daftar dengan ikon dan latar belakang halus, bukan kartu individual yang berat.
        *   **Elemen Desain Unik**:
            *   Garis pemisah vertikal dengan gradasi tipis sebagai aksen visual antar kolom.
            *   Kolom deskripsi diberi "kartu" dengan latar gradasi terang dan shadow, serta dipercantik dengan bentuk "aura" warna abstrak (blur) di belakangnya untuk kedalaman visual.
        *   **Tipografi & Warna**: Penggunaan font heading dan body yang konsisten, dengan warna teks utama gelap (biru tua Multitech, slate) dan aksen merah brand untuk judul, ikon, dan CTA.
        *   **Animasi `whileInView`**: Elemen-elemen dianimasikan saat pengguna scroll dan elemen tersebut masuk ke dalam viewport.
    *   **Styling**: Tailwind CSS.

*   **`src/components/sections/home/ServicesHighlightSection.tsx`**:
    *   **Tujuan**: Menampilkan beberapa layanan kunci perusahaan secara menarik untuk mendorong eksplorasi lebih lanjut.
    *   **Status**: Client Component (`'use client';`) karena `ServiceCard` menggunakan animasi.
    *   **Komponen Pendukung**: Menggunakan `src/components/ui/ServiceCard.tsx`.
    *   **Fitur Utama**:
        *   **Judul Section**: Judul yang jelas dan sub-judul untuk konteks.
        *   **Grid Layanan**: Menampilkan beberapa `ServiceCard` dalam layout grid responsif.
        *   **Tombol CTA Global**: Link untuk melihat semua layanan.
    *   **Styling**: Latar belakang section `bg-slate-100` atau dengan pola halus.

*   **`src/components/ui/ServiceCard.tsx`**:
    *   **Tujuan**: Komponen UI yang dapat digunakan kembali untuk menampilkan preview satu layanan.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi.
    *   **Fitur Utama**:
        *   **Layout Kartu Unik**: Gambar layanan di bagian atas dengan judul overlay, ikon di sudut gambar, dan area teks di bawah dengan border aksen.
        *   **Gambar Responsif dengan Efek**: Menggunakan `next/image` dengan `fill` dan `objectFit: 'cover'`. Gambar memiliki efek `scale` saat hover yang dikontrol dengan `overflow-hidden` pada kontainer gambar.
        *   **Variasi Aksen**: Mendukung prop `colorAccent` untuk mengubah warna aksen (merah/biru) pada border dan ikon, memungkinkan variasi visual antar kartu.
        *   **Informasi**: Menampilkan judul, deskripsi singkat, dan link ke detail layanan.
        *   **Interaksi Hover**: Efek visual pada gambar, judul, dan link saat di-hover.
        *   **Animasi Masuk**: Menggunakan `motion/react` untuk animasi saat kartu masuk ke viewport.
    *   **Styling**: Tailwind CSS.

*   **`src/components/sections/home/TestimonialSection.tsx`**:
    *   **Tujuan**: Menampilkan testimoni pelanggan untuk membangun kepercayaan dan bukti sosial.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan library Swiper.js yang merupakan komponen interaktif sisi klien.
    *   **Dependensi Eksternal**: `swiper`.
    *   **Komponen Pendukung**: Menggunakan `src/components/ui/TestimonialCard.tsx`.
    *   **Fitur Utama**:
        *   **Carousel/Slider**: Menggunakan Swiper.js untuk menampilkan testimoni dalam format slider yang interaktif.
        *   **Fitur Slider**: Termasuk autoplay, pagination (dots), navigation (panah next/prev), loop, dan efek visual seperti 'coverflow'.
        *   **Styling Kustom Swiper**: Warna navigasi dan pagination disesuaikan dengan tema brand melalui variabel CSS Swiper.
        *   **Judul Section**: Judul yang menonjol untuk memperkenalkan bagian testimoni.
        *   **Latar Belakang Section**: Gradasi biru tua untuk memberikan kontras dan fokus pada kartu testimoni.
    *   **Styling**: Tailwind CSS, CSS Swiper.js.

*   **`src/components/ui/TestimonialCard.tsx`**:
    *   **Tujuan**: Komponen UI untuk menampilkan satu testimoni individual.
    *   **Status**: Server Component (default, karena tidak ada hook atau interaksi klien di dalamnya).
    *   **Fitur Utama**:
        *   **Tata Letak Bersih**: Menampilkan avatar pelanggan (jika tersedia), teks testimoni yang diformat sebagai kutipan, nama, dan peran pelanggan.
        *   **Elemen Dekoratif**: Ikon kutipan besar ditempatkan di latar belakang kartu sebagai detail visual.
        *   **Styling**: Latar belakang kartu putih dengan shadow, tipografi yang jelas.
    *   **Styling**: Tailwind CSS.

*   **`src/components/sections/home/SecondaryCTASection.tsx`**:
    *   **Tujuan**: Memberikan ajakan bertindak tambahan di akhir Halaman Beranda, fokus pada interaksi langsung atau kunjungan.
    *   **Status**: Client Component (`'use client';`).
    *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi.
    *   **Fitur Utama**:
        *   **Judul Section**: Ajakan yang jelas dan mengundang.
        *   **Layout Dua Kartu CTA**: Menampilkan dua opsi CTA utama (misalnya, kunjungi lokasi dan hubungi) dalam format kartu berdampingan yang menarik secara visual.
        *   **Desain Kartu**: Setiap kartu memiliki ikon besar yang relevan, deskripsi, tombol CTA, dan border atas berwarna aksen (merah/biru tua).
        *   **Latar Belakang Dinamis**: Latar section dengan gradasi terang, dipercantik dengan elemen "aura" warna abstrak (merah & biru tua) yang dianimasikan secara halus (`animate-pulse-slow`) untuk kesan modern.
        *   **Animasi**: Elemen-elemen dianimasikan saat masuk ke viewport.
    *   **Styling**: Tailwind CSS, animasi kustom di `globals.css`.

### Halaman Tentang Kami (`src/app/tentang-kami/page.tsx`)

*   **File Routing**: `src/app/tentang-kami/page.tsx`.
*   **Metadata**: Didefinisikan secara spesifik untuk halaman ini.
*   **Komponen Sections**:
    *   **`src/components/sections/about/HistorySection.tsx`**:
        *   **Tujuan**: Menyajikan sejarah dan perkembangan perusahaan dalam format timeline yang menarik.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi item timeline.
        *   **Komponen Pendukung**: Menggunakan `TimelineItem` (didefinisikan di dalam `HistorySection.tsx`) untuk setiap event sejarah.
        *   **Fitur Utama**:
            *   **Timeline Vertikal Unik**: Pada desktop, item sejarah muncul bergantian di kiri/kanan garis vertikal utama dengan titik penanda dan konektor visual. Pada mobile, tersusun secara linear vertikal.
            *   **Desain Kartu Event**: Setiap event disajikan dalam kartu dengan border atas berwarna aksen (merah/biru, bergantian), menampilkan ikon, tahun, judul, dan deskripsi.
            *   **Variasi Visual**: Penggunaan warna aksen yang berbeda untuk item ganjil/genap.
            *   **Animasi**: Item timeline dianimasikan saat masuk ke viewport, muncul dari sisi kiri atau kanan.
        *   **Styling**: Tailwind CSS.

    *   **`src/components/sections/about/VisionMissionSection.tsx`**:
        *   **Tujuan**: Mengkomunikasikan visi dan misi perusahaan secara jelas dan inspiratif.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi.
        *   **Fitur Utama**:
            *   **Layout Dua Kolom (Desktop)**: Visi dan Misi dipisahkan secara visual, dengan garis pemisah dekoratif di tengah.
            *   **Presentasi Visi**: Pernyataan visi disajikan sebagai kutipan besar dan menonjol, didahului judul dengan ikon.
            *   **Presentasi Misi**: Poin-poin misi disajikan sebagai daftar item yang masing-masing memiliki ikon.
            *   **Ikonografi**: Menggunakan ikon dari `lucide-react` (`Eye`, `Target`, `CheckSquare`) untuk memperkuat pesan.
            *   **Branding Warna**: Penggunaan warna aksen (merah dan biru tua) secara subtil pada heading dan ikon.
            *   **Animasi**: Elemen-elemen utama (kolom Visi, Misi, garis, poin misi) dianimasikan saat masuk ke viewport.
        *   **Styling**: Tailwind CSS, latar belakang section putih untuk kejelasan.

    *   **`src/components/sections/about/ValuesSection.tsx`**:
        *   **Tujuan**: Mengartikulasikan nilai-nilai inti atau keunggulan perusahaan secara visual menarik.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi.
        *   **Komponen Pendukung**: Menggunakan `ValueCard` (didefinisikan di dalam `ValuesSection.tsx`) untuk setiap nilai.
        *   **Fitur Utama**:
            *   **Desain Kartu Nilai Unik**: Setiap nilai disajikan dalam kartu dengan ikon besar di atas, judul, dan deskripsi. Kartu memiliki latar gradasi halus dan aksen warna (merah/biru) yang bervariasi.
            *   **Interaksi Hover**: Kartu memiliki efek hover yang mengangkat kartu, memperbesar ikon dengan efek "glow", dan mengubah tampilan garis aksen.
            *   **Layout Grid**: Kartu-kartu disusun dalam grid yang responsif.
            *   **Judul Section**: Judul yang jelas dan deskripsi pendahuluan.
            *   **Animasi**: Setiap kartu dan judul section dianimasikan saat masuk ke viewport.
        *   **Styling**: Tailwind CSS.

## Komponen Global (Layout Tambahan)

*   **`src/components/layout/PageHeader.tsx`**:
    *   **Tujuan**: Menyediakan header standar untuk halaman-halaman internal (selain Beranda), menampilkan judul halaman, breadcrumb navigasi, dan ringkasan singkat.
    *   **Status**: Client Component (`'use client';`) karena menggunakan `motion/react` untuk animasi.
    *   **Fitur Utama**:
        *   **Judul Halaman**: Teks besar dan jelas.
        *   **Breadcrumb**: Navigasi hierarkis untuk membantu orientasi pengguna.
        *   **Ringkasan (Opsional)**: Deskripsi singkat tentang konten halaman.
        *   **Latar Belakang**: Dukungan untuk gambar latar atau warna/gradasi solid.
        *   **Elemen Dekoratif**: Bentuk SVG halus di bagian bawah untuk transisi visual.
    *   **Styling**: Tailwind CSS.

### Halaman Layanan (`src/app/layanan/page.tsx`)

*   **File Routing**: `src/app/layanan/page.tsx`.
*   **Metadata**: Didefinisikan secara spesifik untuk halaman ini.
*   **Header Halaman**: Menggunakan komponen `src/components/layout/PageHeader.tsx`.
*   **Komponen Sections**:
    *   **`src/components/sections/services/ServiceListSection.tsx`**:
        *   **Tujuan**: Menampilkan daftar lengkap layanan yang ditawarkan perusahaan.
        *   **Status**: Client Component (`'use client';`) karena `ServiceListItem` menggunakan animasi.
        *   **Komponen Pendukung**: Menggunakan `src/components/ui/ServiceListItem.tsx`.
        *   **Fitur Utama**:
            *   Menyajikan semua layanan dalam satu blok vertikal yang kohesif, bukan sebagai kartu-kartu terpisah.
            *   Setiap layanan direpresentasikan oleh `ServiceListItem`.
        *   **Styling**: Latar belakang terang, dengan `ServiceListItem` yang memiliki border pemisah.

    *   **`src/components/ui/ServiceListItem.tsx`**:
        *   **Tujuan**: Komponen UI untuk menampilkan satu item layanan dalam daftar, dengan detail yang dapat di-expand.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `useState` untuk state expanded/collapsed dan `motion/react` untuk animasi.
        *   **Fitur Utama**:
            *   **Layout Baris/Blok**: Menampilkan ikon, judul, dan deskripsi singkat layanan dalam satu baris horizontal yang interaktif.
            *   **Expandable Detail**: Saat diklik, area detail akan muncul di bawahnya dengan animasi, menampilkan deskripsi lengkap, manfaat, dan CTA spesifik.
            *   **Desain Non-Kartu**: Fokus pada tipografi, spasi, dan perubahan styling halus saat hover atau expanded untuk interaksi.
            *   **Aksesibilitas**: Dibuat agar dapat dioperasikan dengan keyboard.
        *   **Styling**: Tailwind CSS, menggunakan plugin `@tailwindcss/typography` untuk styling konten HTML di area detail.

### Halaman Kontak (`src/app/kontak/page.tsx`)

*   **File Routing**: `src/app/kontak/page.tsx`.
*   **Metadata**: Didefinisikan secara spesifik untuk halaman ini.
*   **Header Halaman**: Menggunakan komponen `src/components/layout/PageHeader.tsx`.
*   **Komponen Sections**:
    *   **`src/components/sections/contact/ContactInfoSection.tsx`**:
        *   **Tujuan**: Menyajikan semua informasi kontak penting perusahaan (alamat, telepon, email, jam operasional, media sosial) dengan cara yang menarik dan mudah diakses.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `motion/react` untuk animasi.
        *   **Fitur Utama**:
            *   **Layout Dinamis**: Menggunakan grid untuk membagi informasi menjadi blok visual yang berbeda (misalnya, alamat & jam operasional di satu sisi, kontak langsung & media sosial di sisi lain).
            *   **Presentasi Informasi Kontak**: Setiap item kontak (alamat, telepon, dll.) disajikan dengan ikon yang relevan dan dibuat interaktif (link ke peta, `tel:`, `mailto:`).
            *   **Blok Media Sosial**: Ikon media sosial ditampilkan dengan ukuran yang lebih besar dan efek hover yang menarik dalam blok berlatar gradasi biru tua.
            *   **Desain Modern**: Latar belakang section utama dengan elemen "aura" warna abstrak yang dianimasikan. Kartu-kartu informasi memiliki shadow, border aksen, dan efek hover.
            *   **Animasi**: Elemen-elemen utama dianimasikan saat masuk ke viewport.
        *   **Styling**: Tailwind CSS.

    *   **`src/components/sections/contact/MapEmbed.tsx`**:
        *   **Tujuan**: Menyematkan peta Google Maps interaktif untuk menunjukkan lokasi fisik perusahaan.
        *   **Status**: Client Component (`'use client';`) (opsional, bisa jadi Server Component jika hanya iframe tanpa motion).
        *   **Fitur Utama**:
            *   **Tampilan Peta Besar**: Peta mengambil lebar penuh section dengan tinggi yang cukup untuk interaksi yang nyaman.
            *   **Link Eksternal (Opsional)**: Tombol untuk membuka lokasi di aplikasi Google Maps langsung.
            *   **Desain Terintegrasi**: Termasuk elemen dekoratif SVG untuk transisi visual.
            *   **Fallback**: Pesan jika URL embed tidak valid.
            *   **Animasi**: Efek muncul menggunakan `motion/react`.
        *   **Styling**: Tailwind CSS.

        *   **`src/components/sections/contact/ContactFormSection.tsx`**:
        *   **Tujuan**: Menyediakan formulir bagi pengguna untuk mengirim pesan atau pertanyaan.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan React Hook Form dan state untuk interaktivitas formulir.
        *   **Dependensi Eksternal**: `react-hook-form`, `zod`, `@hookform/resolvers`.
        *   **Fitur Utama**:
            *   **Manajemen Form**: Menggunakan React Hook Form untuk state management dan submission.
            *   **Validasi Skema**: Validasi input sisi klien menggunakan Zod, dengan feedback error per field. Mode validasi `onTouched` untuk UX yang lebih baik.
            *   **Desain Input Unik**: Input field dengan style border bawah, label "mengambang", dan ikon.
            *   **Tombol Submit Interaktif**: Dengan state disabled, animasi loading.
            *   **Notifikasi**: Pesan sukses/gagal setelah upaya submit.
            *   **Styling Modern**: Latar belakang section dan form dengan gradasi dan elemen dekoratif.
            *   *Pengiriman email via API Route dan reCAPTCHA akan diimplementasikan kemudian.*
        *   **Styling**: Tailwind CSS.

### Halaman Galeri (`src/app/galeri/page.tsx`) (Opsional)

*   **File Routing**: `src/app/galeri/page.tsx`.
*   **Metadata**: Didefinisikan secara spesifik untuk halaman ini.
*   **Header Halaman**: Menggunakan komponen `src/components/layout/PageHeader.tsx`.
*   **Sumber Data**: `src/data/gallery.json` (dibaca di Server Component `page.tsx`).
*   **Komponen Sections**:
    *   **`src/components/sections/gallery/GalleryGrid.tsx`**:
        *   **Tujuan**: Menampilkan koleksi gambar perusahaan dalam format grid yang menarik dengan fungsionalitas lightbox.
        *   **Status**: Client Component (`'use client';`).
        *   **Alasan Client Component**: Menggunakan `useState` untuk mengelola state lightbox (terbuka/tertutup, indeks gambar aktif) dan `motion/react` untuk animasi.
        *   **Dependensi Eksternal**: `yet-another-react-lightbox`.
        *   **Fitur Utama**:
            *   **Layout Grid Masonry**: Menggunakan CSS Columns (`columns-X`) untuk menyusun gambar dalam grid dengan tinggi item yang bervariasi secara dinamis.
            *   **Presentasi Gambar**: Setiap gambar memiliki efek hover (overlay, ikon, judul) dan animasi muncul.
            *   **Lightbox**: Saat gambar diklik, lightbox akan terbuka menampilkan gambar dalam ukuran penuh dengan kemampuan navigasi antar gambar.
        *   **Styling**: Tailwind CSS, CSS dari `yet-another-react-lightbox`.

### Halaman Blog (`src/app/blog/page.tsx` dan `src/app/blog/[slug]/page.tsx`) (Opsional, Statis)

*   **Sumber Konten**: File Markdown di direktori `content/blog/`. Setiap file berisi frontmatter (metadata) dan konten artikel.
*   **Pemrosesan Konten**:
    *   **`src/lib/blog.ts`**: Berisi fungsi helper untuk:
        *   Membaca file Markdown dari sistem file.
        *   Mem-parsing frontmatter menggunakan `gray-matter`.
        *   Mengkonversi konten Markdown ke HTML menggunakan `remark` dan `remark-html`.
        *   Mengambil semua slug untuk SSG.
        *   Memformat tanggal menggunakan `date-fns`.
*   **Halaman Daftar Blog (`src/app/blog/page.tsx`)**:
    *   **Status**: Server Component (mengambil data saat build/request).
    *   **Fitur**: Menampilkan daftar artikel, membedakan artikel unggulan (`FeaturedBlogItem.tsx`) dari artikel standar (`StandardBlogItem.tsx`).
*   **Halaman Detail Artikel (`src/app/blog/[slug]/page.tsx`)**:
    *   **Routing**: Menggunakan dynamic segment `[slug]`.
    *   **Data Fetching**: `getPostData(slug)` untuk mengambil konten artikel spesifik.
    *   **SSG**: Menggunakan `generateStaticParams` untuk pre-rendering halaman artikel saat build.
    *   **Metadata Dinamis**: Menggunakan `generateMetadata` untuk title, description, dan Open Graph tag yang spesifik per artikel.
    *   **Rendering Konten**: Konten HTML dari Markdown dirender menggunakan `dangerouslySetInnerHTML` dan diberi styling menggunakan plugin `@tailwindcss/typography` (kelas `prose` dengan kustomisasi).
    *   **Fitur**: Menampilkan gambar cover, judul, metadata (tanggal, penulis, tag), konten utama, dan tombol navigasi kembali.
*   **Komponen UI Pendukung**:
    *   **`src/components/ui/FeaturedBlogItem.tsx`**: Untuk tampilan artikel unggulan di daftar blog.
    *   **`src/components/ui/StandardBlogItem.tsx`**: Untuk tampilan artikel standar di daftar blog.
*   **Styling**: Tailwind CSS, `@tailwindcss/typography`.

### 1. Optimasi Performa (NF.1)

*   **Strategi Utama**: Memanfaatkan fitur optimasi bawaan Next.js dan praktik terbaik pengembangan web.
*   **Gambar**:
    *   Komponen `next/image` digunakan secara ekstensif untuk optimasi otomatis (format WebP, ukuran, lazy loading, pencegahan CLS).
    *   Gambar LCP diberi prop `priority={true}`.
*   **Font**:
    *   `next/font/google` digunakan untuk self-hosting font Google dan optimasi pemuatan font.
*   **Kode**:
    *   Minifikasi JavaScript dan CSS otomatis oleh Next.js pada build produksi.
    *   Code splitting per halaman otomatis oleh Next.js.
    *   Penggunaan Server Components secara maksimal untuk mengurangi JavaScript klien.
*   **Pengukuran**:
    *   Audit Lighthouse (mode produksi lokal, mobile-first) digunakan untuk mengukur Core Web Vitals (FCP, LCP, TBT/FID) dan mendapatkan skor performa serta saran perbaikan.
*   **CDN**:
    *   Deployment ke Vercel akan otomatis memanfaatkan CDN global untuk aset statis.