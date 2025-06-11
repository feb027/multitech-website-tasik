// src/components/sections/contact/ContactInfoSection.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, PhoneCall, Mail, Clock, ArrowRight,
  Facebook, Instagram, MessageCircle as LucideWhatsapp, HelpCircle 
} from 'lucide-react';

// Tipe data tetap sama
export interface SocialLinkServer {
  name: string;
  url: string;
  iconName: string;
}
export interface ContactInfoData {
  address: string;
  phones: {
    label: string;
    number: string;
  }[];
  emails: {
    label: string;
    address: string;
  }[];
  operationalHours: string;
  socialMedia: SocialLinkServer[];
}
interface ContactInfoSectionProps {
  info: ContactInfoData;
}

const iconComponents: { [key: string]: React.ElementType } = {
  Facebook: Facebook,
  Instagram: Instagram,
  WhatsApp: LucideWhatsapp,
  Default: HelpCircle,
};

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ info }) => {
  return (
    <section className='py-20 md:py-32 bg-slate-50 overflow-hidden'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='text-center mb-16 md:mb-20'
        >
          <span className='text-sm font-semibold uppercase tracking-wider text-red-600 mb-2 block'>
            Jangan Ragu
          </span>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#001A4D]'>
            Terhubung Dengan Kami
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Pintu kami selalu terbuka untuk pertanyaan, kolaborasi, atau sekadar sapaan hangat.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12'>
          {/* Kolom Kiri: Alamat & Jam Operasional */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className='lg:col-span-1 bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-red-500 flex flex-col'
          >
            <div className='flex items-center mb-5 text-red-600'>
              <MapPin className='w-10 h-10 mr-4' strokeWidth={1.5}/>
              <h3 className='text-2xl font-bold font-heading'>Kunjungi Toko Kami</h3>
            </div>
            <p className='text-slate-700 leading-relaxed mb-4 whitespace-pre-line'>{info.address}</p>            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className='inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors duration-200 group mt-auto'
            >
              Lihat di Peta <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1"/>
            </a>
            
            <hr className="my-8 border-slate-200" />

            <div className='flex items-center mb-5 text-red-600'>
              <Clock className='w-10 h-10 mr-4' strokeWidth={1.5}/>
              <h3 className='text-2xl font-bold font-heading'>Jam Operasional</h3>
            </div>
            <div className='text-slate-700 leading-relaxed whitespace-pre-line'>
              {info.operationalHours.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
              ))}
            </div>
          </motion.div>

          {/* Kolom Kanan: Kontak Langsung & Media Sosial */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className='lg:col-span-2 bg-gradient-to-br from-[#001A4D] via-[#002255] to-[#001A4D] p-8 md:p-10 rounded-xl shadow-2xl text-white flex flex-col'
          >            <h3 className='text-2xl font-bold font-heading mb-6 text-center text-red-300'>Hubungi Langsung</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Kontak Telepon */}
              <div className="p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-center transform hover:scale-105">
                <PhoneCall className="w-8 h-8 text-red-400 mb-2 mx-auto" strokeWidth={1.5} />
                <div className="space-y-2">
                  {info.phones.map((phone, index) => (
                    <div key={index}>
                      <p className="text-xs text-slate-300 mb-1">{phone.label}</p>
                      <a 
                        href={`tel:${phone.number.replace(/\s|-/g, '')}`}
                        className="font-semibold text-base hover:text-red-300 transition-colors duration-200 block"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-300 mt-2">Klik nomor untuk menelepon</p>
              </div>
              {/* Kontak Email */}
              <div className="p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-center transform hover:scale-105">
                <Mail className="w-8 h-8 text-red-400 mb-2 mx-auto" strokeWidth={1.5} />
                <div className="space-y-2">
                  {info.emails.map((email, index) => (
                    <div key={index}>
                      <p className="text-xs text-slate-300 mb-1">{email.label}</p>
                      <a 
                        href={`mailto:${email.address}`}
                        className="font-semibold text-sm break-all hover:text-red-300 transition-colors duration-200 block"
                      >
                        {email.address}
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-300 mt-2">Klik email untuk mengirim pesan</p>
              </div>
            </div>

            <hr className="my-4 border-white/20" />

            <h4 className='text-xl font-bold font-heading mb-4 text-center'>Ikuti Kami</h4>
            <ul className='flex justify-center items-center space-x-6 md:space-x-8'>
              {info.socialMedia.map((social) => {
                const IconComponent = iconComponents[social.iconName] || iconComponents.Default;
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      title={social.name}
                      className='group text-slate-300 hover:text-white transition-colors duration-200'
                    >
                      <IconComponent className='w-9 h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-125 group-hover:text-red-400' strokeWidth={1.5}/>
                      <span className="sr-only">{social.name}</span> {/* Untuk aksesibilitas */}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;