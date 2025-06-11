// src/app/kebijakan-privasi/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import PrivacyPolicyContent from '@/components/sections/privacy/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi Multitech Tasikmalaya mengenai penggunaan dan perlindungan data pribadi Anda.',
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <PageHeader
        title="Kebijakan Privasi"
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
        ]}
        summary="Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan Multitech Tasikmalaya."
      />
      
      <PrivacyPolicyContent />
    </>
  );
}
