'use client'; // Ini adalah Client Component karena menggunakan motion dan interaktivitas
import React from 'react';
import { motion as m } from 'motion/react'; // Impor motion

interface TempButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // onClick adalah prop opsional
}

const TempButton: React.FC<TempButtonProps> = ({ children, onClick }) => {
  return (
    <m.button // Gunakan m.button dari motion
      onClick={onClick} // Akan menggunakan prop onClick jika diberikan
      className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-4'
      whileHover={{ scale: 1.1 }} // Contoh animasi dari motion
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </m.button>
  );
};

export default TempButton;