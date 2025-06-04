// src/app/layanan/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import ServiceListSection from '@/components/sections/services/ServiceListSection'; // Impor baru

export const metadata: Metadata = {
  title: 'Layanan Kami',
  description: 'Temukan berbagai solusi dan layanan IT profesional yang ditawarkan oleh Multitech Tasikmalaya untuk kebutuhan personal dan bisnis Anda.',
};

export default function LayananPage() {
  return (
    <>
      <PageHeader
        title="Solusi & Layanan IT Profesional"
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
        ]}
        summary="Dari perbaikan perangkat keras hingga instalasi jaringan dan konsultasi IT, kami menyediakan layanan komprehensif dengan standar kualitas tertinggi."
      />
      <ServiceListSection />
    </>
  );
}