// src/components/sections/home/AboutSummarySection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Zap, Users, CheckCircle, ArrowRight } from 'lucide-react';

const AboutSummarySection: React.FC = () => {
  const sectionSubTitle = "Partner Teknologi Anda";
  const sectionTitle = "Lebih Dari Sekedar Toko Komputer Biasa";
  const mainSummary = "Sejak 1 Maret 1999, Multitech Computer berkomitmen menjadi perusahaan teknologi informasi terpercaya yang bermanfaat bagi masyarakat Tasikmalaya. Kami hadir untuk membantu memenuhi kebutuhan IT dengan layanan yang profesional dan komprehensif.";
  const secondarySummary = "Dengan pengalaman lebih dari 25 tahun, kami telah melayani masyarakat umum, swasta, dan instansi pemerintah. Tim kami siap mendampingi Anda dalam setiap kebutuhan teknologi, dari konsultasi hingga purna jual.";
  
  const points = [
    { icon: Zap, text: "Berpengalaman Sejak 1999" },
    { icon: Users, text: "Tim Teknisi Profesional" },
    { icon: CheckCircle, text: "Authorized Partner Resmi" }
  ];
  const ctaButtonText = "Pelajari Filosofi Kami";
  const ctaButtonLink = "/tentang-kami";

  return (
    <section className='py-20 md:py-32 bg-white overflow-hidden'> {/* Latar putih bersih atau bg-slate-50 */}
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center'>
          
          {/* Kolom Kiri: Judul & Poin Keunggulan */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='md:col-span-5 lg:col-span-5' // Sedikit penyesuaian lebar kolom
          >
            <span className='text-sm font-semibold uppercase tracking-wider text-red-600 mb-2 block'>
              {sectionSubTitle}
            </span>
            <h2 className='text-4xl lg:text-5xl font-bold font-heading text-[#001A4D] mb-8 md:mb-10 leading-tight'>
              {sectionTitle}
            </h2>
            <div className='space-y-4'> {/* Mengurangi space-y sedikit */}
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: "easeOut" }}
                  className='flex items-center gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/70 hover:bg-slate-100 hover:shadow-md transition-all duration-300'
                >
                  <point.icon className='w-7 h-7 text-red-600 flex-shrink-0' />
                  <span className='text-base lg:text-lg font-medium text-slate-700'>{point.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Garis Pemisah Dekoratif (Hanya di layar besar) */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className='hidden md:block md:col-span-1 lg:col-span-1 h-4/5 w-px bg-gradient-to-b from-transparent via-red-500/40 to-transparent mx-auto self-center' // Penyesuaian tinggi dan alignment
            style={{ transformOrigin: 'center' }}
          ></motion.div>
          
          {/* Kolom Kanan: Deskripsi & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className='md:col-span-6 lg:col-span-6' // Sedikit penyesuaian lebar kolom
          >
            <div className="p-8 lg:p-10 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 rounded-xl shadow-xl relative">
              {/* Aksen bentuk abstrak di latar (opsional) */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -translate-x-1/3 -translate-y-1/3 z-0"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#001A4D]/10 rounded-full blur-2xl translate-x-1/4 translate-y-1/4 z-0"></div>
              
              <div className="relative z-10"> {/* Konten di atas aksen blur */}
                <p className='text-xl lg:text-2xl text-slate-700/90 leading-relaxed mb-6 font-light italic'>
                  “{mainSummary}”
                </p>
                <p className='text-base lg:text-lg text-slate-600 leading-relaxed mb-10'>
                  {secondarySummary}
                </p>
                <Link
                  href={ctaButtonLink}
                  className='group inline-flex items-center gap-2 text-lg font-semibold font-heading text-red-600
                            hover:text-red-700 transition-colors duration-300 group'
                >
                  {ctaButtonText}
                  <ArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5' />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      {/* Elemen dekoratif bawah dengan warna terang (opsional) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-60">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 10 C 20 0, 40 0, 50 5 S 80 10, 100 5 L 100 10 Z" fill="#F1F5F9" /> 
        </svg>
      </div> 
    </section>
  );
};

export default AboutSummarySection;