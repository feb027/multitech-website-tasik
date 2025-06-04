// src/components/ui/FeaturedBlogItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { PostData } from '@/lib/blog';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';

interface FeaturedBlogItemProps {
  post: PostData;
}

const FeaturedBlogItem: React.FC<FeaturedBlogItemProps> = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center 
                 bg-white p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl 
                 transition-all duration-300 ease-in-out overflow-hidden border border-slate-200/70
                 transform hover:-translate-y-1.5"
    >
      {/* Kolom Gambar */}
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="block relative w-full aspect-[16/10] md:aspect-auto md:h-full rounded-lg overflow-hidden shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimasi sizes prop
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300"></div>
        </Link>
      )}

      {/* Kolom Teks */}
      <div className="flex flex-col h-full py-2">
        <div className="mb-4 flex flex-wrap items-center text-xs text-slate-500 gap-x-4 gap-y-1">
          {post.formattedDate && (
            <div className="flex items-center gap-1.5">
              <CalendarDays size={15} className="text-red-500" />
              <span>{post.formattedDate}</span>
            </div>
          )}
          {post.author && (
            <div className="flex items-center gap-1.5">
              <UserCircle size={15} className="text-blue-500" />
              <span>Oleh: {post.author}</span>
            </div>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-heading text-[#001A4D] mb-4 leading-tight">
          <Link href={`/blog/${post.slug}`} className="hover:text-red-600 transition-colors duration-200 line-clamp-3 group-hover:underline decoration-red-500 underline-offset-4">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3 md:line-clamp-4 flex-grow">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-base font-semibold text-red-600 hover:text-red-700 group/link"
          >
            Lanjutkan Membaca
            <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedBlogItem;