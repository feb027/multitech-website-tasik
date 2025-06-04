// src/components/sections/contact/MapEmbed.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react'; // Untuk tombol lihat peta lebih besar

interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  gmapsUrl?: string; // URL langsung ke Google Maps untuk lokasi tersebut
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  embedUrl,
  title = "Peta Lokasi Multitech Tasikmalaya",
  gmapsUrl, // Contoh: "https://maps.google.com/?q=NamaTempat,Alamat"
}) => {
  if (!embedUrl) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-slate-200 text-center" // Latar lebih kontras jika peta gagal
      >
        <p className="text-slate-700 font-semibold text-lg">Peta lokasi akan segera ditampilkan.</p>
        <p className="text-slate-500 text-sm mt-1">Pastikan URL embed peta sudah benar.</p>
      </motion.div>
    );
  }

  // Jika gmapsUrl tidak disediakan, coba buat dari embedUrl (ini mungkin tidak selalu akurat)
  const defaultGmapsUrl = embedUrl.includes("!2s") ? 
    `https://www.google.com/maps/search/?api=1&query=${embedUrl.split('!2s')[1].split('!3m')[0].replace(/%20/g, '+')}` : 
    'https://maps.google.com/'; // Fallback sangat dasar

  const finalGmapsUrl = gmapsUrl || defaultGmapsUrl;


  return (
    <section className='relative bg-slate-100 py-0'> {/* Section tanpa padding vertikal, iframe akan mengisi */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} // Trigger saat sedikit terlihat
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[700px]" // Tinggi peta yang lebih signifikan
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="absolute inset-0" // Pastikan iframe mengisi div
        ></iframe>
        
        {/* Tombol "Lihat Peta Lebih Besar" (Opsional) */}
        {finalGmapsUrl && (
          <a
            href={finalGmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-sm text-[#001A4D] 
                       font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:bg-white 
                       transition-all duration-300 flex items-center gap-2 text-sm transform hover:scale-105"
          >
            <ExternalLink size={18} />
            Lihat di Google Maps
          </a>
        )}
      </motion.div>
      {/* Elemen bentuk dekoratif bawah (opsional, untuk transisi ke section berikutnya) */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 md:h-24 overflow-hidden z-0">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 10 Q 50 0, 100 10 L 100 10 L 0 10 Z" fill="#FFFFFF" /> 
            {/* Warna fill #FFFFFF jika section berikutnya putih, atau sesuaikan */}
        </svg>
      </div>
    </section>
  );
};

export default MapEmbed;