# Rencana Implementasi Website Profil "Multitech Tasikmalaya" (Fase 1 - Statis)

## Tahap 0: Inisialisasi & Penyiapan Proyek Dasar

1.  **Inisialisasi Proyek Next.js:**

    - Buat proyek Next.js baru menggunakan `create-next-app` (dengan App Router).
    - Pilih TypeScript jika diputuskan untuk digunakan (sangat direkomendasikan sesuai SRS).
    - **File/Folder Utama:** `package.json`, `next.config.js`, `tsconfig.json` (jika TS), direktori `app/`.
    - **Tes Validasi:**
      - Jalankan `npm run dev` (atau `yarn dev`).
      - Pastikan halaman selamat datang Next.js default muncul di browser tanpa error.

2.  **Struktur Direktori Proyek:**

    - Buat struktur folder dasar untuk modularitas:
      - `app/` (untuk routing dan layout halaman utama)
      - `components/` (untuk komponen UI yang dapat digunakan kembali)
        - `components/ui/` (untuk komponen UI generik seperti Button, Card, Input - jika tidak langsung dari library seperti Shadcn/UI)
        - `components/layout/` (untuk Header, Footer, PageLayout)
        - `components/sections/` (untuk bagian-bagian spesifik halaman, misal `HeroSection`, `ServiceListSection`)
      - `lib/` (untuk fungsi utilitas, data fetching helpers jika ada)
      - `data/` (untuk menyimpan file JSON/Markdown konten statis)
      - `public/` (untuk aset statis seperti gambar, ikon)
      - `styles/` (untuk file CSS global jika diperlukan di luar Tailwind)
    - **Tes Validasi:**
      - Verifikasi bahwa struktur direktori telah dibuat sesuai rencana.

3.  **Instalasi & Konfigurasi Dependensi Inti:**

    - Install Tailwind CSS dan konfigurasikan sesuai dokumentasi Next.js.
    - Install Framer Motion untuk animasi.
    - Install `clsx` atau `classnames` untuk utilitas class.
    - Install library ikon (misalnya, Lucide React atau Heroicons).
    - Setup ESLint dan Prettier dengan plugin yang relevan (react, jsx-a11y, typescript).
    - **File Utama:** `tailwind.config.js`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc.json`.
    - **Tes Validasi:**
      - Buat komponen sederhana dan terapkan beberapa class Tailwind untuk memastikan berfungsi.
      - Pastikan linting dan formatting berjalan saat menyimpan file.

4.  **Pembuatan File Data Konten Awal (Struktur):**
    - Buat file placeholder di direktori `data/` sesuai SRS (misalnya, `services.json`, `testimonials.json`, `companyInfo.json`).
    - Isi dengan beberapa data dummy yang mengikuti struktur yang direncanakan di SRS 4.3.
    - **File Utama:** `data/services.json`, `data/testimonials.json`, dll.
    - **Tes Validasi:**
      - Pastikan file JSON valid dan dapat di-import atau dibaca dalam kode (coba `console.log` isinya di sebuah page sederhana).

---

## Tahap 1: Layout Dasar & Komponen Global

1.  **Implementasi Komponen Header (`components/layout/Header.tsx`):**

    - Buat struktur dasar Header: Logo (placeholder awal), Navigasi Utama (daftar link statis awal sesuai halaman di SRS: Beranda, Tentang Kami, Layanan, Kontak, dll.).
    - Styling awal menggunakan Tailwind CSS.
    - Implementasi fungsionalitas _sticky_ atau _smart-sticky_ (NF.9.1).
    - **Tes Validasi:**
      - Verifikasi visual: Header tampil dengan benar di bagian atas.
      - Navigasi link dapat diklik (meskipun halaman tujuan belum ada).
      - Fitur _sticky_ berfungsi saat scroll.

2.  **Implementasi Komponen Footer (`components/layout/Footer.tsx`):**

    - Buat struktur dasar Footer: Copyright, link navigasi sekunder (jika ada), link media sosial (placeholder awal).
    - Styling awal menggunakan Tailwind CSS.
    - **Tes Validasi:**
      - Verifikasi visual: Footer tampil dengan benar di bagian bawah.

3.  **Implementasi Komponen Layout Utama (`components/layout/MainLayout.tsx` atau modifikasi `app/layout.tsx`):**

    - Buat komponen yang menggabungkan Header, konten halaman (sebagai `children`), dan Footer.
    - Terapkan di `app/layout.tsx` untuk digunakan di semua halaman.
    - Tambahkan metadata dasar (judul default, deskripsi) di `app/layout.tsx`.
    - **Tes Validasi:**
      - Buat halaman sederhana (`app/temp-page/page.tsx`).
      - Pastikan Header dan Footer muncul secara konsisten di halaman tersebut.
      - Cek tab browser untuk melihat judul default.

4.  **Implementasi Halaman 404 Kustom (`app/not-found.tsx`):**
    - Desain dan implementasikan halaman 404 yang user-friendly (F.9.4).
    - Sertakan link kembali ke Beranda.
    - **Tes Validasi:**
      - Akses URL yang tidak ada di website.
      - Pastikan halaman 404 kustom ditampilkan.

---

## Tahap 2: Implementasi Halaman-Halaman Utama (Konten Statis)

Untuk setiap halaman berikut, langkah umumnya adalah:

- Buat file routing di direktori `app/nama-halaman/page.tsx`.
- Impor dan gunakan `MainLayout`.
- Buat komponen-komponen spesifik untuk setiap seksi halaman di `components/sections/nama-halaman/`.
- Muat data dari file JSON/Markdown yang relevan di `data/`.
- Terapkan styling dengan Tailwind CSS dan animasi dasar dengan Framer Motion.
- Pastikan responsivitas dasar.

1.  **Implementasi Halaman Beranda (`app/page.tsx`):**

    - **Komponen Hero Section (`components/sections/home/HeroSection.tsx`):** Teks tagline, CTA, gambar/video latar (F.2.1).
    - **Komponen Ringkasan Multitech (`components/sections/home/AboutSummarySection.tsx`):** Teks singkat (F.2.2).
    - **Komponen Highlight Layanan (`components/sections/home/ServicesHighlightSection.tsx`):** Daftar beberapa layanan unggulan dengan ikon dan link (data dari `services.json`) (F.2.3). Gunakan komponen Kartu Layanan yang akan dibuat di Tahap 2.3.
    - **Komponen Testimoni (`components/sections/home/TestimonialSection.tsx`):** Tampilan beberapa testimoni (data dari `testimonials.json`) (F.2.4).
    - **Komponen CTA Sekunder (`components/sections/home/SecondaryCTASection.tsx`):** Ajakan kunjungan (F.2.5).
    - **Tes Validasi:**
      - Verifikasi visual: Semua seksi tampil sesuai desain dan urutan.
      - Data dari file JSON termuat dengan benar.
      - CTA dan link internal berfungsi (mengarahkan ke halaman yang sesuai, meskipun halaman itu sendiri mungkin belum selesai).
      - Animasi dasar (misal, _on-scroll reveal_) berfungsi.
      - Periksa responsivitas di berbagai ukuran layar (desktop, tablet, mobile).

2.  **Implementasi Halaman Tentang Kami (`app/tentang-kami/page.tsx`):**

    - **Komponen Sejarah (`components/sections/about/HistorySection.tsx`):** Teks sejarah (F.3.1).
    - **Komponen Visi Misi (`components/sections/about/VisionMissionSection.tsx`):** Teks visi & misi (F.3.2).
    - **Komponen Keunggulan (`components/sections/about/ValuesSection.tsx`):** Nilai-nilai perusahaan (F.3.3).
    - **(Opsional) Komponen Foto Tim (`components/sections/about/TeamSection.tsx`):** (F.3.4).
    - Ambil data dari file JSON (misalnya, `companyInfo.json` atau bagian dari file yang lebih besar).
    - **Tes Validasi:**
      - Verifikasi visual: Semua seksi tampil dengan konten yang relevan.
      - Periksa responsivitas.

3.  **Implementasi Halaman Layanan (`app/layanan/page.tsx`):**

    - **Komponen Daftar Layanan (`components/sections/services/ServiceList.tsx`):** Menampilkan semua layanan dari `data/services.json` (F.4.1).
    - **Komponen Kartu Layanan (`components/ui/ServiceCard.tsx` atau di dalam `components/sections/services/`):** Komponen individual untuk setiap layanan (ikon, judul, deskripsi singkat). Ini bisa reusable untuk _highlight_ di Beranda.
    - Implementasi detail layanan:
      - Opsi 1: _Expandable section_ di dalam `ServiceCard`.
      - Opsi 2: Halaman detail terpisah (misal `app/layanan/[slug]/page.tsx`). Untuk fase statis awal, _expandable section_ mungkin lebih sederhana (F.4.2, F.4.3).
    - **Tes Validasi:**
      - Verifikasi visual: Daftar layanan tampil, masing-masing dengan ikon dan deskripsi.
      - Detail layanan dapat diakses (baik _expandable_ atau link ke halaman detail).
      - Data layanan dari `services.json` termuat dengan benar.
      - Periksa responsivitas.

4.  **Implementasi Halaman Kontak (`app/kontak/page.tsx`):**

    - **Komponen Info Kontak (`components/sections/contact/ContactInfo.tsx`):** Alamat, telepon (klik-untuk-panggil), email, jam operasional, link media sosial (F.8.1, F.8.3, F.8.4, F.8.6, F.8.7). Data dari `companyInfo.json`.
    - **Komponen Peta (`components/sections/contact/MapEmbed.tsx`):** Embed Google Maps (IE.2.1, F.8.2).
    - **Komponen Formulir Kontak (`components/sections/contact/ContactForm.tsx`):**
      - Input fields: Nama, Email, Telepon, Subjek, Pesan (F.8.5.1).
      - Gunakan React Hook Form untuk manajemen state dan validasi sisi klien (F.8.5.2).
      - Implementasi Next.js API Route (`app/api/contact/route.ts`) untuk menangani submit formulir (validasi sisi server, kirim email via layanan email transaksional seperti Resend/SendGrid) (F.8.5.2, F.8.5.5, IE.2.3).
      - Integrasi Google reCAPTCHA (IE.2.2, F.8.5.3).
      - Tampilkan notifikasi sukses/gagal (F.8.5.4).
    - **Tes Validasi:**
      - Verifikasi visual: Semua informasi kontak dan formulir tampil.
      - Peta Google Maps termuat dan interaktif.
      - Nomor telepon bisa diklik di mobile.
      - Formulir: Validasi sisi klien berfungsi. Submit formulir mengirim data ke API route. Email diterima di alamat yang ditentukan. reCAPTCHA berfungsi mencegah submit tanpa validasi. Notifikasi tampil.
      - Periksa responsivitas.

5.  **(Opsional) Implementasi Halaman Galeri (`app/galeri/page.tsx`):**

    - **Komponen Grid Galeri (`components/sections/gallery/GalleryGrid.tsx`):** Menampilkan gambar-gambar dari `data/gallery.json` atau folder di `public/images/gallery/` (F.6.1).
    - Implementasi _lightbox_ atau _carousel_ saat gambar diklik (bisa menggunakan library eksternal ringan jika diperlukan) (F.6.2).
    - **Tes Validasi:**
      - Verifikasi visual: Gambar-gambar galeri tampil.
      - _Lightbox_ atau _carousel_ berfungsi saat gambar diklik.
      - Periksa responsivitas.

6.  **(Opsional) Implementasi Halaman Blog/Artikel (Statis) (`app/blog/page.tsx` dan `app/blog/[slug]/page.tsx`):**
    - **Struktur Konten Blog:** Gunakan file Markdown di `content/blog/` dengan _frontmatter_ (sesuai SRS 4.3).
    - Buat fungsi di `lib/blog.ts` untuk membaca dan mem-parsing file Markdown (`gray-matter`, `remark`).
    - **Halaman Daftar Blog (`app/blog/page.tsx`):**
      - Tampilkan daftar artikel (judul, ringkasan, thumbnail, tanggal) (F.7.1).
      - Link ke halaman detail artikel.
    - **Halaman Detail Artikel (`app/blog/[slug]/page.tsx`):**
      - Tampilkan konten artikel lengkap (F.7.2).
      - (Opsional) Tampilkan kategori/tag, tombol berbagi (F.7.3, F.7.5).
    - **Tes Validasi:**
      - Verifikasi visual: Halaman daftar blog dan detail artikel tampil dengan benar.
      - Konten Markdown ter-render sebagai HTML.
      - Navigasi antar artikel dan ke daftar blog berfungsi.
      - Periksa responsivitas.

---

## Tahap 3: Implementasi Persyaratan Non-Fungsional & Finalisasi

1.  **Optimasi Performa (NF.1):**

    - Gunakan komponen `next/image` untuk optimasi gambar otomatis (NF.1.4).
    - Pastikan _lazy loading_ untuk gambar di luar viewport.
    - Minifikasi CSS dan JavaScript (otomatis oleh Next.js di build produksi).
    - Audit dengan Lighthouse/PageSpeed Insights dan identifikasi area perbaikan.
    - **Tes Validasi:**
      - Skor Lighthouse (terutama Performa) memenuhi target awal (misalnya > 80).
      - Waktu muat (FCP, LCP) sesuai target NF.1.1, NF.1.2.
      - Periksa ukuran aset gambar dan skrip.

2.  **Penerapan Keamanan Dasar (NF.2):**

    - Pastikan semua form menggunakan HTTPS (otomatis jika di Vercel).
    - Validasi input sisi server untuk formulir kontak sudah diimplementasikan.
    - Simpan kredensial API (Google Maps, reCAPTCHA, Email Service) di _environment variables_ (`.env.local`, dan di Vercel).
    - **Tes Validasi:**
      - Cek penggunaan HTTPS di browser.
      - Pastikan _environment variables_ digunakan dan tidak ada _hardcoded keys_.
      - Coba kirim data tidak valid ke formulir kontak untuk memastikan validasi server bekerja.

3.  **Peningkatan Usabilitas & UX (NF.3):**

    - Review navigasi, pastikan intuitif dan konsisten.
    - Pastikan desain bersih, penggunaan _white space_ efektif, tipografi mudah dibaca.
    - Implementasikan _feedback_ visual (misalnya, _hover states_, _focus states_) dan animasi halus (Framer Motion) secara konsisten di seluruh elemen interaktif.
    - Pastikan website "mencolok" dan "unik" sesuai identitas brand (NF.3.7).
    - **Tes Validasi:**
      - Sesi _user testing_ informal (minta orang lain mencoba navigasi).
      - Verifikasi visual konsistensi desain dan animasi.

4.  **Pengujian Responsivitas Mendalam (NF.4):**

    - Uji setiap halaman di berbagai resolusi (Desktop, Tablet Portrait/Landscape, Mobile Portrait/Landscape) menggunakan DevTools browser.
    - Pastikan semua elemen interaktif mudah digunakan di layar sentuh.
    - **Tes Validasi:**
      - Tidak ada _layout breaking_, konten terpotong, atau elemen tumpang tindih di berbagai ukuran layar.
      - Interaksi sentuh berfungsi baik.

5.  **Penerapan Aksesibilitas (A11y) (NF.5):**

    - Gunakan HTML semantik (`<nav>`, `<main>`, `<article>`, `<aside>`, `<button>`, dll.).
    - Pastikan semua gambar informatif memiliki `alt` text yang deskriptif.
    - Cek kontras warna menggunakan tools online (misalnya, WebAIM Contrast Checker).
    - Uji navigasi keyboard (Tab, Shift+Tab, Enter, Space) di semua elemen interaktif.
    - Gunakan atribut ARIA jika diperlukan (misalnya, untuk komponen kustom yang kompleks).
    - Jalankan audit aksesibilitas (misalnya, Axe DevTools).
    - **Tes Validasi:**
      - Navigasi keyboard lancar.
      - Tidak ada error kritikal dari audit Axe.
      - Kontras warna memenuhi standar WCAG AA.
      - Pembaca layar (misalnya, NVDA/VoiceOver) dapat menginterpretasikan konten dengan benar (uji pada beberapa bagian penting).

6.  **Setup SEO Dasar (NF.7):**

    - Implementasikan meta tags (title, description) dinamis per halaman menggunakan `metadata` object di Next.js App Router. Konten meta tags bisa diambil dari file data.
    - Pastikan struktur heading (H1, H2, H3) benar per halaman.
    - Buat file `public/robots.txt`.
    - Implementasikan generasi `sitemap.xml` (bisa manual untuk situs statis sederhana atau menggunakan `next-sitemap` jika ada banyak halaman dinamis nantinya, disesuaikan untuk sumber data statis).
    - Integrasikan Google Analytics (GA4) dan siapkan Google Search Console.
    - **Tes Validasi:**
      - Periksa _source code_ halaman untuk memastikan meta tags unik per halaman.
      - Akses `/robots.txt` dan `/sitemap.xml` di browser.
      - Verifikasi data masuk ke Google Analytics setelah beberapa kunjungan.

7.  **Pengujian Kompatibilitas Browser (NF.8):**
    - Uji fungsionalitas dan tampilan di versi terbaru Chrome, Firefox, Safari, dan Edge.
    - **Tes Validasi:**
      - Tidak ada perbedaan signifikan dalam tampilan atau fungsionalitas antar browser target.

---

## Tahap 4: Deployment dan Pemeliharaan Awal

1.  **Persiapan Deployment ke Vercel:**

    - Buat repositori Git (GitHub/GitLab/Bitbucket) untuk proyek.
    - Hubungkan repositori ke akun Vercel.
    - Konfigurasikan _environment variables_ di Vercel (API keys, dll.).
    - **Tes Validasi:**
      - Vercel berhasil melakukan build dari _main branch_.
      - Deployment _preview_ dibuat untuk _pull request_ (jika menggunakan PR workflow).

2.  **Deployment Produksi Awal:**

    - Merge ke _main branch_ untuk memicu deployment produksi.
    - Tes semua fungsionalitas utama di lingkungan produksi.
    - **Tes Validasi:**
      - Website dapat diakses melalui domain Vercel (atau domain kustom jika sudah disetup).
      - Semua fitur berfungsi seperti di lingkungan pengembangan/preview.

3.  **Serah Terima Awal & Dokumentasi Developer:**

    - Dokumentasikan cara mengupdate konten statis (lokasi file JSON/Markdown, struktur data).
    - Dokumentasikan proses build dan deployment.
    - **Tes Validasi:**
      - Klien (atau perwakilan teknisnya) memahami cara meminta update konten kepada developer.
      - Developer lain (jika ada) dapat memahami struktur proyek.

4.  **Rencana Pemeliharaan (NF.6.1, NF.6.2):**
    - Jadwalkan pemeriksaan rutin untuk update dependensi.
    - Pastikan kode terstruktur dengan baik dan dikomentari jika perlu untuk kemudahan pemeliharaan oleh developer.
    - **Tes Validasi:**
      - Developer dapat dengan mudah menemukan dan memodifikasi bagian kode atau data tertentu.

---

## Implementasi Formulir Kontak dengan Email dan reCAPTCHA

### 1. Struktur Implementasi

- **Frontend:** `src/components/sections/contact/ContactFormSection.tsx`
  - Form dengan validasi menggunakan React Hook Form + Zod
  - Integrasi Google reCAPTCHA v2
  - Handling loading state dan feedback
- **Backend:** `src/app/api/contact/route.ts`
  - API route untuk memproses form submission
  - Validasi reCAPTCHA
  - Pengiriman email via SMTP

### 2. Setup yang Diperlukan

#### A. Google reCAPTCHA v2

1. Dapatkan domain website (untuk production)
2. Daftar di [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
3. Pilih reCAPTCHA v2 "I'm not a robot" Checkbox
4. Masukkan domain website
5. Dapatkan Site Key dan Secret Key
6. Tambahkan ke `.env.local`:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

#### B. SMTP Email

1. Siapkan akun email untuk SMTP (misal: Gmail, Outlook, atau provider email bisnis)
2. Dapatkan kredensial SMTP:
   - Host (misal: smtp.gmail.com)
   - Port (biasanya 587 untuk TLS)
   - Username (alamat email)
   - Password (atau App Password jika menggunakan 2FA)
3. Tambahkan ke `.env.local`:
   ```
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@domain.com
   SMTP_PASS=your_smtp_password
   ```

### 3. Alur Kerja Formulir

1. User mengisi form
2. Validasi client-side (React Hook Form + Zod)
3. User menyelesaikan reCAPTCHA
4. Form dikirim ke API route
5. API route:
   - Validasi input
   - Verifikasi reCAPTCHA dengan Google
   - Kirim email via SMTP
   - Return response ke frontend
6. Frontend menampilkan feedback ke user

### 4. Testing

- **Development:**
  - Form validation berfungsi
  - Loading state dan error handling
  - API route merespon dengan benar
- **Production:**
  - reCAPTCHA berfungsi
  - Email terkirim ke `cvmultitech_tasik@yahoo.co.id`
  - Form reset setelah submit berhasil

### 5. Troubleshooting

- **reCAPTCHA tidak muncul:**
  - Cek `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` di `.env.local`
  - Pastikan domain terdaftar di reCAPTCHA admin
- **Email tidak terkirim:**
  - Verifikasi kredensial SMTP
  - Cek log error di console
  - Pastikan port tidak diblokir firewall

### 6. Keamanan

- Kredensial SMTP dan reCAPTCHA Secret Key hanya digunakan di server
- Validasi input di client dan server
- Rate limiting di API route (opsional)
- Sanitasi input sebelum dikirim ke email

### 7. Maintenance

- Monitor error rate di API route
- Update dependensi secara berkala
- Backup kredensial di tempat aman
- Dokumentasikan perubahan konfigurasi

---

Rencana ini bersifat iteratif. Beberapa langkah dalam "Persyaratan Non-Fungsional" sebaiknya diintegrasikan selama pengembangan halaman, bukan hanya sebagai tahap akhir. Misalnya, responsivitas dan aksesibilitas dasar harus dipertimbangkan saat membuat setiap komponen dan halaman.
