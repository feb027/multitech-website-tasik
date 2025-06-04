// src/components/ui/StandardBlogItem.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Opsional jika ingin gambar kecil
import { motion } from 'motion/react';
import { PostData } from '@/lib/blog';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface StandardBlogItemProps {
  post: PostData;
  index: number;
}

const StandardBlogItem: React.FC<StandardBlogItemProps> = ({ post, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative py-6 border-b border-slate-200 hover:bg-slate-50/70 transition-colors duration-200 last:border-b-0"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Opsional: Gambar thumbnail kecil di kiri */}
          {post.coverImage && (
            <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-auto sm:aspect-[4/3] rounded-md overflow-hidden shadow-sm relative">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{objectFit: 'cover'}}
                className="group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 160px"
              />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-lg md:text-xl font-bold font-heading text-[#001A4D] mb-1.5 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-slate-600 text-sm leading-relaxed mb-2 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center text-xs text-slate-500 mt-2">
              <CalendarDays size={14} className="mr-1.5 text-slate-400" />
              <span>{post.formattedDate}</span>
              {post.author && <span className="mx-1.5">•</span>}
              {post.author && <span>Oleh: {post.author}</span>}
            </div>
          </div>
          {/* Panah di kanan (hanya desktop) */}
          <div className="hidden sm:block ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
            <ArrowRight size={24} className="text-red-500" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default StandardBlogItem;