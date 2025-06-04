// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Mengatur font-sans (default) ke variabel --font-open-sans
        sans: ['var(--font-open-sans)', 'sans-serif'],
        // Mengatur font-heading ke variabel --font-poppins
        // Anda bisa membuat kelas kustom atau menerapkan ini secara spesifik pada elemen heading
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      // Add typography customization
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.700'),
            h1: {
              color: theme('colors.slate.900'),
              fontWeight: '800',
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h2: {
              color: theme('colors.slate.900'),
              fontWeight: '700',
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            h3: {
              color: theme('colors.slate.900'),
              fontWeight: '600',
              fontFamily: theme('fontFamily.heading').join(', '),
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.red.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.red.700'),
                textDecoration: 'underline',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config