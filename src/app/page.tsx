// src/app/page.tsx
import HeroSection from '@/components/sections/home/HeroSection';
import AboutSummarySection from '@/components/sections/home/AboutSummarySection';
import ServicesHighlightSection from '@/components/sections/home/ServicesHighlightSection';
import TestimonialSection from '@/components/sections/home/TestimonialSection';
import SecondaryCTASection from '@/components/sections/home/SecondaryCTASection'; // Impor baru

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSummarySection />
      <ServicesHighlightSection />
      <TestimonialSection />
      <SecondaryCTASection /> 
    </>
  );
}