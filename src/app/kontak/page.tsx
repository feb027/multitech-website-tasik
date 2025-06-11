// src/app/kontak/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import ContactInfoSection, {
  ContactInfoData,
} from '@/components/sections/contact/ContactInfoSection';
import MapEmbed from '@/components/sections/contact/MapEmbed'; // Impor baru
import ContactFormSection from '@/components/sections/contact/ContactFormSection';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description:
    'Hubungi Multitech Tasikmalaya untuk pertanyaan, konsultasi, atau layanan. Temukan alamat, telepon, email, dan peta lokasi kami.',
};

const companyContactInfo: ContactInfoData = {
  address:
    'J6XH+8PH, Jl. Noenoeng Tisnasaputra, Kahuripan, Kec. Tawang, Kab. Tasikmalaya, Jawa Barat',
  phones: [
    {
      label: 'Customer Service',
      number: '0821-2039-5478'
    },
    {
      label: 'Toko',
      number: '0265-317-1058'
    }
  ],
  emails: [
    {
      label: 'Email Toko',
      address: 'mcscom_tasikmalaya@yahoo.co.id '
    },
    {
      label: 'Email CV',
      address: 'cvmultitech_tasik@yahoo.co.id'
    }
  ],
  operationalHours:
    'Senin - Jumat: 09.00 - 16.30 WIB\nSabtu: 09.00 - 15.00 WIB\nMinggu & Hari Libur Nasional: Tutup',
  socialMedia: [
    {
      name: 'Facebook',
      url: 'https://facebook.com/multitechtasik',
      iconName: 'Facebook',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/multitechtasik',
      iconName: 'Instagram',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/6281213141516',
      iconName: 'WhatsApp',
    },
  ],
};

// PENTING: Ganti dengan URL embed Google Maps yang valid untuk lokasi Multitech!
const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0195762328626!2d108.2293596!3d-7.351697700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f57004f045095%3A0x2592f697e67f26e2!2sMULTITECH!5e0!3m2!1sen!2sid!4v1749008795383!5m2!1sen!2sid';
const directGmapsUrl = 'https://maps.app.goo.gl/EXAMPLE';

export default function KontakPage() {
  return (
    <>
      <PageHeader
        title='Hubungi Tim Multitech'
        breadcrumb={[
          { label: 'Beranda', href: '/' },
          { label: 'Kontak', href: '/kontak' },
        ]}
        summary='Kami siap membantu Anda! Temukan cara terbaik untuk terhubung dengan kami melalui informasi kontak di bawah ini, atau kunjungi kami langsung.'
      />

      <ContactInfoSection info={companyContactInfo} />
      <MapEmbed embedUrl={mapEmbedUrl} gmapsUrl={directGmapsUrl} />
      <ContactFormSection />
    </>
  );
}
