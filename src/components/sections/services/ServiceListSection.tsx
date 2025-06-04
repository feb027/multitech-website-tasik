// src/components/sections/services/ServiceListSection.tsx
'use client';

import React from 'react';
// Ganti nama impor dan path jika Anda mengubah nama file/komponen
import ServiceListItem, { ServiceData } from '@/components/ui/ServiceListItem';
import { Zap, Cpu, Network, Printer } from 'lucide-react';

// Data layanan (allServicesData tetap sama dari sebelumnya)
const allServicesData: ServiceData[] = [
  {
    slug: 'servis-komputer-lengkap',
    title: 'Servis Komputer Lengkap',
    shortDescription: 'Solusi total untuk semua masalah PC desktop Anda, dari diagnosis, perbaikan hardware, hingga optimasi software dan pembersihan virus.',
    fullDescription: "Layanan servis komputer kami mencakup:\n- Diagnosis kerusakan hardware (motherboard, RAM, PSU, VGA, dll.)\n- Penggantian komponen yang rusak dengan suku cadang berkualitas.\n- Instalasi ulang sistem operasi (Windows, Linux) dan software pendukung.\n- Pembersihan virus, malware, dan spyware.\n- Optimasi performa sistem agar berjalan lebih cepat dan stabil.\n- Backup dan recovery data penting Anda.\nKami menangani berbagai merek dan rakitan PC.",
    icon: Cpu,
    benefits: ["Performa PC optimal", "Stabilitas sistem terjaga", "Data aman terlindungi", "Umur pakai komponen lebih panjang"],
  },
  {
    slug: 'perbaikan-laptop-advanced',
    title: 'Perbaikan Laptop Advanced',
    shortDescription: 'Penanganan ahli untuk kerusakan kompleks pada laptop semua merek, termasuk perbaikan motherboard, penggantian chip, dan masalah layar.',
    fullDescription: "Kami ahli dalam menangani masalah laptop yang rumit:\n- Perbaikan/penggantian motherboard (mati total, no display).\n- Penggantian chip BGA (VGA, chipset).\n- Perbaikan/penggantian LCD/LED (pecah, bergaris, blank).\n- Penggantian keyboard, baterai, engsel, dan casing.\n- Solusi untuk laptop yang overheat atau sering mati sendiri.\n- Upgrade RAM dan SSD untuk peningkatan performa signifikan.",
    icon: Zap,
  },
  {
    slug: 'instalasi-jaringan-kantor-rumah',
    title: 'Instalasi Jaringan Kantor & Rumah',
    shortDescription: 'Desain dan implementasi infrastruktur jaringan kabel (LAN) dan nirkabel (WiFi) yang stabil, aman, dan sesuai kebutuhan Anda.',
    fullDescription: "Layanan instalasi jaringan kami meliputi:\n- Perancangan topologi jaringan yang efisien.\n- Pemasangan kabel LAN Cat5e/Cat6 dan konfigurasi perangkat jaringan (router, switch, access point).\n- Setup jaringan WiFi dengan cakupan optimal dan keamanan terjamin.\n- Konfigurasi file sharing, printer sharing, dan internet sharing.\n- Troubleshooting masalah koneksi jaringan.\n- Solusi untuk perkantoran, rumah tinggal, cafe, dan area publik lainnya.",
    icon: Network,
  },
  {
    slug: 'servis-printer-handal',
    title: 'Servis Printer Handal',
    shortDescription: 'Mengatasi berbagai masalah printer (inkjet, laser, dot matrix) seperti macet, hasil cetak buruk, dan error system.',
    fullDescription: "Jangan biarkan printer bermasalah mengganggu produktivitas Anda. Kami melayani:\n- Perbaikan printer macet (paper jam).\n- Solusi untuk hasil cetak bergaris, pudar, atau tidak keluar tinta.\n- Penggantian sparepart printer (cartridge, head, roller, dll).\n- Reset printer dan perbaikan error system.\n- Layanan untuk berbagai merek printer ternama.",
    icon: Printer,
  },
];

const ServiceListSection: React.FC = () => {
  return (
    <section className='py-16 md:py-24 bg-white'> {/* Latar putih atau slate-50 */}
      <div className='container mx-auto px-4 md:px-6'>
        {/* Opsi: Tambahkan judul atau filter di sini jika perlu */}
        {/* <h2 className="text-3xl font-bold text-center mb-12">Layanan Kami</h2> */}
        
        {allServicesData.length > 0 ? (
          <div className='bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200/80'>
            {/* Tidak lagi menggunakan grid di sini, tapi list item yang menumpuk */}
            {allServicesData.map((service, index) => (
              <ServiceListItem
                key={service.slug}
                service={service}
                index={index}
                isLastItem={index === allServicesData.length - 1} // Tandai item terakhir
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-slate-500 text-lg'>
            Saat ini belum ada daftar layanan yang tersedia. Silakan cek kembali nanti.
          </p>
        )}
      </div>
    </section>
  );
};

export default ServiceListSection;