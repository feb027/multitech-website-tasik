# Design Document & Software Requirements Specification (SRS)
## Website Profil Toko Komputer & Servis "Multitech Tasikmalaya"

**Versi:** 1.0
**Tanggal:** 3 Mei 2025
**Disusun Oleh:** Febnawan Fatur Rochman
**Klien:** Multitech Tasikmalaya

---

## Daftar Isi
1.  [Pendahuluan](#1-pendahuluan)
    1.1. [Tujuan Dokumen](#11-tujuan-dokumen)
    1.2. [Lingkup Proyek](#12-lingkup-proyek)
    1.3. [Definisi, Akronim, dan Singkatan](#13-definisi-akronim-dan-singkatan)
    1.4. [Referensi](#14-referensi)
    1.5. [Ikhtisar Dokumen](#15-ikhtisar-dokumen)
2.  [Deskripsi Umum](#2-deskripsi-umum)
    2.1. [Perspektif Produk](#21-perspektif-produk)
    2.2. [Fungsi Produk](#22-fungsi-produk)
    2.3. [Karakteristik Pengguna](#23-karakteristik-pengguna)
    2.4. [Batasan Umum](#24-batasan-umum)
    2.5. [Asumsi dan Ketergantungan](#25-asumsi-dan-ketergantungan)
3.  [Persyaratan Spesifik](#3-persyaratan-spesifik)
    3.1. [Persyaratan Fungsional](#31-persyaratan-fungsional)
    3.2. [Persyaratan Non-Fungsional](#32-persyaratan-non-fungsional)
    3.3. [Persyaratan Antarmuka Eksternal](#33-persyaratan-antarmuka-eksternal)
4.  [Desain Sistem](#4-desain-sistem)
    4.1. [Desain Arsitektur](#41-desain-arsitektur)
    4.2. [Desain UI/UX](#42-desain-uiux)
    4.3. [Desain Data (Konten Statis Awal)](#43-desain-data-konten-statis-awal)
5.  [Tech Stack](#5-tech-stack)
6.  [Rencana Deployment dan Pemeliharaan](#6-rencana-deployment-dan-pemeliharaan)
7.  [Potensi Pengembangan di Masa Depan](#7-potensi-pengembangan-di-masa-depan)

---

## 1. Pendahuluan

### 1.1. Tujuan Dokumen
Dokumen ini bertujuan untuk mendefinisikan secara detail persyaratan fungsional dan non-fungsional, serta aspek desain untuk pengembangan website profil toko komputer & servis "Multitech Tasikmalaya". Dokumen ini akan menjadi panduan bagi tim pengembang dan acuan bagi klien selama proses pengembangan.

### 1.2. Lingkup Proyek
Proyek ini mencakup desain dan pengembangan website profil perusahaan yang modern, profesional, bersih, _smooth_, responsif terhadap perangkat mobile, dan _eye-catching_ (mencolok) sesuai dengan identitas brand Multitech. Untuk fase awal ini, konten akan bersifat statis dan dikelola oleh developer.

**Termasuk dalam Lingkup:**
*   Desain UI/UX yang unik dan modern.
*   Pengembangan Frontend dengan konten statis (hardcoded atau dari file data lokal seperti JSON/Markdown).
*   Halaman-halaman utama: Beranda, Tentang Kami, Layanan, Galeri (opsional), Blog/Artikel (opsional, statis), Kontak.
*   Optimasi SEO dasar.
*   Optimasi performa website.
*   Fitur responsif untuk berbagai ukuran layar.
*   Animasi dan transisi yang halus.

**Tidak Termasuk dalam Lingkup (Kecuali disepakati terpisah):**
*   **Integrasi dengan Headless CMS untuk pengelolaan konten dinamis oleh klien (dipindahkan ke Potensi Pengembangan).**
*   **Halaman Produk dengan katalog dinamis (dipindahkan ke Potensi Pengembangan).**
*   Sistem E-commerce penuh (keranjang belanja, pembayaran online).
*   Sistem manajemen inventaris kompleks.
*   Fitur _user account_ dan login untuk pelanggan umum.
*   Pembuatan konten awal (teks, gambar detail layanan) – akan disediakan oleh klien.
*   Integrasi dengan sistem pihak ketiga yang kompleks di luar Google Maps.

### 1.3. Definisi, Akronim, dan Singkatan
*   **SRS:** Software Requirements Specification
*   **UI:** User Interface
*   **UX:** User Experience
*   **SEO:** Search Engine Optimization
*   **CTA:** Call to Action
*   **SSG:** Static Site Generation
*   **SSR:** Server-Side Rendering
*   **API:** Application Programming Interface
*   **PWA:** Progressive Web App (Tidak menjadi fokus utama, namun dasar Next.js mendukung)

### 1.4. Referensi
*   Logo Klien Multitech (disediakan).
*   Diskusi awal dengan klien mengenai preferensi desain dan fungsionalitas.
*   Dokumentasi resmi dari library dan framework yang digunakan.

### 1.5. Ikhtisar Dokumen
Dokumen ini dibagi menjadi beberapa bagian utama: Pendahuluan, Deskripsi Umum produk, Persyaratan Spesifik (fungsional, non-fungsional, antarmuka), Desain Sistem (arsitektur, UI/UX, data), Tech Stack yang akan digunakan, serta rencana deployment dan pemeliharaan.

---

## 2. Deskripsi Umum

### 2.1. Perspektif Produk
Website ini akan menjadi representasi digital utama dari Multitech Tasikmalaya. Berfungsi sebagai platform informasi, pemasaran, dan titik kontak awal bagi calon pelanggan maupun pelanggan setia. Website ini diharapkan dapat meningkatkan _brand awareness_, kredibilitas, dan menjangkau audiens yang lebih luas.

### 2.2. Fungsi Produk
*   Menampilkan informasi profil perusahaan Multitech.
*   Menyajikan detail layanan yang ditawarkan (servis komputer, laptop, printer, instalasi, jaringan, dll.).
*   Menyediakan galeri foto (toko, kegiatan, hasil kerja).
*   Menyediakan platform untuk artikel/blog terkait teknologi atau tips (opsional, konten statis).
*   Memfasilitasi kontak dengan calon pelanggan melalui formulir, nomor telepon, email, dan peta lokasi.
*   Menampilkan testimoni pelanggan untuk membangun kepercayaan.
*   **(Untuk Fase Ini):** Konten website akan dikelola dan diperbarui oleh developer berdasarkan permintaan klien.

### 2.3. Karakteristik Pengguna
*   **Pengguna Umum/Calon Pelanggan:** Individu atau bisnis di Tasikmalaya dan sekitarnya yang mencari layanan perbaikan komputer, laptop, printer, atau ingin membeli produk terkait IT. Mereka mencari informasi yang jelas, cepat, dan meyakinkan.
*   **(Untuk Fase Ini):** Tidak ada peran Admin/Klien dengan akses ke CMS. Update konten dilakukan oleh developer.

### 2.4. Batasan Umum
*   Website harus selesai dalam jangka waktu yang disepakati.
*   Anggaran proyek sesuai kesepakatan.
*   Desain harus mengacu pada logo dan identitas brand Multitech.
*   Teknologi yang digunakan harus modern, _scalable_, dan _maintainable_ (sesuai rekomendasi di bagian Tech Stack).
*   Klien akan menyediakan materi konten utama (teks deskripsi, foto layanan berkualitas tinggi).

### 2.5. Asumsi dan Ketergantungan
*   Perubahan konten akan dikoordinasikan dengan developer.
*   Logo yang diberikan adalah versi final dan siap digunakan.
*   Akses ke informasi yang dibutuhkan untuk konten (detail layanan, dll.) akan diberikan tepat waktu oleh klien.
*   Jika ada API pihak ketiga (selain Google Maps), kredensial akan disediakan oleh klien.

---

## 3. Persyaratan Spesifik

### 3.1. Persyaratan Fungsional

**F.1. Manajemen Konten (Oleh Developer)**
*   F.1.1. Developer dapat menambah, mengubah, dan menghapus konten untuk setiap halaman (Beranda, Tentang Kami, Layanan, Galeri, Blog, Kontak) melalui kode atau file data lokal (misalnya JSON, Markdown).
*   F.1.2. Developer dapat mengelola daftar layanan (nama, deskripsi, ikon, gambar).
*   F.1.3. Developer dapat mengelola postingan blog/artikel (judul, isi, kategori, gambar thumbnail, penulis, tanggal).
*   F.1.4. Developer dapat mengelola testimoni pelanggan (nama, teks testimoni, foto jika ada).
*   F.1.5. Developer dapat mengelola item galeri (gambar, deskripsi singkat).
*   F.1.6. Developer dapat mengupdate informasi kontak perusahaan (alamat, telepon, email, jam operasional, link media sosial).

**F.2. Halaman Beranda (Homepage)**
*   F.2.1. Menampilkan _hero section_ yang mencolok dengan _tagline_ utama dan CTA (misalnya, ke halaman layanan atau kontak). Dapat berupa gambar berkualitas tinggi atau video pendek (looping, tanpa suara).
*   F.2.2. Menampilkan ringkasan singkat tentang Multitech.
*   F.2.3. Menampilkan _highlight_ layanan unggulan dengan ikon dan link ke detail layanan.
*   F.2.4. Menampilkan beberapa testimoni pelanggan secara acak atau terbaru.
*   F.2.5. Menyertakan CTA sekunder (misalnya, ajakan kunjungi toko atau lihat peta).
*   F.2.6. Navigasi utama yang jelas dan mudah diakses.

**F.3. Halaman Tentang Kami (About Us)**
*   F.3.1. Menampilkan sejarah singkat Multitech.
*   F.3.2. Menampilkan visi dan misi perusahaan.
*   F.3.3. Menampilkan nilai-nilai atau keunggulan Multitech (misalnya, teknisi berpengalaman, layanan cepat, harga kompetitif).
*   F.3.4. (Opsional) Menampilkan foto tim atau suasana kerja.

**F.4. Halaman Layanan (Services)**
*   F.4.1. Menampilkan daftar semua layanan yang ditawarkan.
*   F.4.2. Setiap layanan memiliki halaman detail atau deskripsi lengkap (dapat berupa _expandable section_ atau halaman terpisah).
*   F.4.3. Detail layanan mencakup deskripsi, manfaat, dan mungkin estimasi waktu pengerjaan atau lingkup kerja.
*   F.4.4. Menggunakan ikonografi yang relevan untuk setiap layanan.

**F.5. Halaman Produk (Products - Dipindahkan ke Potensi Pengembangan)**
*   *Tidak termasuk dalam lingkup awal.*

**F.6. Halaman Galeri (Gallery - Opsional)**
*   F.6.1. Menampilkan kumpulan foto terkait Multitech (suasana toko, acara, hasil servis).
*   F.6.2. Foto dapat dilihat dalam format _lightbox_ atau _carousel_ saat diklik.

**F.7. Halaman Blog/Artikel (Blog - Opsional, Konten Statis)**
*   F.7.1. Menampilkan daftar postingan blog/artikel dengan judul, ringkasan, gambar thumbnail, dan tanggal publikasi.
*   F.7.2. Menyediakan halaman detail untuk setiap artikel.
*   F.7.3. (Opsional) Fitur kategori atau tag untuk artikel.
*   F.7.4. (Opsional) Fitur pencarian artikel (jika artikel cukup banyak dan statis).
*   F.7.5. (Opsional) Tombol berbagi ke media sosial.

**F.8. Halaman Kontak (Contact Us)**
*   F.8.1. Menampilkan alamat lengkap Multitech.
*   F.8.2. Menampilkan peta interaktif (Google Maps) yang menunjukkan lokasi toko.
*   F.8.3. Menampilkan nomor telepon yang bisa diklik (call-to-action) di perangkat mobile.
*   F.8.4. Menampilkan alamat email.
*   F.8.5. Menyediakan formulir kontak untuk pertanyaan atau permintaan layanan.
    *   F.8.5.1. Formulir berisi field: Nama, Email, Nomor Telepon, Subjek, Pesan.
    *   F.8.5.2. Validasi input pada sisi klien dan server.
    *   F.8.5.3. Perlindungan dari spam (misalnya, Google reCAPTCHA).
    *   F.8.5.4. Notifikasi keberhasilan atau kegagalan pengiriman pesan.
    *   F.8.5.5. Pesan dari formulir dikirim ke email yang ditentukan oleh klien.
*   F.8.6. Menampilkan jam operasional toko.
*   F.8.7. Menampilkan link ke akun media sosial Multitech (jika ada).

**F.9. Fitur Umum**
*   F.9.1. Header: Logo, navigasi utama, (opsional) tombol pencarian. Header _sticky_ atau _smart-sticky_.
*   F.9.2. Footer: Copyright, link navigasi sekunder (misalnya, Kebijakan Privasi jika ada), link media sosial.
*   F.9.3. Fitur Pencarian (Opsional, jika konten statis banyak): Memungkinkan pengguna mencari konten di seluruh website.
*   F.9.4. Halaman 404 kustom yang informatif dan user-friendly.

### 3.2. Persyaratan Non-Fungsional

**NF.1. Performa**
*   NF.1.1. Waktu muat halaman awal (First Contentful Paint) di bawah 2.5 detik pada koneksi 3G cepat.
*   NF.1.2. Largest Contentful Paint (LCP) di bawah 2.5 detik.
*   NF.1.3. Total Blocking Time (TBT) rendah.
*   NF.1.4. Optimasi gambar (kompresi, format modern seperti WebP, _lazy loading_).
*   NF.1.5. Minifikasi CSS, JavaScript.
*   NF.1.6. Menggunakan CDN untuk aset statis.

**NF.2. Keamanan**
*   NF.2.1. Menggunakan HTTPS di seluruh website.
*   NF.2.2. Perlindungan terhadap XSS dan CSRF dasar (Next.js sudah memiliki beberapa proteksi bawaan).
*   NF.2.3. Validasi input pada sisi server untuk formulir.
*   NF.2.4. Kredensial API disimpan dengan aman (menggunakan _environment variables_).

**NF.3. Usabilitas & UX**
*   NF.3.1. Navigasi intuitif dan konsisten di seluruh website.
*   NF.3.2. Desain bersih, modern, dan profesional.
*   NF.3.3. Penggunaan _white space_ yang efektif.
*   NF.3.4. Tipografi yang mudah dibaca (kontras baik, ukuran font sesuai).
*   NF.3.5. _Feedback_ visual untuk interaksi pengguna (misalnya, _hover state_ pada tombol).
*   NF.3.6. Animasi dan transisi yang halus, tidak mengganggu, dan menambah nilai estetika (_smooth_).
*   NF.3.7. Website harus "mencolok" dan "unik" namun tetap profesional, memanfaatkan warna dan elemen geometris dari logo.

**NF.4. Responsivitas**
*   NF.4.1. Website harus tampil optimal dan fungsional di berbagai ukuran layar (desktop, tablet, mobile).
*   NF.4.2. Menggunakan pendekatan _mobile-first_ atau _graceful degradation/progressive enhancement_.
*   NF.4.3. Elemen interaktif mudah digunakan pada layar sentuh.

**NF.5. Aksesibilitas (A11y)**
*   NF.5.1. Bertujuan untuk memenuhi standar WCAG 2.1 Level AA.
*   NF.5.2. Penggunaan HTML semantik yang benar.
*   NF.5.3. Teks alternatif (alt text) untuk semua gambar informatif.
*   NF.5.4. Kontras warna yang memadai antara teks dan latar belakang.
*   NF.5.5. Navigasi keyboard yang fungsional.
*   NF.5.6. Penggunaan atribut ARIA jika diperlukan.

**NF.6. Maintainabilitas & Skalabilitas**
*   NF.6.1. Kode sumber terstruktur dengan baik, bersih, dan mudah dipahami. Konten statis diorganisir dalam file data (misal JSON/Markdown) untuk kemudahan update oleh developer.
*   NF.6.2. Komentar pada kode jika diperlukan untuk bagian yang kompleks.
*   NF.6.3. Penggunaan komponen yang dapat digunakan kembali (reusable).
*   NF.6.4. Mudah untuk menambahkan halaman atau fitur baru di masa depan.
*   NF.6.5. Arsitektur disiapkan agar mudah diintegrasikan dengan CMS di masa depan.

**NF.7. SEO (Search Engine Optimization)**
*   NF.7.1. Menggunakan Next.js untuk SSR/SSG yang ramah SEO.
*   NF.7.2. Penggunaan URL yang bersih dan deskriptif.
*   NF.7.3. Implementasi meta tags (title, description, keywords) yang dapat dikelola melalui kode atau file data.
*   NF.7.4. Pembuatan `sitemap.xml` secara otomatis (atau manual untuk situs statis sederhana).
*   NF.7.5. Pembuatan `robots.txt`.
*   NF.7.6. Struktur heading (H1, H2, H3) yang benar.
*   NF.7.7. Integrasi dengan Google Analytics dan Google Search Console.

**NF.8. Kompatibilitas Browser**
*   NF.8.1. Website harus berfungsi dengan baik di versi terbaru browser modern: Chrome, Firefox, Safari, Edge.

### 3.3. Persyaratan Antarmuka Eksternal

**IE.1. Antarmuka Pengguna (UI)**
*   IE.1.1. Menggunakan palet warna utama dari logo Multitech: Merah (misalnya `#FF0000` atau variasi dekatnya) dan Biru (misalnya `#003399` atau variasi dekatnya), dengan Putih/Abu-abu muda sebagai dasar untuk kesan bersih.
*   IE.1.2. Tipografi modern sans-serif yang mudah dibaca. Pertimbangkan satu font untuk heading (misalnya, Montserrat, Poppins) dan satu untuk body text (Open Sans, Lato). Judul bisa lebih berani dan ekspresif.
*   IE.1.3. Penggunaan elemen geometris (diagonal, heksagonal) yang terinspirasi dari logo sebagai motif desain.
*   IE.1.4. Gaya fotografi/gambar yang konsisten, berkualitas tinggi, dan profesional.
*   IE.1.5. Ikonografi yang modern dan konsisten.

**IE.2. Antarmuka Perangkat Lunak**
*   IE.2.1. **Google Maps API:** Untuk menampilkan peta lokasi interaktif.
*   IE.2.2. **Google reCAPTCHA API:** Untuk proteksi spam pada formulir kontak.
*   IE.2.3. **Transactional Email Service API (misalnya, Resend, SendGrid):** Untuk pengiriman email dari formulir kontak secara reliable.

**IE.3. Antarmuka Perangkat Keras**
*   Tidak ada persyaratan antarmuka perangkat keras spesifik selain kompatibilitas dengan perangkat standar (desktop, laptop, tablet, smartphone).

---

## 4. Desain Sistem

### 4.1. Desain Arsitektur
*   **Arsitektur Jamstack (Fase Awal - Statis):** Frontend dibangun menggunakan Next.js (React framework) yang menghasilkan halaman statis (SSG) atau render sisi server (SSR) untuk performa dan SEO optimal.
*   **Konten Statis:** Data konten akan disimpan dalam file lokal (misalnya, JSON, Markdown) di dalam repositori proyek dan di-build bersama aplikasi.
*   **Deployment:** Vercel akan digunakan untuk hosting, CI/CD, dan CDN global.
*   **API Routes (Next.js):** Digunakan untuk fungsi backend ringan seperti penanganan formulir kontak, yang kemudian dapat berinteraksi dengan layanan email transaksional.

```mermaid
graph TD
    A[Pengguna] -->|HTTPS| B(Vercel CDN/Next.js Frontend);
    B -->|Data Statis| X[File Data Lokal (JSON/MD)];
    B -->|API Call (Serverless Function)| D(Next.js API Route);
    D -->|API Call| E(Layanan Email Transaksional);
    D -->|API Call| F(Google reCAPTCHA API);
    B -->|Embed| G(Google Maps API);

    Developer[Developer] -->|Manajemen Konten (Kode/File Data)| B;
```

### 4.2. Desain UI/UX

**Prinsip Utama:**
*   **Bersih & Minimalis:** Fokus pada konten, hindari clutter, manfaatkan _white space_.
*   **Modern & Profesional:** Tampilan terkini, tipografi jelas, palet warna konsisten.
*   **Mencolok (_Eye-Catching_):** Penggunaan warna merah dari logo secara strategis untuk CTA dan aksen penting. Elemen visual yang menarik perhatian (gambar berkualitas, animasi halus).
*   **Unik & Tidak Generik:** Pemanfaatan bentuk geometris dari logo (diagonal, heksagonal) dalam layout, _card design_, atau sebagai motif latar belakang. Pertimbangkan layout asimetris yang terstruktur.
*   **Smooth Experience:** Animasi halaman, transisi, dan _micro-interactions_ yang halus menggunakan Framer Motion.
*   **Intuitif:** Pengguna harus mudah menemukan informasi yang dicari.
*   **Konsisten:** Gaya desain (warna, font, tombol, spasi) seragam di seluruh halaman.

**Elemen Kunci Desain:**
*   **Warna:**
    *   Primer: Merah (dari logo, untuk CTA, aksen kuat).
    *   Sekunder: Biru (dari logo, untuk elemen informatif, footer, hover state).
    *   Dasar: Putih/Abu-abu sangat muda (untuk latar belakang utama, teks).
    *   (Opsional) Mode Gelap: Pertimbangkan dark mode dengan aksen merah menyala untuk kesan modern-berani.
*   **Tipografi:**
    *   Heading: Font sans-serif yang modern dan berkarakter (misalnya, Montserrat, Poppins, Bebas Neue).
    *   Body: Font sans-serif yang sangat mudah dibaca (misalnya, Open Sans, Lato, Roboto).
*   **Layout:**
    *   Grid system yang fleksibel (Tailwind CSS).
    *   Eksplorasi layout asimetris dan _split screen_ untuk beberapa seksi.
    *   Penggunaan _card design_ yang menarik untuk layanan, mungkin dengan bentuk heksagonal atau sudut diagonal.
*   **Animasi (Framer Motion):**
    *   Transisi halaman yang halus.
    *   Animasi _on-scroll_ (fade-in, slide-in, parallax tipis).
    *   Efek _hover_ interaktif pada tombol, kartu, dan link.
    *   _Micro-interactions_ pada elemen UI.
*   **Ikonografi:** Set ikon modern dan konsisten (misalnya, Lucide Icons, Heroicons).

### 4.3. Desain Data (Konten Statis Awal)
Struktur data untuk konten statis akan diorganisir dalam file-file lokal (misalnya, `data/services.json`, `data/testimonials.json`, atau file Markdown untuk posting blog).

Contoh struktur file `data/services.json`:
```json
[
  {
    "id": "service-01",
    "title": "Servis Komputer PC",
    "slug": "servis-komputer-pc",
    "shortDescription": "Perbaikan cepat dan handal untuk semua masalah PC Anda.",
    "fullDescription": "Detail lengkap mengenai layanan perbaikan PC...",
    "icon": "computer-icon.svg", // atau nama class ikon dari library
    "coverImage": "/images/services/pc-service.jpg",
    "order": 1
  },
  // ... layanan lainnya
]
```

Contoh struktur file `content/blog/artikel-pertama.md` (jika menggunakan Markdown untuk blog):
```markdown
---
title: Tips Merawat Laptop Agar Awet
slug: tips-merawat-laptop
author: Tim Multitech
publishedAt: 2023-10-27
mainImage: /images/blog/laptop-care.jpg
excerpt: Beberapa tips sederhana namun efektif untuk menjaga laptop Anda tetap prima.
categories: ["Tips", "Laptop"]
tags: ["perawatan", "hardware"]
---

Isi artikel di sini...
```
Ini akan dibaca dan diproses oleh Next.js saat build time (SSG) atau request time (SSR).

---

## 5. Tech Stack

*   **Frontend Framework:** **Next.js (v13+ dengan App Router)**
    *   *Alasan:* SSR/SSG, routing, image optimization, API routes, performa, DX.
*   **UI Library:** **React (v18+)**
    *   *Alasan:* Komponen UI deklaratif, ekosistem besar.
*   **Animation Library:** **Framer Motion**
    *   *Alasan:* Animasi kompleks dan halus dengan API deklaratif untuk React.
*   **Styling:**
    *   **Tailwind CSS:** Utility-first CSS framework untuk development cepat dan konsisten.
    *   **CSS Modules / SCSS Modules:** Untuk styling komponen kustom yang lebih kompleks, jika diperlukan.
    *   `clsx` atau `classnames`: Utility untuk menggabungkan class names secara kondisional.
*   **Data Konten (Fase Awal):**
    *   **File Lokal (JSON, Markdown):** Untuk konten statis.
    *   `gray-matter`: Untuk parsing frontmatter dari file Markdown.
    *   `remark` / `remark-html`: Untuk konversi Markdown ke HTML.
*   **State Management (Jika Perlu Kompleksitas Lebih):**
    *   **Zustand / Jotai:** Ringan dan simpel untuk state global.
    *   **React Context API:** Untuk state sederhana.
*   **Form Handling:**
    *   **React Hook Form:** Performa tinggi, mudah digunakan.
    *   **Zod:** Skema validasi dengan inferensi tipe TypeScript (jika menggunakan TS).
*   **Icons:**
    *   **Lucide React** atau **Heroicons:** Set ikon SVG modern dan ringan.
    *   **React Icons:** Akses ke banyak set ikon populer.
*   **Utilities:**
    *   **`date-fns` atau `dayjs`:** Untuk formatting tanggal (misalnya di blog).
    *   **`next-sitemap`:** Untuk generasi sitemap otomatis (perlu disesuaikan untuk sumber data statis).
    *   **`eslint` & `prettier`:** Untuk code linting dan formatting.
        *   `eslint-plugin-jsx-a11y`: Untuk linting isu aksesibilitas.
        *   `eslint-plugin-react`: Aturan linting spesifik React.
        *   `eslint-plugin-react-hooks`: Aturan untuk React Hooks.
*   **Bahasa Pemrograman:** JavaScript (ES6+) atau **TypeScript** (sangat direkomendasikan untuk type safety dan maintainabilitas).
*   **Deployment & Hosting:** **Vercel**
    *   *Alasan:* Integrasi sempurna dengan Next.js, CI/CD, CDN global, free tier.
*   **Analitik:** **Google Analytics (GA4)**
*   **Lain-lain:**
    *   **Google Maps Embed API**
    *   **Google reCAPTCHA (v3 atau v2 checkbox)**
    *   **Transactional Email Service (misalnya Resend, SendGrid)**

---

## 6. Rencana Deployment dan Pemeliharaan

*   **Lingkungan Pengembangan:** Lokal menggunakan `next dev`.
*   **Lingkungan Staging/Preview:** Vercel akan otomatis membuat _preview deployments_ untuk setiap _pull request_ atau _commit_ ke branch tertentu.
*   **Lingkungan Produksi:** Vercel, terhubung ke _main branch_ repositori Git (GitHub/GitLab/Bitbucket).
*   **Proses CI/CD:** Otomatis via Vercel. Setiap _push_ ke _main branch_ akan memicu build dan deployment ke produksi.
*   **Monitoring:**
    *   Vercel Analytics (untuk performa dan traffic dasar).
    *   Google Analytics (untuk analisis traffic mendalam).
    *   Error monitoring (misalnya, Sentry - opsional jika budget memungkinkan).
*   **Backup:**
    *   Kode Sumber dan Konten Statis: Repositori Git.
*   **Pemeliharaan:**
    *   Update konten oleh developer berdasarkan permintaan klien (perubahan pada file data atau kode).
    *   Update dependensi (Next.js, libraries) secara berkala oleh developer (perlu kesepakatan maintenance).
    *   Monitoring keamanan dan performa.

---

## 7. Potensi Pengembangan di Masa Depan
*   Integrasi Headless CMS (misalnya Sanity.io): Untuk memungkinkan klien mengelola konten secara mandiri.
*   Pengembangan Halaman Produk: Dengan katalog produk, kategori, dan detail produk.
*   Integrasi E-commerce dasar (misalnya, link ke marketplace atau sistem pemesanan sederhana).
*   Fitur booking online untuk layanan servis.
*   Kalkulator perkiraan biaya servis.
*   Forum komunitas atau Q&A.
*   Peningkatan fitur PWA (notifikasi push, offline access untuk beberapa konten).

