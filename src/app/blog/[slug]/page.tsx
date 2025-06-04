// src/app/blog/[slug]/page.tsx
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostData, getAllPostSlugs, PostData } from '@/lib/blog';
import { CalendarDays, UserCircle, Tag, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ // params is now a Promise
    slug: string;
  }>;
}

// Fungsi untuk generate metadata dinamis
export async function generateMetadata(
  props: PostPageProps, // Terima props secara keseluruhan
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await params before accessing slug
  const params = await props.params;
  const slug = params?.slug; 

  if (!slug) {
    // Ini seharusnya tidak terjadi untuk rute [slug].md, tapi sebagai penjagaan
    console.error("Error generating metadata: Slug not found in params", props.params);
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    };
  }

  try {
    const post = await getPostData(slug); // Gunakan slug yang sudah diekstrak
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: post.title,
      description: post.excerpt || 'Baca artikel menarik dari Multitech Tasikmalaya.',
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
        images: post.coverImage 
          ? [{ url: new URL(post.coverImage, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString(), width: 1200, height: 630, alt: post.title }, ...previousImages] 
          : [...previousImages],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [new URL(post.coverImage, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString()] : undefined,
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for slug: ${slug}`, error);
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak ditemukan.",
    };
  }
}

// Fungsi untuk generate static paths (SSG)
// generateStaticParams tidak berubah karena params sudah dalam format yang benar
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); 
  return paths.map(path => ({ slug: path.params.slug }));
}


export default async function PostPage(props: PostPageProps) { // Terima props secara keseluruhan
  // Await params before accessing slug
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    console.error("Error rendering PostPage: Slug not found in params", props.params);
    notFound(); // Panggil notFound jika slug tidak ada (seharusnya tidak terjadi)
    return null; // Return null agar TS tidak komplain tentang potensi 'post' tidak terdefinisi
  }

  let post: PostData;
  try {
    post = await getPostData(slug);
  } catch (error) {
    console.error(`Error fetching post data for slug: ${slug}`, error);
    notFound();
    return null; 
  }

  // ... (sisa JSX komponen PostPage dengan styling prose yang sudah kita revisi sebelumnya tetap sama) ...
  // Pastikan styling prose dari respons saya sebelumnya sudah Anda terapkan di sini.
  return (
    <div className="bg-white min-h-screen">
      {post.coverImage && (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
      )}

      <article className="container mx-auto px-4 md:px-6 max-w-3xl py-12 md:py-16">
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-semibold group">
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Kembali ke Semua Artikel
          </Link>
        </div>
        
        <header className="mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D] mb-5 leading-tight md:leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-slate-600 gap-x-4 gap-y-2">
            {post.formattedDate && (
                <div className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-slate-500" />
                    <span>{post.formattedDate}</span>
                </div>
            )}
            {post.author && (
                <div className="flex items-center gap-1.5">
                    <UserCircle size={16} className="text-slate-500" />
                    <span>Oleh: {post.author}</span>
                </div>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Tag size={16} className="text-slate-500" />
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full hover:bg-red-200 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.contentHtml && (
          <div
            className="
              prose prose-lg lg:prose-xl xl:prose-2xl max-w-none 
              prose-slate 
              text-slate-700 
              prose-headings:font-heading prose-headings:text-[#001A4D] 
              prose-headings:mt-12 prose-headings:mb-6 
              prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:leading-tight
              prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:leading-snug
              prose-h4:text-xl prose-h4:md:text-2xl prose-h4:leading-snug
              prose-p:leading-relaxed md:prose-p:leading-loose 
              prose-p:my-6 md:prose-p:my-7
              prose-a:text-red-600 prose-a:font-medium hover:prose-a:text-red-700 
              prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
              prose-a:transition-colors prose-a:duration-200
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-red-500 
              prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-3 
              prose-blockquote:my-8 md:prose-blockquote:my-10
              prose-blockquote:bg-red-50/60 prose-blockquote:text-slate-700 
              prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:rounded-r-md
              prose-blockquote:shadow-sm
              prose-ul:list-disc prose-ul:ml-1 prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-6
              prose-ol:list-decimal prose-ol:ml-1 prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-6
              prose-li:my-2 prose-li::marker:text-slate-500
              prose-code:bg-slate-100 prose-code:text-red-700 prose-code:font-mono 
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm 
              prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-[#001A4D] prose-pre:text-slate-100 prose-pre:p-6 
              prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:overflow-x-auto 
              prose-pre:my-8 md:prose-pre:my-10 prose-pre:text-sm prose-pre:leading-relaxed
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10 md:prose-img:my-12
              prose-hr:my-12 prose-hr:border-slate-300
            "
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        )}

        <hr className="my-12 md:my-16 border-slate-300" />
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-[#002A70] hover:bg-[#00398D] text-white font-semibold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-base">
            <ArrowLeft size={18} /> Semua Artikel
          </Link>
        </div>
      </article>
    </div>
  );
}