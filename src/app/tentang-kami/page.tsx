// src/app/tentang-kami/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader'; // Impor PageHeader
import HistorySection from '@/components/sections/about/HistorySection';
import VisionMissionSection from '@/components/sections/about/VisionMissionSection';
import ValuesSection from '@/components/sections/about/ValuesSection';
import TeamSection from '@/components/sections/about/TeamSection';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Pelajari lebih lanjut tentang sejarah, visi, misi, dan nilai-nilai Multitech Tasikmalaya, partner IT terpercaya Anda.',
};

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader
        title="Tentang Multitech"
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Tentang Kami', href: '/tentang-kami' },
        ]}
        summary="Mengenal lebih dekat perjalanan, dedikasi, dan komitmen kami dalam memberikan solusi teknologi terbaik di Tasikmalaya."
      />
      
      <HistorySection />
      <VisionMissionSection /> 
      <ValuesSection />
      <TeamSection />
    </>
  );
}