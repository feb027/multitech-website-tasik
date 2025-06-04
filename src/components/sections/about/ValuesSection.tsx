// src/components/sections/about/ValuesSection.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lightbulb, Handshake, Users} from 'lucide-react'; // Contoh ikon untuk nilai

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accentColor: 'red' | 'blue'; // Untuk variasi styling
}

// Data Nilai-Nilai Perusahaan (ganti dengan nilai aktual Multitech)
const companyValuesData: CompanyValue[] = [
  {
    id: 'profesional',
    title: 'Profesional',
    description: 'Kami beroperasi dengan kompetensi tinggi, tanggung jawab penuh, corporateness, dan etika profesi yang terjaga dalam setiap layanan.',
    icon: ShieldCheck,
    accentColor: 'blue',
  },
  {
    id: 'kerja-cerdas',
    title: 'Kerja Cerdas',
    description: 'Melalui pengembangan kompetensi berkelanjutan dalam pengetahuan dan keterampilan untuk memberikan solusi teknologi terbaik.',
    icon: Lightbulb,
    accentColor: 'red',
  },
  {
    id: 'norma-masyarakat',
    title: 'Mentaati Norma',
    description: 'Kami selalu mentaati norma-norma yang berlaku di masyarakat dalam setiap aspek operasional dan bisnis perusahaan.',
    icon: Handshake,
    accentColor: 'blue',
  },
  {
    id: 'mitra-terpercaya',
    title: 'Mitra Terpercaya',
    description: 'Menjadi mitra terpercaya bagi pelanggan melalui komitmen jangka panjang dan pelayanan yang konsisten berkualitas.',
    icon: Users,
    accentColor: 'red',
  },
  // Anda bisa menambah hingga 3 atau 4 nilai agar grid terlihat baik
  // {
  //   id: 'kualitas',
  //   title: 'Komitmen Pada Kualitas',
  //   description: 'Dari produk hingga layanan purna jual, kami tidak pernah berkompromi pada kualitas dan keunggulan.',
  //   icon: Award,
  //   accentColor: 'blue',
  // },
];

const ValueCard: React.FC<{ valueItem: CompanyValue; index: number }> = ({ valueItem, index }) => {
  const isRed = valueItem.accentColor === 'red';
  const cardBgClass = isRed ? 'from-red-50 via-white to-white' : 'from-blue-50 via-white to-white';
  const iconContainerBgClass = isRed ? 'bg-red-600 group-hover:bg-red-700' : 'bg-[#002A70] group-hover:bg-[#00398D]';
  const iconColorClass = 'text-white';
  const titleColorClass = isRed ? 'text-red-700' : 'text-[#002A70]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={`group relative flex flex-col text-center items-center p-8 rounded-2xl 
                 shadow-lg hover:shadow-2xl bg-gradient-to-br ${cardBgClass}
                 transition-all duration-400 ease-in-out transform hover:-translate-y-2 h-full`}
    >
      {/* Ikon Besar di Atas */}
      <div className={`relative mb-6 p-5 rounded-full shadow-lg ${iconContainerBgClass} 
                     transition-all duration-300 transform group-hover:scale-110`}>
        <valueItem.icon className={`w-10 h-10 md:w-12 md:h-12 ${iconColorClass}`} strokeWidth={1.5} />
        {/* Efek "glow" di belakang ikon saat hover */}
        <div className={`absolute inset-0 rounded-full ${iconContainerBgClass} opacity-0 group-hover:opacity-30 
                       blur-md transition-opacity duration-300 -z-10`}></div>
      </div>

      <h3 className={`text-2xl font-bold font-heading mb-3 ${titleColorClass}`}>
        {valueItem.title}
      </h3>
      <p className='text-slate-600 text-sm leading-relaxed flex-grow'>
        {valueItem.description}
      </p>
      {/* Aksen garis bawah (opsional) */}
      <div className={`w-1/3 h-1 ${isRed ? 'bg-red-200' : 'bg-blue-200'} rounded-full mt-6 mx-auto group-hover:w-1/2 transition-all duration-300`}></div>
    </motion.div>
  );
};

const ValuesSection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-slate-100'> { /* Latar sedikit berbeda dari putih */}
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-16 md:mb-20 max-w-3xl mx-auto'
        >
          <span className='text-base font-semibold uppercase tracking-wider text-red-600 mb-3 block'>
            Fondasi Kami
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D]'>
            Nilai-Nilai yang Kami Junjung Tinggi
          </h2>
          <p className='text-lg text-slate-600 mt-6 leading-relaxed'>
            Setiap keputusan dan tindakan kami didasari oleh prinsip-prinsip ini, memastikan kami selalu memberikan yang terbaik untuk Anda.
          </p>
        </motion.div>

        {/* Grid untuk Kartu Nilai */}
        {/* Jika 4 item, grid 2x2. Jika 3 item, bisa lg:grid-cols-3. Jika 5 item, bisa disesuaikan */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10'>
          {companyValuesData.map((valueItem, index) => (
            <ValueCard key={valueItem.id} valueItem={valueItem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;