// src/components/ui/TestimonialCard.tsx
import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react'; // Ikon kutipan

export interface Testimonial {
  id: string;
  name: string;
  testimonial: string;
  avatar?: string; // Path ke gambar avatar
  role?: string; // Misal: "Pemilik Usaha Kecil", "Pelajar"
}

interface TestimonialCardProps {
  testimonialData: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonialData }) => {
  const { name, testimonial, avatar, role } = testimonialData;

  return (
    <div className='flex flex-col items-center text-center p-8 md:p-10 h-full bg-white rounded-xl shadow-lg relative overflow-hidden'>
      {/* Elemen dekoratif Quote besar di latar */}
      <Quote className="absolute top-4 left-4 w-16 h-16 text-red-100/70 opacity-50 z-0 transform -translate-x-1/4 -translate-y-1/4" strokeWidth={1.5} />
      <Quote className="absolute bottom-4 right-4 w-16 h-16 text-blue-100/70 opacity-50 z-0 transform translate-x-1/4 translate-y-1/4" strokeWidth={1.5} />

      {/* Avatar (jika ada) */}
      {avatar && (
        <div className='relative w-20 h-20 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden shadow-md border-4 border-white z-10'>
          <Image src={avatar} alt={name} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      {/* Teks Testimoni */}
      <p className='text-slate-700 italic text-base md:text-lg leading-relaxed mb-6 flex-grow z-10'>
        “{testimonial}”
      </p>

      {/* Nama dan Peran */}
      <div className='mt-auto z-10'>
        <h4 className='text-lg md:text-xl font-bold font-heading text-[#001A4D]'>
          {name}
        </h4>
        {role && (
          <p className='text-sm text-red-600 font-medium'>{role}</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;