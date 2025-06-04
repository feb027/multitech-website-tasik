// src/components/sections/contact/ContactFormSection.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler, FieldError, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/validators/contactFormSchema';
import { motion } from 'motion/react';
import { Send, AlertCircle, CheckCircle, User, Mail as MailIcon, Phone, MessageSquare, Type } from 'lucide-react'; // Tambah ikon untuk input

// Komponen InputField yang lebih terisolasi dan dioptimasi
const InputField: React.FC<{
  name: keyof ContactFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  isTextarea?: boolean;
  register: UseFormRegister<ContactFormValues>;
  error: FieldError | undefined;
  icon?: React.ElementType;
}> = React.memo(({ name, label, type = 'text', placeholder, isTextarea = false, register, error, icon: Icon }) => {
  // React.memo untuk mencegah re-render jika props tidak berubah
  const commonInputClasses = `w-full bg-transparent py-3 pl-12 pr-4 border-b-2 
                             ${error ? 'border-red-400 text-red-700 placeholder-red-400/70' : 'border-slate-300 hover:border-slate-400 focus:border-[#00398D] text-slate-800 placeholder-slate-400'} 
                             transition-colors duration-300 ease-in-out outline-none focus:ring-0`;
  
  return (
    <div className="relative mb-7"> {/* Tambah mb lebih besar */}
      <label htmlFor={name} className={`absolute left-12 -top-3.5 text-xs font-semibold transition-all duration-200 ease-out 
                                       ${error ? 'text-red-600' : 'text-slate-500 group-focus-within:text-[#00398D]'}`}>
        {label}
      </label>
      <div className="relative flex items-center group">
        {Icon && <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00398D]'}`} />}
        {isTextarea ? (
          <textarea
            id={name}
            {...register(name)}
            placeholder={placeholder}
            rows={5}
            className={`${commonInputClasses} resize-none pt-3`} // pt-3 untuk textarea
          />
        ) : (
          <input
            id={name}
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={commonInputClasses}
          />
        )}
      </div>
      {error && (
        <p className="absolute left-0 top-full mt-1 text-xs text-red-600 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error.message}
        </p>
      )}
    </div>
  );
});
InputField.displayName = 'InputField'; // Untuk debugging


const ContactFormSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched', // Coba ganti mode ke 'onTouched' atau 'onBlur' untuk mengurangi re-render saat mengetik
                      // 'onChange' sangat agresif. 'onTouched' akan validasi setelah field di-blur pertama kali.
  });

  const onSubmit: SubmitHandler<ContactFormValues> = useCallback(async (data) => {
    // useCallback agar fungsi ini tidak dibuat ulang setiap render jika dependensi tidak berubah
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log('Form Data:', data);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = Math.random() > 0.3;
    if (success) {
      setSubmitStatus({ success: true, message: 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.' });
      reset();
    } else {
      setSubmitStatus({ success: false, message: 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.' });
    }
    setIsSubmitting(false);
  }, [reset]); // reset adalah dependensi useCallback

  return (
    <section className='py-20 md:py-32 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='max-w-2xl mx-auto text-center mb-12 md:mb-16'
        >
          {/* ... (Judul section tetap sama) ... */}
           <h2 className='text-4xl md:text-5xl font-extrabold font-heading text-[#001A4D] mb-5'>
                Kirimkan Pesan Anda
              </h2>
              <p className='text-lg text-slate-600 leading-relaxed'>
                Punya pertanyaan atau butuh bantuan lebih lanjut? Jangan ragu untuk mengisi formulir di bawah ini.
              </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-lg mx-auto p-8 md:p-10 bg-white rounded-2xl shadow-2xl 
                     border border-slate-200/80 relative overflow-hidden'
        >
          {/* Elemen dekoratif di latar form */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl opacity-70"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#001A4D]/10 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10"> {/* Konten form di atas dekorasi */}
            <InputField name="name" label="Nama Lengkap" placeholder="John Doe" register={register} error={errors.name} icon={User} />
            <InputField name="email" label="Alamat Email" type="email" placeholder="anda@domain.com" register={register} error={errors.email} icon={MailIcon} />
            <InputField name="phone" label="Nomor Telepon (Opsional)" type="tel" placeholder="08123xxxx" register={register} error={errors.phone} icon={Phone} />
            <InputField name="subject" label="Subjek Pesan" placeholder="Mis: Pertanyaan Layanan X" register={register} error={errors.subject} icon={Type} />
            <InputField name="message" label="Isi Pesan Anda" placeholder="Tuliskan pesan detail Anda..." isTextarea register={register} error={errors.message} icon={MessageSquare} />

            {submitStatus && (
              <div className={`p-3.5 rounded-lg text-sm mb-6 flex items-center gap-2.5 ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-300' : 'bg-red-50 text-red-700 border border-red-300'}`}>
                {submitStatus.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {submitStatus.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting || !isDirty || !isValid}
              className="w-full flex items-center justify-center gap-2.5 bg-[#002A70] hover:bg-[#00398D]
                         text-white font-bold font-heading py-4 px-8 rounded-lg shadow-lg hover:shadow-xl
                         transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#00398D]/40
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#002A70]"
              whileTap={!isSubmitting && isDirty && isValid ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
            >
              {isSubmitting ? ( /* ... (animasi loading tetap sama) ... */
                 <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Mengirim...
                  </>
              ) : (
                <>
                  <Send size={20} /> Kirim Sekarang
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;