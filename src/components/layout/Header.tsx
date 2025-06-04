// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Tambahkan useRef
import Link from 'next/link';
import { Menu, X, ChevronDown, Image as ImageIcon, BookOpen } from 'lucide-react'; // Tambahkan ikon relevan
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react'; // Impor motion

interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType; // Opsional ikon untuk dropdown
}

const mainNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Kontak', href: '/kontak' },
];

const moreNavItems: NavItem[] = [
  { label: 'Galeri', href: '/galeri', icon: ImageIcon },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  // Tambahkan item lain di sini jika perlu
];

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // State untuk dropdown "Lainnya"
  const [activePath, setActivePath] = useState('');
  const moreDropdownRef = useRef<HTMLDivElement>(null); // Ref untuk deteksi klik di luar

  // Deteksi path aktif
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  // Efek scroll untuk sticky header
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek untuk menutup dropdown "Lainnya" saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);

  const primaryTextColor = isSticky ? 'text-slate-800' : 'text-white';
  const hoverTextColor = 'hover:text-[#FF3333]';
  const activeLinkUnderline = 'after:bg-[#FF3333]';

  const renderNavLink = (item: NavItem, isMobile: boolean = false) => (
    <Link
      key={item.label}
      href={item.href}
      onClick={() => {
        setActivePath(item.href);
        if (isMobile) setIsMobileMenuOpen(false);
        setIsMoreDropdownOpen(false); // Selalu tutup dropdown "Lainnya" saat link diklik
      }}
      className={clsx(
        'relative font-medium transition-colors duration-300 text-sm uppercase tracking-wider',
        isMobile 
          ? `w-full text-center py-3 px-4 rounded-md ${isSticky ? 'text-slate-700 hover:bg-slate-100 hover:text-[#FF3333]' : 'text-white hover:bg-white/10 hover:text-[#FF3333]'} ${activePath === item.href ? (isSticky ? 'bg-slate-200 text-[#FF3333]' : 'bg-white/20 text-[#FF3333]') : ''}`
          : `${primaryTextColor} ${hoverTextColor} after:content-[""] after:absolute after:left-0 after:bottom-[-6px] after:h-[3px] after:w-0 after:transition-all after:duration-300 ${activePath === item.href ? `after:w-full ${activeLinkUnderline}` : `hover:after:w-full ${activeLinkUnderline}`}`
      )}
    >
      {item.label}
    </Link>
  );
  
  const renderDropdownItem = (item: NavItem) => (
    <Link
      key={item.label}
      href={item.href}
      onClick={() => {
        setActivePath(item.href);
        setIsMoreDropdownOpen(false);
      }}
      className={clsx(
        "flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-md transition-all duration-200 ease-in-out",
        activePath === item.href 
          ? "bg-red-500 text-white" 
          : "text-slate-700 hover:bg-red-100 hover:text-red-600"
      )}
    >
      {item.icon && <item.icon size={18} className="opacity-70 group-hover:opacity-100" />}
      <span>{item.label}</span>
    </Link>
  );

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        {
          'bg-white/90 shadow-lg backdrop-blur-md py-4': isSticky, // Latar putih semi-transparan dengan blur, shadow lebih jelas
          'bg-transparent py-6': !isSticky, // Awalnya transparan
        }
      )}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/' className='text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity'>
          {/* Jika pakai gambar: <Image src="/logo-multitech.svg" alt="Multitech Logo" width={150} height={40} /> */}
          <span className={clsx(primaryTextColor, isSticky ? 'text-[#001A4D]' : 'text-white')}>
            MULTI
          </span>
          <span className={clsx(isSticky ? 'text-[#FF3333]' : 'text-[#FF3333]')}>
            TECH
          </span>
        </Link>

        {/* Navigasi Desktop */}
        <nav className='hidden md:flex items-center space-x-7'> {/* Space-x sedikit dikurangi */}
          {mainNavItems.map((item) => renderNavLink(item))}
          
          {/* Tombol Dropdown "Lainnya" */}
          <div className="relative" ref={moreDropdownRef}>
            <button
              onClick={toggleMoreDropdown}
              className={clsx(
                'flex items-center gap-1.5 font-medium transition-colors duration-300 text-sm uppercase tracking-wider',
                primaryTextColor, hoverTextColor,
                (activePath === '/galeri' || activePath === '/blog') && !isMobileMenuOpen ? `text-[#FF3333] ${activeLinkUnderline} after:w-full` : '' // Aktif jika salah satu item dropdown aktif
              )}
            >
              Lainnya
              <ChevronDown size={16} className={clsx("transition-transform duration-200", isMoreDropdownOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isMoreDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-slate-200/80 p-2 z-50"
                >
                  {moreNavItems.map((item) => renderDropdownItem(item))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Tombol Menu Mobile */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
            className={clsx(
              'p-2 rounded-md focus:outline-none transition-colors', primaryTextColor, hoverTextColor
            )}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={clsx( /* ... (className mobile menu dropdown tetap sama) ... */
               'md:hidden absolute top-full left-0 right-0 shadow-xl',
               isSticky ? 'bg-white/95 backdrop-blur-md' : 'bg-[#001233]/95 backdrop-blur-md'
            )}
          >
            <nav className='flex flex-col items-center space-y-1 p-6'>
              {mainNavItems.map((item) => renderNavLink(item, true))}
              {/* Pemisah di mobile menu */}
              <hr className="w-3/4 my-3 border-slate-300/30" />
              {moreNavItems.map((item) => renderNavLink(item, true))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;