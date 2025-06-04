// src/app/galeri/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import GalleryGrid from '@/components/sections/gallery/GalleryGrid';
// Impor data galeri (sebagai Server Component, kita bisa baca file langsung)
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Galeri Foto',
  description: 'Lihat koleksi foto kegiatan, produk, dan suasana di Multitech Tasikmalaya.',
};

// Fungsi untuk membaca data galeri
async function getGalleryData() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Gagal memuat gallery.json:", error);
    return []; // Kembalikan array kosong jika gagal
  }
}

export default async function GaleriPage() {
  const galleryImages = await getGalleryData();

  return (
    <>
      <PageHeader
        title="Galeri Multitech"
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Galeri', href: '/galeri' },
        ]}
        summary="Jelajahi momen-momen, produk unggulan, dan suasana di Multitech Tasikmalaya melalui koleksi foto kami."
        // backgroundImage="/images/headers/gallery-header-bg.jpg" // Opsional
      />
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter Kategori (Placeholder, bisa ditambahkan nanti) */}
          {/* <div className="mb-10 text-center space-x-2">
            <button className="btn-filter-active">Semua</button>
            <button className="btn-filter">Toko</button>
            <button className="btn-filter">Layanan</button>
            <button className="btn-filter">Produk</button>
            <button className="btn-filter">Acara</button>
          </div> */}
          
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </>
  );
}