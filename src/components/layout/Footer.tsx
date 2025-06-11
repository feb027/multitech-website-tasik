// src/components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
// Impor ikon dari lucide-react jika Anda ingin menggunakannya
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'; // Contoh ikon

// Data untuk link media sosial (sesuaikan dengan milik Multitech)
const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/multitechtasik',
    Icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/multitechtasik',
    Icon: Instagram,
  },
  { name: 'LinkedIn', href: '#', Icon: Linkedin }, // Jika ada
  { name: 'YouTube', href: '#', Icon: Youtube }, // Jika ada
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#001A4D] pt-16 pb-8 text-slate-200'>
      {' '}
      {/* Latar biru tua, teks terang */}
      {/* Garis aksen merah di atas */}
      <div className='absolute top-0 right-0 left-0 h-1 bg-red-600'></div>
      <div className='container mx-auto px-6'>
        <div className='mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
          {/* Kolom 1: Logo & Deskripsi Singkat */}
          <div className='lg:col-span-1'>
            <Link href='/' className='mb-4 inline-block'>
              {/* Ganti dengan komponen Logo jika sudah ada, atau next/image */}
              <h2 className='text-3xl font-bold text-white transition-colors duration-300 hover:text-red-500'>
                MULTITECH
              </h2>
            </Link>
            <p className='text-sm leading-relaxed text-slate-300'>
              Solusi IT profesional dan terpercaya di Tasikmalaya. Kami hadir
              untuk semua kebutuhan teknologi Anda.
            </p>
          </div>

          {/* Kolom 2: Layanan Utama (Contoh) */}
          <div>
            <h4 className='mb-5 border-l-4 border-red-500 pl-3 text-lg font-semibold text-white'>
              Layanan Kami
            </h4>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link
                  href='/layanan'
                  className='transition-colors hover:text-red-400'
                >
                  Servis Komputer PC
                </Link>
              </li>
              <li>
                <Link
                  href='/layanan'
                  className='transition-colors hover:text-red-400'
                >
                  Servis Laptop
                </Link>
              </li>
              <li>
                <Link
                  href='/layanan'
                  className='transition-colors hover:text-red-400'
                >
                  Instalasi Jaringan
                </Link>
              </li>
              <li>
                <Link
                  href='/layanan'
                  className='transition-colors hover:text-red-400'
                >
                  Perbaikan Printer
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Navigasi */}
          <div>
            <h4 className='mb-5 border-l-4 border-red-500 pl-3 text-lg font-semibold text-white'>
              Navigasi
            </h4>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link
                  href='/tentang-kami'
                  className='transition-colors hover:text-red-400'
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href='/kontak'
                  className='transition-colors hover:text-red-400'
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='transition-colors hover:text-red-400'
                >
                  Blog & Artikel
                </Link>
              </li>{' '}
              {/* Jika ada */}
              <li>
                <Link
                  href='/kebijakan-privasi'
                  className='transition-colors hover:text-red-400'
                >
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Media Sosial */}
          <div>
            <h4 className='mb-5 border-l-4 border-red-500 pl-3 text-lg font-semibold text-white'>
              Tetap Terhubung
            </h4>
            <p className='mb-2 text-sm'>
              Jl. Noenoeng Tisna Saputra No.54, Tawang, Tasikmalaya
            </p>
            <p className='mb-4 text-sm'>
              <a
                href='mailto:cvmultitech_tasik@yahoo.co.id'
                className='transition-colors hover:text-red-400'
              >
                cvmultitech_tasik@yahoo.co.id
              </a>
            </p>
            <div className='mt-5 flex space-x-4'>
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={name}
                  title={name}
                  className='transform text-slate-300 transition-all duration-200 hover:scale-110 hover:text-red-500'
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-slate-700 pt-8 text-center'>
          <p className='text-xs text-slate-400'>
            © {currentYear} Multitech Tasikmalaya. Dirancang dan dikembangkan
            dengan ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
