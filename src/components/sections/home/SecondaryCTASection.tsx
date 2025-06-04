// src/components/sections/home/SecondaryCTASection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, PhoneCall, MessageSquarePlus } from 'lucide-react';

const SecondaryCTASection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 relative overflow-hidden'>
      {/* Elemen dekoratif abstrak di latar */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-[#001A4D]/10 rounded-full blur-3xl opacity-60 animate-pulse-slow animation-delay-2000"></div>

      <div className='container mx-auto px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-16 md:mb-20 max-w-3xl mx-auto'
        >
          <h2 className='text-4xl md:text-5xl font-extrabold font-heading text-[#001A4D] mb-6'>
            Siap Mengambil Langkah Berikutnya?
          </h2>
          <p className='text-lg text-slate-700 leading-relaxed'>
            Baik Anda membutuhkan solusi IT segera, ingin berkonsultasi, atau sekadar ingin tahu lebih banyak,
            kami selalu siap menyambut Anda.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-stretch'>
          {/* Kartu CTA 1: Temukan Lokasi Kami */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className='group relative flex flex-col items-center justify-center text-center p-8 md:p-10 
                       bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                       border-t-4 border-red-500 hover:border-red-600 overflow-hidden'
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className='mb-6'>
                <MapPin className='w-16 h-16 md:w-20 md:h-20 text-red-500 group-hover:scale-110 transition-transform duration-300 mx-auto' strokeWidth={1.5} />
              </div>
              <h3 className='text-2xl md:text-3xl font-bold font-heading text-[#001A4D] mb-3'>
                Kunjungi Kami Langsung
              </h3>
              <p className='text-slate-600 mb-6 text-sm md:text-base'>
                Kunjungi toko kami di Jl. Noenoeng Tisna Saputra No 54, Kahuripan, Tawang untuk konsultasi langsung dan lihat produk terbaru.
              </p>
              <Link
                href="/kontak#peta-lokasi" // Mengarah ke section peta di halaman kontak
                className='inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-7 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'
              >
                Lihat Peta & Alamat
              </Link>
            </div>
          </motion.div>

          {/* Kartu CTA 2: Hubungi Kami */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className='group relative flex flex-col items-center justify-center text-center p-8 md:p-10 
                       bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                       border-t-4 border-[#002A70] hover:border-[#00398D] overflow-hidden'
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-[#002A70]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className='mb-6 flex justify-center space-x-4'>
                <PhoneCall className='w-12 h-12 md:w-16 md:h-16 text-[#00398D] group-hover:scale-110 transition-transform duration-300' strokeWidth={1.5} />
                <MessageSquarePlus className='w-12 h-12 md:w-16 md:h-16 text-[#00398D] group-hover:scale-110 transition-transform duration-300 delay-100' strokeWidth={1.5} />
              </div>
              <h3 className='text-2xl md:text-3xl font-bold font-heading text-[#001A4D] mb-3'>
                Konsultasi Gratis
              </h3>
              <p className='text-slate-600 mb-6 text-sm md:text-base'>
                Ada pertanyaan? Tim ahli kami siap membantu Anda menemukan solusi IT yang paling tepat.
              </p>
              <Link
                href="/kontak"
                className='inline-block bg-[#002A70] hover:bg-[#00398D] text-white font-semibold py-3 px-7 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105'
              >
                Hubungi Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



export default SecondaryCTASection;