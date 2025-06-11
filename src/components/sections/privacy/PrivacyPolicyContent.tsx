// src/components/sections/privacy/PrivacyPolicyContent.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  FileText, 
  UserCheck, 
  Lock, 
  Eye, 
  Mail, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface PolicySectionData {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string[];
}

const policyData: PolicySectionData[] = [
  {
    id: 'introduction',
    title: 'Pendahuluan',
    icon: FileText,
    content: [
      'Selamat datang di website Multitech Tasikmalaya. Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda.',
      'Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi yang Anda berikan kepada kami.',
      'Dengan menggunakan website ini atau layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.'
    ]
  },
  {
    id: 'data-collection',
    title: 'Informasi yang Kami Kumpulkan',
    icon: Database,
    content: [
      'Data Pribadi: Nama, alamat email, nomor telepon, dan alamat yang Anda berikan melalui formulir kontak atau saat menggunakan layanan kami.',
      'Data Teknis: Alamat IP, jenis browser, perangkat yang digunakan, dan informasi teknis lainnya yang dikumpulkan secara otomatis.',
      'Data Komunikasi: Riwayat komunikasi dengan tim customer service kami melalui email, telepon, atau media lainnya.',
      'Cookies: Informasi yang disimpan melalui cookies untuk meningkatkan pengalaman browsing Anda.'
    ]
  },
  {
    id: 'data-usage',
    title: 'Penggunaan Informasi',
    icon: UserCheck,
    content: [
      'Menyediakan dan meningkatkan layanan perbaikan komputer, laptop, dan perangkat IT lainnya.',
      'Merespons pertanyaan, permintaan layanan, dan memberikan dukungan teknis.',
      'Mengirimkan informasi penting tentang layanan, pembaruan, atau penawaran khusus (dengan persetujuan Anda).',
      'Menganalisis penggunaan website untuk meningkatkan fitur dan konten.',
      'Mematuhi kewajiban hukum dan mencegah aktivitas yang melanggar hukum.'
    ]
  },
  {
    id: 'data-protection',
    title: 'Perlindungan Data',
    icon: Shield,
    content: [
      'Kami menggunakan enkripsi SSL untuk melindungi transmisi data antara browser Anda dan server kami.',
      'Akses ke data pribadi dibatasi hanya pada karyawan yang memerlukan informasi tersebut untuk menjalankan tugas mereka.',
      'Kami melakukan backup data secara teratur dan menyimpannya di server yang aman.',
      'Sistem keamanan kami dipantau dan diperbarui secara berkala untuk mencegah akses yang tidak sah.'
    ]
  },
  {
    id: 'data-sharing',
    title: 'Pembagian Informasi',
    icon: Eye,
    content: [
      'Kami tidak menjual, menyewakan, atau memberikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.',
      'Informasi mungkin dibagikan dengan mitra layanan tepercaya yang membantu kami mengoperasikan website atau menjalankan bisnis, dengan perjanjian kerahasiaan yang ketat.',
      'Kami dapat mengungkapkan informasi jika diwajibkan oleh hukum atau untuk melindungi hak, properti, atau keselamatan kami dan pengguna lainnya.',
      'Dalam hal merger, akuisisi, atau penjualan aset, data pribadi dapat dialihkan sebagai bagian dari transaksi tersebut.'
    ]
  },
  {
    id: 'cookies',
    title: 'Penggunaan Cookies',
    icon: Lock,
    content: [
      'Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna dan menganalisis lalu lintas website.',
      'Cookies penting: Diperlukan untuk fungsi dasar website seperti keamanan dan navigasi.',
      'Cookies analitik: Membantu kami memahami bagaimana pengunjung berinteraksi dengan website.',
      'Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi optimal.'
    ]
  },
  {
    id: 'user-rights',
    title: 'Hak Pengguna',
    icon: CheckCircle,
    content: [
      'Hak Akses: Anda dapat meminta informasi tentang data pribadi yang kami simpan tentang Anda.',
      'Hak Koreksi: Anda dapat meminta kami memperbaiki data yang tidak akurat atau tidak lengkap.',
      'Hak Penghapusan: Anda dapat meminta penghapusan data pribadi dalam kondisi tertentu.',
      'Hak Portabilitas: Anda dapat meminta data Anda dalam format yang dapat dibaca mesin.',
      'Hak Penarikan Persetujuan: Anda dapat menarik persetujuan untuk pemrosesan data kapan saja.'
    ]
  },
  {
    id: 'data-retention',
    title: 'Penyimpanan Data',
    icon: Calendar,
    content: [
      'Kami menyimpan data pribadi hanya selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini.',
      'Data komunikasi dan riwayat layanan disimpan selama maksimal 5 tahun untuk keperluan layanan dan hukum.',
      'Data akun yang tidak aktif akan dihapus setelah 2 tahun tanpa aktivitas.',
      'Beberapa data mungkin disimpan lebih lama jika diwajibkan oleh hukum atau untuk keperluan bisnis yang sah.'
    ]
  },
  {
    id: 'contact-privacy',
    title: 'Kontak Terkait Privasi',
    icon: Mail,
    content: [
      'Jika Anda memiliki pertanyaan atau keluhan tentang kebijakan privasi ini, silakan hubungi kami:',
      'Email: cvmultitech_tasik@yahoo.co.id',
      'Telepon: 0821-2039-5478',
      'Alamat: Jl. Noenoeng Tisna Saputra No.54, Kahuripan, Tawang, Tasikmalaya',
      'Kami akan merespons pertanyaan Anda dalam waktu 7 hari kerja.'
    ]
  }
];

const PrivacyPolicyContent: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-[#00398D]/5 to-transparent rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-red-500/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-[#00398D]/10 to-blue-50 rounded-full border border-[#00398D]/20"
          >
            <div className="p-2 bg-gradient-to-br from-[#00398D] to-[#002A70] rounded-full">
              <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold text-[#002A70] uppercase tracking-wider">
              Perlindungan Data
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D] mb-6 leading-tight"
          >
            Kebijakan Privasi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Komitmen kami untuk melindungi privasi dan keamanan informasi pribadi Anda
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50"
          >
            <Calendar className="w-4 h-4" />
            <span>Terakhir diperbarui: 11 Juni 2025</span>
          </motion.div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 p-6 md:p-8 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold font-heading text-amber-800 mb-3">Pemberitahuan Penting</h3>
              <p className="text-amber-700 leading-relaxed">
                Kebijakan ini berlaku efektif sejak tanggal yang tercantum di atas. Kami dapat memperbarui 
                kebijakan ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui website 
                atau email. Penggunaan berkelanjutan terhadap layanan kami setelah perubahan berarti Anda 
                menerima kebijakan yang diperbarui.
              </p>
            </div>
          </div>
        </motion.div>        {/* Policy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {policyData.map((section, index) => {
            const isRed = index % 2 === 0;
            const accentColor = isRed ? 'red' : 'blue';
            
            const cardClasses = {
              red: {
                gradient: 'from-red-50/50 via-white to-white',
                iconBg: 'from-red-600 to-red-700',
                titleHover: 'group-hover:text-red-600',
                border: 'border-red-500/30 hover:border-red-500/50',
                accent: 'border-t-4 border-red-500',
              },
              blue: {
                gradient: 'from-blue-50/50 via-white to-white', 
                iconBg: 'from-[#00398D] to-[#002A70]',
                titleHover: 'group-hover:text-[#00398D]',
                border: 'border-[#00398D]/30 hover:border-[#00398D]/50',
                accent: 'border-t-4 border-[#00398D]',
              }
            };

            const currentAccent = cardClasses[accentColor];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className={`group relative bg-gradient-to-br ${currentAccent.gradient} rounded-2xl p-6 md:p-8 
                           shadow-lg hover:shadow-2xl transition-all duration-400 ease-in-out 
                           transform hover:-translate-y-2 border ${currentAccent.border} ${currentAccent.accent} 
                           overflow-hidden`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${isRed ? 'from-red-500/5' : 'from-[#00398D]/5'} to-transparent rounded-full blur-2xl`}></div>
                <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${isRed ? 'from-red-500/5' : 'from-[#00398D]/5'} to-transparent rounded-full blur-2xl`}></div>
                
                {/* Section Header */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${currentAccent.iconBg} rounded-xl shadow-lg 
                                 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className={`text-xl md:text-2xl font-bold font-heading text-[#001A4D] 
                                 ${currentAccent.titleHover} transition-colors duration-300 leading-tight`}>
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="relative space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <motion.p 
                      key={pIndex} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (pIndex * 0.1) }}
                      className="text-slate-700 leading-relaxed relative pl-4  border-slate-200 hover:border-slate-300 transition-colors duration-200"
                    >
                      <span className={`absolute left-0 top-2 w-1 h-4 bg-gradient-to-b ${isRed ? 'from-red-500 to-red-600' : 'from-[#00398D] to-[#002A70]'} rounded-full`}></span>
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isRed ? 'from-red-500/5' : 'from-[#00398D]/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              </motion.div>
            );
          })}
        </div>        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-br from-[#001A4D] via-[#00398D] to-[#002A70] rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#00398D]/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-3 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full">
                  <Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Butuh Bantuan?
                </span>
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-2xl md:text-4xl font-extrabold font-heading mb-4 leading-tight"
              >
                Masih Ada Pertanyaan?
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Tim kami siap membantu menjawab pertanyaan Anda terkait kebijakan privasi 
                dan perlindungan data. Hubungi kami kapan saja.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a
                  href="mailto:cvmultitech_tasik@yahoo.co.id"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-red-500/50"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Email Kami
                </a>
                <a
                  href="/kontak"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  Halaman Kontak
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
