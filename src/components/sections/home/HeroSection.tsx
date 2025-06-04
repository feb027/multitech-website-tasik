// src/components/sections/home/HeroSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, ArrowDownCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  const tagline = "Solusi IT Terpercaya Sejak 1999 di Tasikmalaya";
  const subTagline = "Dari penjualan komputer hingga service maintenance, Multitech Computer siap membantu kebutuhan teknologi Anda dengan pengalaman lebih dari 25 tahun.";
  const ctaButtonText = "Jelajahi Layanan Kami";
  const ctaButtonLink = "/layanan";
  const heroBackgroundImage = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"; // PASTIKAN PATH INI BENAR

  return (
    <section
      className='relative flex flex-col justify-center items-center min-h-screen text-white overflow-hidden'
    >
      {/* Background Image Layer dengan Efek Ken Burns */}
      <div className='absolute inset-0 z-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat animate-kenburns' // Terapkan kelas animasi di sini
          style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
        />
        {/* Opsional: Lapisan noise/tekstur halus */}
        {/* <div className='absolute inset-0 opacity-[0.03]' style={{backgroundImage: 'url(/images/textures/noise.png)'}}></div> */}
      </div>


      {/* Overlay Gradasi untuk Kontras dan Estetika */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#00102E]/90 via-[#001A4D]/85 to-[#000D24]/90 z-10'></div>
      {/* Aksen merah sangat halus di bawah, hampir tidak terlihat tapi memberi warmth */}
      <div className='absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#FF3333]/10 to-transparent z-10 opacity-70'></div>


      {/* Konten Utama */}
      <div className='container mx-auto px-6 relative z-20 text-center pt-24 pb-16 md:pt-28 md:pb-20'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 md:mb-6"
        >
          {/* Bisa jadi tempat untuk "sub-heading" atau badge seperti "Layanan Terbaik di Tasikmalaya" */}

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading mb-6 md:mb-8 leading-tight'
          style={{ textShadow: '0 3px 15px rgba(0,10,30,0.6)' }}
        >
          {tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className='text-lg sm:text-xl md:text-2xl font-sans mb-10 md:mb-12 max-w-3xl mx-auto text-slate-200/90' // Sedikit transparan untuk subtagline
          style={{ textShadow: '0 2px 8px rgba(0,10,30,0.4)' }}
        >
          {subTagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7, type: 'spring', stiffness: 100, damping: 12 }}
          className='mb-16 md:mb-24'
        >
          <Link
            href={ctaButtonLink}
            className='group inline-flex items-center gap-3 bg-gradient-to-br from-red-500 via-red-600 to-rose-600 
                       hover:from-red-600 hover:via-rose-500 hover:to-rose-600
                       text-white font-bold font-heading py-4 px-10 sm:py-4 sm:px-12 
                       text-lg sm:text-xl rounded-lg shadow-2xl hover:shadow-[0_12px_35px_-10px_rgba(239,68,68,0.7)]
                       transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-red-400/60'
          >
            {ctaButtonText}
            <ChevronRight
              size={28}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" // Efek ikon bergerak saat hover tombol
            />
          </Link>
        </motion.div>

        {/* Scroll Down Indicator (Opsional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className='absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer group'
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
          title="Scroll ke bawah"
        >
          <ArrowDownCircle
            size={40}
            className='text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300 animate-bounce'
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;