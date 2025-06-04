// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google'; // Impor font yang diinginkan
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Konfigurasi font Poppins untuk heading
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Pilih weight yang akan digunakan
  variable: '--font-poppins', // Nama variabel CSS
  display: 'swap',
});

// Konfigurasi font Open Sans untuk body
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Pilih weight yang akan digunakan
  variable: '--font-open-sans', // Nama variabel CSS
  display: 'swap',
});

// Metadata dasar untuk seluruh situs
// Ini bisa di-override atau ditambahkan pada level halaman
export const metadata: Metadata = {
  title: {
    default: 'Multitech Tasikmalaya', // Judul default
    template: '%s | Multitech Tasikmalaya', // Template untuk judul halaman spesifik
  },
  description: 'Solusi IT profesional dan layanan komputer terpercaya di Tasikmalaya. Perbaikan PC, laptop, printer, instalasi jaringan, dan lainnya.',
  // Tambahkan metadata lain yang relevan secara global nanti:
  // openGraph: { ... },
  // twitter: { ... },
  // icons: { icon: '/favicon.ico' }, // Jika sudah ada favicon
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id' className={`${poppins.variable} ${openSans.variable}`}>
      <body
        className={`font-sans bg-slate-50 text-slate-800 antialiased flex flex-col min-h-screen`}
        // `font-sans` akan menggunakan --font-open-sans karena kita akan set itu di tailwind.config
        // `antialiased` untuk rendering font yang lebih halus
        // `bg-slate-50 text-slate-800` sebagai warna dasar body jika konten tidak menutupi
      >
        <Header />
        <main className='flex-grow'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 