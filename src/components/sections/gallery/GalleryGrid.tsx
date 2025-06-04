// src/components/sections/gallery/GalleryGrid.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Eye } from 'lucide-react'; // Ikon untuk overlay

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  width?: number; // Opsional: untuk layout masonry jika gambar punya dimensi asli
  height?: number; // Opsional
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Mengubah format gambar untuk prop `slides` di Lightbox
  const lightboxSlides: SlideImage[] = images.map(img => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
    // Anda bisa menambahkan width dan height jika gambar Anda memiliki dimensi yang berbeda-beda
    // dan ingin lightbox menampilkannya dengan benar atau untuk placeholder.
    // width: img.width || 1920, // Contoh default
    // height: img.height || 1080, // Contoh default
  }));

  // Untuk layout masonry sederhana menggunakan kolom CSS
  // Kita akan mengelompokkan gambar ke dalam kolom
  const numColumns = 3; // Target jumlah kolom untuk desktop
  const [, setColumns] = useState<GalleryImage[][]>([]);

  useEffect(() => {
    const distributeImages = () => {
      const newColumns: GalleryImage[][] = Array.from({ length: numColumns }, () => []);
      images.forEach((image, index) => {
        newColumns[index % numColumns].push(image);
      });
      setColumns(newColumns);
    };
    distributeImages();
  }, [images, numColumns]);


  if (!images || images.length === 0) {
    return <p className="text-center text-slate-500 py-10">Galeri foto akan segera tersedia.</p>;
  }

  return (
    <>
      {/* Layout Grid dengan Kolom CSS untuk Efek Masonry Sederhana */}
      {/* Di layar kecil, akan menjadi 1 atau 2 kolom */}
      <div className="px-2 sm:px-4 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer break-inside-avoid"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={500} // Beri nilai width & height agar Next.js tidak error, tapi akan di-override oleh CSS
              height={500} // Sesuaikan dengan rasio aspek gambar Anda jika memungkinkan atau buat dinamis
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Overlay saat hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <Eye size={48} className="text-white mb-2" />
              {image.title && (
                <p className="text-white text-sm font-semibold text-center px-2 line-clamp-2">{image.title}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        // Opsional: tambahkan plugins
        plugins={[Thumbnails, Zoom]}
        // Untuk styling kustom lightbox, bisa lihat dokumentasi yarl
        // styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
      />
    </>
  );
};

export default GalleryGrid;