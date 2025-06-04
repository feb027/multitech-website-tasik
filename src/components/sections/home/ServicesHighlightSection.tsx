// src/components/sections/home/ServicesHighlightSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import ServiceCard, { ServiceCardProps } from '@/components/ui/ServiceCard';
import { Zap, Cpu, Network, ArrowRight } from 'lucide-react';

const highlightedServicesData: Omit<ServiceCardProps, 'delay'>[] = [
  {
    slug: 'penjualan-komputer-laptop',
    title: 'Penjualan Komputer & Laptop',
    shortDescription: 'Menyediakan produk IT terkini seperti laptop, desktop, projector, printer, dan kamera digital dengan harga kompetitif dan garansi resmi.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    colorAccent: 'red',
  },
  {
    slug: 'service-maintenance',
    title: 'Service & Maintenance',
    shortDescription: 'Layanan perbaikan dan maintenance untuk laptop, PC desktop, printer, dan perangkat elektronik lainnya dengan teknisi berpengalaman.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    colorAccent: 'blue',
  },
  {
    slug: 'cctv-projector-system',
    title: 'CCTV & Projector System',
    shortDescription: 'Instalasi dan maintenance sistem CCTV untuk keamanan serta projector multimedia untuk kebutuhan presentasi bisnis dan pendidikan.',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const ServicesHighlightSection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-slate-100'> {/* Latar sedikit berbeda, mungkin dengan pola dot halus jika ingin */}
      {/* Jika ingin pola dot halus sebagai background: */}
      {/* <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'radial-gradient(circle, #CBD5E1 2px, transparent 2px)', backgroundSize: '25px 25px'}}></div> */}
      
      <div className='container mx-auto px-6 relative'> {/* Tambah relative jika ada elemen absolut di section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className='text-center mb-16 md:mb-20'
        >
          <span className="inline-block text-base font-semibold uppercase tracking-wider text-red-600 mb-3">
            Layanan Unggulan
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D]'>
            Kami Siap Membantu Anda
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12'>
          {highlightedServicesData.map((service, index) => (
            <ServiceCard
              key={service.slug}
              {...service} // Spread sisa props
              delay={index * 0.15} // Stagger animasi
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} // Delay lebih besar setelah kartu muncul
          className='text-center mt-20 md:mt-24'
        >
          <Link
            href="/layanan"
            className='group inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 
                       hover:from-red-600 hover:via-rose-500 hover:to-rose-600
                       text-white font-bold font-heading py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl
                       transition-all duration-300 transform hover:scale-105'
          >
            Lihat Semua Layanan
            <ArrowRight className='w-6 h-6 transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHighlightSection;