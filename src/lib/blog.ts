// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale'; // Untuk format tanggal Indonesia

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostData {
  slug: string;
  title: string;
  date: string; // Tanggal string asli dari frontmatter
  formattedDate?: string; // Tanggal yang sudah diformat
  excerpt?: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  contentHtml?: string; // Konten yang sudah jadi HTML
  // Tambahkan properti lain dari frontmatter jika ada
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Format date
    let formattedDate = '';
    if (matterResult.data.date) {
      try {
        formattedDate = format(parseISO(matterResult.data.date), 'dd MMMM yyyy', { locale: id });
      } catch {
        console.warn(`Invalid date format for ${fileName}: ${matterResult.data.date}`);
        formattedDate = matterResult.data.date; // Fallback ke tanggal asli jika parsing gagal
      }
    }
    
    return {
      slug,
      ...(matterResult.data as Omit<PostData, 'slug' | 'formattedDate' | 'contentHtml'>), // Type assertion
      date: matterResult.data.date || '', // Pastikan date selalu ada
      formattedDate,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  let formattedDate = '';
  if (matterResult.data.date) {
    try {
      formattedDate = format(parseISO(matterResult.data.date), 'dd MMMM yyyy', { locale: id });
    } catch {
       console.warn(`Invalid date format for ${slug}.md: ${matterResult.data.date}`);
       formattedDate = matterResult.data.date;
    }
  }

  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'slug' | 'contentHtml' | 'formattedDate'>),
    date: matterResult.data.date || '',
    formattedDate,
  };
}