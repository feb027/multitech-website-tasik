// src/components/ui/ServiceListItem.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, CheckSquare } from 'lucide-react'; // Mengganti ChevronUp

// Interface ServiceData tetap sama
export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ElementType;
  image?: string; // Gambar mungkin tidak ditampilkan di list item, tapi bisa di detail
  benefits?: string[];
}

interface ServiceListItemProps {
  service: ServiceData;
  index: number;
  isLastItem: boolean; // Untuk styling border bawah
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({ service, index, isLastItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`group ${!isLastItem ? 'border-b border-slate-200' : ''} ${isExpanded ? 'bg-slate-50/70' : 'hover:bg-slate-50/70'} transition-colors duration-200`}
    >
      {/* Bagian Atas Item (Selalu Terlihat) - Klik untuk Expand */}
      <div
        className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-6 md:p-8 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`service-detail-${service.slug}`}
      >
        {/* Ikon Utama */}
        <div className={`flex-shrink-0 p-3 rounded-lg transition-colors duration-300 ${isExpanded ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
          <service.icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        </div>

        {/* Judul dan Deskripsi Singkat */}
        <div className="flex-grow">
          <h3 className={`text-xl md:text-2xl font-bold font-heading mb-1 transition-colors duration-300 ${isExpanded ? 'text-red-700' : 'text-[#001A4D] group-hover:text-red-700'}`}>
            {service.title}
          </h3>
          <p className={`text-slate-600 text-sm md:text-base leading-relaxed ${isExpanded ? 'mb-0' : 'line-clamp-2'}`}>
            {service.shortDescription}
          </p>
        </div>

        {/* Indikator Expand/Collapse */}
        <div className={`ml-auto self-center p-1 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 text-red-600' : 'text-slate-400 group-hover:text-red-600'}`}>
          <ChevronDown size={28} strokeWidth={2.5} />
        </div>
      </div>

      {/* Konten Detail (Expandable) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            id={`service-detail-${service.slug}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '0rem', paddingBottom: '2rem' }, // Tambah padding bawah
              collapsed: { opacity: 0, height: 0, marginTop: '0rem', paddingBottom: '0rem' }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden px-6 md:px-8 md:pl-[calc(2rem+40px+1.5rem)]" // Pl disesuaikan dengan lebar ikon+gap
          >
            <div className="pb-6 border-t border-slate-200 pt-6">
              <h4 className="text-lg font-semibold font-heading text-[#001A4D] mb-3">Detail Layanan:</h4>
              <div
                className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.fullDescription.replace(/\n/g, '<br />') }}
              />
              
              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-lg font-semibold font-heading text-[#001A4D] mb-3">Manfaat Utama:</h5>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckSquare size={18} className="flex-shrink-0 mt-1 text-red-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-8">
                <Link
                  href={`/kontak?layanan=${service.slug}`}
                  className='group/link inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300'
                >
                  Konsultasi {service.title}
                  <ChevronRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceListItem;