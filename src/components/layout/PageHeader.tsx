// src/components/layout/PageHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react'; // Untuk breadcrumb

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  summary?: string;
  backgroundImage?: string; // Opsional: gambar latar untuk header
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb, summary, backgroundImage }) => {
  const defaultBg = "bg-gradient-to-br from-[#001A4D] via-[#002255] to-[#001A4D]"; // Latar default jika tidak ada gambar

  return (
    <section
      className={`relative py-20 md:py-28 text-white ${backgroundImage ? 'bg-cover bg-center' : defaultBg}`}
      style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : {}}
    >
      {/* Overlay jika ada gambar latar untuk meningkatkan kontras */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label="breadcrumb"
          className="mb-4 flex items-center justify-center md:justify-start text-sm"
        >
          {breadcrumb.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <ChevronRight size={16} className="mx-1.5 text-red-400" />
              )}
              {index === breadcrumb.length - 1 ? (
                <span className="font-semibold text-slate-200">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-red-300 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        {/* Judul Halaman */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-center md:text-left mb-5"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          {title}
        </motion.h1>

        {/* Ringkasan Halaman */}
        {summary && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0 text-center md:text-left"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
          >
            {summary}
          </motion.p>
        )}
      </div>
      {/* Elemen bentuk dekoratif di bawah (opsional) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-16 overflow-hidden z-0">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 0 Q 50 10, 100 0 L 100 10 L 0 10 Z" fill={backgroundImage ? "rgba(255,255,255,0.05)" : "#00102E"} />
            {/* Warna fill disesuaikan jika ada background image, agar lebih subtle */}
        </svg>
      </div>
    </section>
  );
};

export default PageHeader;