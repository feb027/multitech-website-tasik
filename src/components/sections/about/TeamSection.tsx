// src/components/sections/about/TeamSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string; // Path ke foto individu placeholder
  // bio?: string; // Opsional
  // socialLinks?: { linkedin?: string; twitter?: string }; // Opsional
}

// Placeholder data tim (ganti dengan data aktual dan foto dari web)
const teamPhotoUrl = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'; // Placeholder foto tim

const keyTeamMembers: TeamMember[] = [
  {
    id: 'pimpinan',
    name: 'Wawan Sutiawan, ST',
    role: 'Pimpinan / Pendiri',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'marketing',
    name: 'Tim Marketing',
    role: 'Divisi Marketing (Toko + Online)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'service',
    name: 'Tim Service',
    role: 'Divisi Service & Maintenance',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  // Tambahkan lebih banyak anggota kunci jika perlu
];

const MemberCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
  const accentColor = index % 2 === 0 ? 'red' : 'blue';
  const roleColorClass = accentColor === 'red' ? 'text-red-600' : 'text-[#00398D]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      className='group relative bg-white rounded-xl shadow-lg hover:shadow-2xl 
                 p-6 text-center transition-all duration-300 transform hover:-translate-y-1 border-b-4'
      style={{ borderColor: accentColor === 'red' ? 'var(--color-red-500, #EF4444)' : 'var(--color-blue-600, #2563EB)' }} // Fallback warna jika var CSS tidak ada
    >
      <div className='relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-slate-200 group-hover:border-transparent transition-all duration-300'>
        <Image src={member.avatar} alt={member.name} fill style={{ objectFit: 'cover' }} className='group-hover:scale-110 transition-transform duration-400'/>
        {/* Overlay warna saat hover */}
        <div className={`absolute inset-0 rounded-full ${accentColor === 'red' ? 'bg-red-500' : 'bg-blue-600'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      </div>
      <h3 className='text-xl font-bold font-heading text-[#001A4D] mb-1'>{member.name}</h3>
      <p className={`text-sm font-semibold ${roleColorClass} mb-4`}>{member.role}</p>
      
      {/* Placeholder untuk bio singkat atau link sosial */}
      {/* <p className="text-xs text-slate-500 mb-3 line-clamp-2">Bio singkat tentang keahlian atau pengalaman anggota tim ini.</p>
      <div className="flex justify-center space-x-3">
        <a href="#" className="text-slate-400 hover:text-blue-600"><Linkedin size={18}/></a>
        <a href="#" className="text-slate-400 hover:text-sky-500"><Twitter size={18}/></a>
      </div> */}
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  return (
    <section className='py-20 md:py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-12 md:mb-16'
        >
          <span className='text-base font-semibold uppercase tracking-wider text-red-600 mb-3 block'>
            Tim Profesional Kami
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D]'>
            Bertemu dengan Para Ahli di Balik Multitech
          </h2>
        </motion.div>

        {/* Foto Tim Utama */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className='relative w-full max-w-4xl mx-auto h-72 md:h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden mb-16 md:mb-24 group'
        >
          <Image src={teamPhotoUrl} alt="Tim Multitech Tasikmalaya" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#001A4D]/50 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white font-heading shadow-text">Kekuatan Kami adalah Kolaborasi</h3>
            <p className="text-sm md:text-lg text-slate-200 shadow-text max-w-md">Tim yang solid, berdedikasi, dan selalu siap memberikan yang terbaik.</p>
          </div>
        </motion.div>

        {/* Sorotan Anggota Kunci */}
        {keyTeamMembers.length > 0 && (
          <>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className='text-2xl md:text-3xl font-bold font-heading text-center text-[#001A4D] mb-12 md:mb-16'
            >
              Pilar Utama Tim Kami
            </motion.h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
              {keyTeamMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TeamSection;