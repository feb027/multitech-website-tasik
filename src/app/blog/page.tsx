// src/app/blog/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedBlogItem from '@/components/ui/FeaturedBlogItem'; // Impor baru
import StandardBlogItem from '@/components/ui/StandardBlogItem'; // Impor baru
import { getSortedPostsData, PostData } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog Multitech',
  description: 'Baca artikel terbaru, tips & trik, serta berita seputar teknologi dari tim Multitech Tasikmalaya.',
};

export default async function BlogPage() {
  const allPostsData: PostData[] = getSortedPostsData();
  const featuredPost = allPostsData.length > 0 ? allPostsData[0] : null;
  const standardPosts = allPostsData.length > 1 ? allPostsData.slice(1) : [];

  return (
    <>
      <PageHeader
        title="Artikel & Wawasan Teknologi"
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
        summary="Temukan panduan, tips, ulasan, dan berita terbaru dari dunia IT yang kami sajikan untuk Anda."
      />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          {allPostsData.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">Belum Ada Artikel</h2>
              <p className="text-slate-500">Kami sedang menyiapkan konten menarik untuk Anda. Silakan cek kembali nanti!</p>
            </div>
          )}

          {/* Artikel Unggulan */}
          {featuredPost && (
            <div className="mb-16 md:mb-20">
              <FeaturedBlogItem post={featuredPost} />
            </div>
          )}

          {/* Daftar Artikel Standar */}
          {standardPosts.length > 0 && (
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-[#001A4D] mb-8 md:mb-10 border-b-2 border-red-300 pb-3">
                Artikel Lainnya
              </h3>
              <div className="flex flex-col"> {/* Tidak lagi grid, tapi tumpukan vertikal */}
                {standardPosts.map((post, index) => (
                  <StandardBlogItem key={post.slug} post={post} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Pagination (Opsional) */}
        </div>
      </section>
    </>
  );
}