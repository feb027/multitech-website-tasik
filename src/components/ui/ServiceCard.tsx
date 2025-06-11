// src/components/ui/ServiceCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export interface ServiceCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  icon?: React.ElementType;
  image: string;
  delay?: number;
  colorAccent?: 'red' | 'blue';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  shortDescription,
  icon: IconComponent,
  image,
  delay = 0,
  colorAccent = 'red',
}) => {
  const accentBorderClass = colorAccent === 'red' ? 'border-red-500' : 'border-[#00398D]';
  const accentTextClass = colorAccent === 'red' ? 'text-red-600' : 'text-[#00398D]';
  const titleHoverColorClass = colorAccent === 'red' ? 'group-hover:text-red-400' : 'group-hover:text-blue-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
      className='group relative flex flex-col rounded-xl shadow-xl hover:shadow-2xl 
                 bg-white transition-all duration-400 ease-in-out transform hover:-translate-y-1 h-full 
                 overflow-hidden' // Pindahkan overflow-hidden ke sini jika belum ada, atau pastikan ada.
    >
      {/* Container untuk Gambar dan Overlay, dengan overflow-hidden */}
      <div className='relative w-full h-64 md:h-72 overflow-hidden'> {/* TAMBAHKAN overflow-hidden DI SINI */}
        {/* Gambar di lapisan paling bawah */}
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className='transition-transform duration-500 ease-in-out group-hover:scale-110 z-0'
        />
        {/* Overlay gradasi gelap. Ini ada di atas gambar. */}
        <div
          className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent 
                     opacity-100 group-hover:opacity-80 transition-opacity duration-300 z-10'
        ></div>

        {/* Konten di atas overlay (Ikon dan Judul) */}
        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-20">
          {IconComponent && (
            <div className={`self-end p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-md ${accentBorderClass} border-2`}>
              <IconComponent className={`w-7 h-7 ${accentTextClass}`} />
            </div>
          )}
          
          <h3
            className={`text-2xl lg:text-3xl font-bold font-heading text-white 
                        leading-tight line-clamp-2 
                        ${titleHoverColorClass}
                        transition-colors duration-300 mt-auto`}
            style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}
          >
            {title}
          </h3>
        </div>
      </div> {/* Akhir dari container gambar dan overlay */}

      {/* Konten Teks di bawah gambar */}
      <div className={`p-6 flex flex-col flex-grow border-t-4 ${accentBorderClass}`}>
        <p className='text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3'>
          {shortDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;