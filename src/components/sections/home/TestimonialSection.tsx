// src/components/sections/home/TestimonialSection.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import TestimonialCard, { Testimonial } from '@/components/ui/TestimonialCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'; // Untuk efek 3D jika diinginkan

// Data testimoni (nantinya dari testimonials.json)
// Pastikan path avatar benar jika menggunakan gambar lokal dari public/
const testimonialsData: Testimonial[] = [
  {
    id: 'testi-01',
    name: 'Budi Santoso',
    testimonial: 'Service laptop di Multitech sangat profesional dan cepat. Laptop kantor yang error sudah kembali normal dan performanya lebih baik. Tim teknisinya berpengalaman dan memberikan penjelasan yang mudah dipahami.',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    role: 'Pemilik Usaha',
  },
  {
    id: 'testi-02',
    name: 'Sari Wulandari',
    testimonial: 'Sudah bertahun-tahun jadi pelanggan Multitech untuk kebutuhan komputer kantor. Produknya berkualitas, harga kompetitif, dan after-sales servicenya memuaskan. Recommended untuk kebutuhan IT bisnis.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Manager Operasional',
  },
  {
    id: 'testi-03',
    name: 'Ahmad Hidayat',
    testimonial: 'Beli PC gaming di Multitech dengan konsultasi lengkap sesuai budget. Hasilnya specs yang pas dan performa gaming mantap. Pelayanannya ramah dan tidak ada tekanan untuk beli yang mahal.',
    role: 'Mahasiswa',
  },
  {
    id: 'testi-04',
    name: 'Dewi Kusuma',
    testimonial: 'Projector untuk presentasi kantor rusak mendadak, untungnya Multitech bisa service dengan cepat. Teknisinya datang ke lokasi dan langsung diperbaiki. Pelayanannya sangat membantu untuk kebutuhan urgent.',
    avatar: 'https://randomuser.me/api/portraits/women/61.jpg',
    role: 'Corporate Secretary',
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-gradient-to-br from-[#001A4D] via-[#001233] to-[#001A4D] text-white overflow-hidden'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-16 md:mb-20'
        >
          <span className='inline-block text-base font-semibold uppercase tracking-wider text-red-400 mb-3'>
            Apa Kata Mereka
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading'>
            Testimoni Pelanggan Setia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect={'coverflow'} // Efek 3D coverflow
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'} // Atau angka spesifik: 1, 2, 3
            // slidesPerView={1.5} // Untuk preview slide berikutnya
            spaceBetween={30} // Jarak antar slide
            coverflowEffect={{
              rotate: 30, // Rotasi slide
              stretch: 0,
              depth: 100, // Kedalaman efek 3D
              modifier: 1, // Pengali efek
              slideShadows: true,
            }}
            loop={true}
            autoplay={{
              delay: 3000, // Waktu delay antar slide (ms)
              disableOnInteraction: false, // Tetap autoplay setelah interaksi user
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Efek dinamis pada bullets pagination
              // el: '.swiper-pagination', // Jika ingin custom container pagination
              // type: 'bullets', // atau 'fraction', 'progressbar'
            }}
            navigation={true} // Menampilkan tombol next/prev
            // navigation={{ // Kustomisasi tombol navigasi jika perlu
            //   nextEl: '.swiper-button-next-custom',
            //   prevEl: '.swiper-button-prev-custom',
            // }}
            className="mySwiper testimonial-swiper !pb-16" // !pb-16 untuk ruang pagination
            // Style untuk panah navigasi (bisa di global.css atau di sini)
            style={{
              // @ts-expect-error CSS custom properties are not recognized by TypeScript on style object
              '--swiper-navigation-color': '#FF3333', // Warna panah (merah)
              '--swiper-pagination-color': '#FF3333', // Warna pagination aktif
              '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
              '--swiper-pagination-bullet-inactive-opacity': '0.5',
              '--swiper-pagination-bullet-size': '10px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            }}
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!w-full sm:!w-[450px] md:!w-[500px] !h-auto p-2"> {/* Lebar slide */}
                <TestimonialCard testimonialData={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Jika ingin tombol navigasi kustom: */}
          {/* <div className="swiper-button-prev-custom">Prev</div> */}
          {/* <div className="swiper-button-next-custom">Next</div> */}
          {/* <div className="swiper-pagination"></div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;