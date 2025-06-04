// src/components/sections/about/HistorySection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Flag, Building, Users, TrendingUp, CheckCircle, CalendarDays } from 'lucide-react'; // Menambahkan CalendarDays

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string; // Opsional: gambar untuk event tertentu
}

const historyData: TimelineEvent[] = [
  {
    year: '1999',
    title: 'Pendirian Multitech Computer',
    description: 'Pada tanggal 1 Maret 1999, Multitech Computer resmi berdiri di Jalan Siliwangi No. 91 Tasikmalaya dengan tiga divisi: rental, service, dan penjualan komputer.',
    icon: Flag,
  },
  {
    year: '2000',
    title: 'Fokus Service & Penjualan',
    description: 'Mulai memfokuskan pada divisi Service dan Penjualan, melayani masyarakat umum, swasta, dan instansi pemerintah sebagai perusahaan perseorangan.',
    icon: Building,
  },
  {
    year: '2006',
    title: 'Relokasi & Ekspansi Layanan',
    description: 'Pindah ke Jalan BKR 9 B Tawang dan mengembangkan layanan penjualan kamera digital, video camcorder, serta video editing.',
    icon: TrendingUp,
  },
  {
    year: '2008',
    title: 'Pembentukan CV Multitech',
    description: 'Untuk meningkatkan pelayanan corporate dan pemerintahan, dibentuk Perseroan Komanditer dengan nama CV Multitech pada April 2008.',
    icon: Users,
  },
  {
    year: '2024',
    title: 'Lokasi Baru di Kahuripan',
    description: 'Pada 1 Januari 2024, Multitech Computer pindah ke lokasi baru di Jalan Noenoeng Tisna Saputra No 54, Kahuripan, Tawang untuk melayani Anda lebih baik.',
    icon: CheckCircle,
  },
];

const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  const isEven = index % 2 === 0;
  const accentColor = isEven ? 'red' : 'blue'; // Variasi warna aksen

  const accentClasses = {
    red: {
      lineConnector: 'bg-red-500',
      dotBorder: 'border-red-500',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
      yearText: 'text-red-700',
      cardBorder: 'border-red-500/50 hover:border-red-600/70',
    },
    blue: {
      lineConnector: 'bg-[#00398D]',
      dotBorder: 'border-[#00398D]',
      iconBg: 'bg-blue-100',
      iconText: 'text-[#00398D]',
      yearText: 'text-[#002A70]',
      cardBorder: 'border-[#00398D]/50 hover:border-[#00398D]/70',
    },
  };

  const currentAccent = accentClasses[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeOut' }}
      className={`mb-12 flex items-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Konten Kartu Event */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`p-6 rounded-xl shadow-xl bg-white border-t-4 ${currentAccent.cardBorder} transition-all duration-300`}>
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-full ${currentAccent.iconBg}`}>
              <event.icon className={`w-6 h-6 ${currentAccent.iconText}`} />
            </div>
            <p className={`text-2xl font-bold font-heading ${currentAccent.yearText}`}>{event.year}</p>
          </div>
          <h3 className="text-xl font-bold font-heading text-[#001A4D] mb-2">{event.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
          {event.image && (
            <div className="mt-4 rounded-lg overflow-hidden aspect-video relative">
              <Image src={event.image} alt={event.title} fill style={{objectFit: 'cover'}} />
            </div>
          )}
        </div>
      </div>

      {/* Konektor dan Titik Tengah (hanya di layar md ke atas) */}
      <div className="hidden md:flex w-2/12 items-center justify-center relative">
        <div className={`absolute w-1 h-full ${currentAccent.lineConnector} opacity-30 -z-10 ${isEven ? 'right-1/2' : 'left-1/2'} transform ${isEven ? 'translate-x-1/2' : '-translate-x-1/2'}`}></div>
        <div className={`z-10 p-2 rounded-full bg-white shadow-lg border-2 ${currentAccent.dotBorder}`}>
          <CalendarDays className={`w-5 h-5 ${currentAccent.iconText}`} />
        </div>
      </div>
      
      {/* Spacer di sisi berlawanan (hanya di layar md ke atas) */}
      <div className="hidden md:block w-5/12"></div>
    </motion.div>
  );
};


const HistorySection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-slate-50'>
      <div className='container mx-auto px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-16 md:mb-20'
        >
          <span className='text-sm font-semibold uppercase tracking-wider text-red-600 mb-2 block'>
            Jejak Langkah Kami
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D]'>
            Sejarah & Evolusi Multitech
          </h2>
        </motion.div>

        <div className="relative">
          {/* Garis Timeline Vertikal Utama (hanya di layar md ke atas) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-red-300 via-[#00398D] to-red-300 opacity-50 transform -translate-x-1/2 rounded-full"></div>

          {historyData.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;