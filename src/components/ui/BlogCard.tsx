// src/components/ui/BlogCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { PostData } from '@/lib/blog';
import { CalendarDays, UserCircle, ArrowRight, Feather } from 'lucide-react'; // Feather untuk artikel ringkas

interface BlogCardProps {
  post: PostData;
  index: number;
  variant?: 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, variant = 'compact' }) => {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative col-span-1 md:col-span-2 lg:col-span-3 rounded-xl overflow-hidden shadow-2xl hover:shadow-slate-400/40 transition-all duration-500 ease-out mb-10 md:mb-12"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0} // Prioritaskan LCP untuk gambar pertama
                className="transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4 lg:w-2/3">
            <div className="mb-2 md:mb-3 flex items-center text-xs text-slate-200/80 gap-3">
              {post.formattedDate && (
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  <span>{post.formattedDate}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <UserCircle size={14} />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-white mb-3 md:mb-4 leading-tight line-clamp-3 group-hover:text-red-300 transition-colors duration-300"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="hidden md:block text-slate-300/90 text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
                {post.excerpt}
              </p>
            )}
             <div className="mt-auto hidden md:block">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 group-hover:text-red-300">
                  Baca Selengkapnya
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Compact variant (default)
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex gap-x-5 p-4 rounded-lg hover:bg-slate-100 transition-colors duration-200 border-b border-slate-200 last:border-b-0"
    >
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="flex-shrink-0 block relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      {!post.coverImage && ( // Placeholder jika tidak ada gambar cover
        <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-md bg-slate-200 text-slate-400">
          <Feather size={36} />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#001A4D] mb-1 leading-tight line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-red-600 transition-colors duration-200">
            {post.title}
          </Link>
        </h3>
        {post.formattedDate && (
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
            <CalendarDays size={12} className="text-slate-400" /> {post.formattedDate}
          </p>
        )}
        {post.excerpt && (
          <p className="hidden sm:block text-slate-600 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
            {post.excerpt}
          </p>
        )}
      </div>
    </motion.article>
  );
};

export default BlogCard;