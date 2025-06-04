// src/app/not-found.tsx
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react'; // Contoh ikon

export default function NotFound() {
  return (
    <div className='min-h-screen bg-slate-100 flex flex-col justify-center items-center px-4 text-center'>
      <div className='mb-8'>
        {/* Anda bisa mengganti ini dengan ilustrasi atau gambar 404 yang lebih menarik */}
        <AlertTriangle size={80} className='text-red-500 inline-block' />
      </div>
      <h1 className='text-5xl md:text-7xl font-bold text-[#001A4D] font-heading mb-4'>
        404
      </h1>
      <h2 className='text-2xl md:text-3xl font-semibold text-slate-700 font-heading mb-6'>
        Oops! Halaman Tidak Ditemukan.
      </h2>
      <p className='text-slate-600 max-w-md mb-10 text-lg'>
        Maaf, halaman yang Anda cari sepertinya tidak ada atau telah dipindahkan.
        Mari kembali ke jalan yang benar.
      </p>
      <Link
        href="/"
        className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-lg font-heading'
      >
        <Home size={20} />
        Kembali ke Beranda
      </Link>

      {/* Opsional: Tambahkan sedikit elemen desain */}
      <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#001A4D]/20 to-transparent opacity-50'></div>
    </div>
  );
}