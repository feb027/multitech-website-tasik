// src/components/sections/about/VisionMissionSection.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye, Target, CheckSquare } from 'lucide-react'; // Ikon untuk Visi dan Misi

// Data Visi & Misi (nantinya dari companyInfo.json atau file khusus)
// Ganti dengan Visi & Misi Multitech yang sebenarnya
const visionStatement = "Menjadi Perusahaan Teknologi Informasi terpercaya yang bermanfaat bagi masyarakat";
const missionPoints = [
  {
    id: 'm1',
    text: "Membantu masyarakat dalam memenuhi kebutuhan bidang informatika.",
    icon: CheckSquare,
  },
  {
    id: 'm2',
    text: "Berperan dalam mencerdaskan kehidupan masyarakat.",
    icon: CheckSquare,
  },
  {
    id: 'm3',
    text: "Berperan dalam penyediaan lapangan kerja bagi masyarakat.",
    icon: CheckSquare,
  },
  {
    id: 'm4',
    text: "Turut mengembangkan teknologi informasi yang bekerjasama dengan mitra bisnis di daerah maupun nasional.",
    icon: CheckSquare,
  },
];

const VisionMissionSection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-slate-50'> {/* Latar putih bersih untuk fokus pada konten */}
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center'>
          
          {/* Kolom Visi */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='lg:col-span-5 text-center lg:text-left'
          >
            <div className='inline-flex items-center gap-3 mb-6 p-3 bg-red-50 rounded-full'>
              <Eye className='w-10 h-10 text-red-600' strokeWidth={1.5} />
              <h2 className='text-3xl md:text-4xl font-bold font-heading text-red-700'>
                Visi Kami
              </h2>
            </div>
            <p className='text-2xl lg:text-3xl font-medium text-slate-800 leading-snug lg:leading-normal italic'
               style={{ textShadow: '0px 1px 2px rgba(0,26,77,0.1)' }}>
              “{visionStatement}”
            </p>
          </motion.div>

          {/* Garis Pemisah Dekoratif Vertikal (hanya di lg) */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className='hidden lg:block lg:col-span-1 h-48 w-1 bg-gradient-to-b from-red-200 via-[#00398D]/70 to-blue-200 self-center mx-auto rounded-full'
            style={{ transformOrigin: 'center' }}
          ></motion.div>

          {/* Kolom Misi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='lg:col-span-6'
          >
            <div className='inline-flex items-center gap-3 mb-8 p-3 bg-blue-50 rounded-full'>
              <Target className='w-10 h-10 text-[#00398D]' strokeWidth={1.5} />
              <h3 className='text-3xl md:text-4xl font-bold font-heading text-[#002A70]'>
                Misi Kami
              </h3>
            </div>
            <ul className='space-y-5'>
              {missionPoints.map((mission, index) => (
                <motion.li
                  key={mission.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: 'easeOut' }}
                  className='flex items-start gap-4 p-4 bg-slate-50/80 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-300'
                >
                  <div className='flex-shrink-0 mt-1 p-1.5 bg-[#00398D]/10 rounded-full'>
                    <mission.icon className='w-5 h-5 text-[#00398D]' strokeWidth={2.5}/>
                  </div>
                  <span className='text-slate-700 leading-relaxed text-base md:text-lg'>
                    {mission.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;