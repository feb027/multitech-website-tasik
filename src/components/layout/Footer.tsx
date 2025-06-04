// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
// Impor ikon dari lucide-react jika Anda ingin menggunakannya
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'; // Contoh ikon

// Data untuk link media sosial (sesuaikan dengan milik Multitech)
const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/multitechtasik', Icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/multitechtasik', Icon: Instagram },
  { name: 'LinkedIn', href: '#', Icon: Linkedin }, // Jika ada
  { name: 'YouTube', href: '#', Icon: Youtube },   // Jika ada
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#001A4D] text-slate-200 pt-16 pb-8'> {/* Latar biru tua, teks terang */}
      {/* Garis aksen merah di atas */}
      <div className='h-1 bg-red-600 absolute top-0 left-0 right-0'></div>

      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
          {/* Kolom 1: Logo & Deskripsi Singkat */}
          <div className='lg:col-span-1'>
            <Link href='/' className='inline-block mb-4'>
              {/* Ganti dengan komponen Logo jika sudah ada, atau next/image */}
              <h2 className='text-3xl font-bold text-white hover:text-red-500 transition-colors duration-300'>
                MULTITECH
              </h2>
            </Link>
            <p className='text-sm text-slate-300 leading-relaxed'>
              Solusi IT profesional dan terpercaya di Tasikmalaya. Kami hadir untuk semua kebutuhan teknologi Anda.
            </p>
          </div>

          {/* Kolom 2: Layanan Utama (Contoh) */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-5 border-l-4 border-red-500 pl-3'>
              Layanan Kami
            </h4>
            <ul className='space-y-3 text-sm'>
              <li><Link href="/layanan/servis-komputer" className='hover:text-red-400 transition-colors'>Servis Komputer PC</Link></li>
              <li><Link href="/layanan/servis-laptop" className='hover:text-red-400 transition-colors'>Servis Laptop</Link></li>
              <li><Link href="/layanan/instalasi-jaringan" className='hover:text-red-400 transition-colors'>Instalasi Jaringan</Link></li>
              <li><Link href="/layanan/printer" className='hover:text-red-400 transition-colors'>Perbaikan Printer</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Navigasi */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-5 border-l-4 border-red-500 pl-3'>
              Navigasi
            </h4>
            <ul className='space-y-3 text-sm'>
              <li><Link href="/tentang-kami" className='hover:text-red-400 transition-colors'>Tentang Kami</Link></li>
              <li><Link href="/kontak" className='hover:text-red-400 transition-colors'>Hubungi Kami</Link></li>
              <li><Link href="/blog" className='hover:text-red-400 transition-colors'>Blog & Artikel</Link></li> {/* Jika ada */}
              <li><Link href="/kebijakan-privasi" className='hover:text-red-400 transition-colors'>Kebijakan Privasi</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Media Sosial */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-5 border-l-4 border-red-500 pl-3'>
              Tetap Terhubung
            </h4>
            <p className='text-sm mb-2'>
              Jl. Contoh No. 123, Kota Tasikmalaya
            </p>
            <p className='text-sm mb-4'>
              <a href="mailto:info@multitechtasik.com" className='hover:text-red-400 transition-colors'>info@multitechtasik.com</a>
            </p>
            <div className='flex space-x-4 mt-5'>
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={name}
                  title={name}
                  className='text-slate-300 hover:text-red-500 transform hover:scale-110 transition-all duration-200'
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-slate-700 pt-8 text-center'>
          <p className='text-xs text-slate-400'>
            © {currentYear} Multitech Tasikmalaya. Dirancang dan dikembangkan dengan ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;