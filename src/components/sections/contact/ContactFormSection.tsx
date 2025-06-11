// src/components/sections/contact/ContactFormSection.tsx
'use client';

import React, { useState, useCallback } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  ContactFormValues,
} from '@/lib/validators/contactFormSchema';
import { motion } from 'motion/react';
import {
  Send,
  AlertCircle,
  CheckCircle,
  User,
  Mail as MailIcon,
  Phone,
  MessageSquare,
  Type,
} from 'lucide-react'; // Tambah ikon untuk input
import ReCAPTCHA from 'react-google-recaptcha';

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
}> = React.memo(
  ({
    name,
    label,
    type = 'text',
    placeholder,
    isTextarea = false,
    register,
    error,
    icon: Icon,
  }) => {
    // React.memo untuk mencegah re-render jika props tidak berubah
    const commonInputClasses = `w-full bg-transparent py-3 pl-12 pr-4 border-b-2 
                             ${error ? 'border-red-400 text-red-700 placeholder-red-400/70' : 'border-slate-300 hover:border-slate-400 focus:border-[#00398D] text-slate-800 placeholder-slate-400'} 
                             transition-colors duration-300 ease-in-out outline-none focus:ring-0`;

    return (
      <div className='relative mb-7'>
        {' '}
        {/* Tambah mb lebih besar */}
        <label
          htmlFor={name}
          className={`absolute -top-3.5 left-12 text-xs font-semibold transition-all duration-200 ease-out ${error ? 'text-red-600' : 'text-slate-500 group-focus-within:text-[#00398D]'}`}
        >
          {label}
        </label>
        <div className='group relative flex items-center'>
          {Icon && (
            <Icon
              className={`absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00398D]'}`}
            />
          )}
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
          <p className='absolute top-full left-0 mt-1 flex items-center text-xs text-red-600'>
            <AlertCircle size={14} className='mr-1' /> {error.message}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField'; // Untuk debugging

const ContactFormSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched', // Coba ganti mode ke 'onTouched' atau 'onBlur' untuk mengurangi re-render saat mengetik
    // 'onChange' sangat agresif. 'onTouched' akan validasi setelah field di-blur pertama kali.
  });

  const onRecaptchaChange = useCallback(
    (token: string | null) => {
      setRecaptchaToken(token || '');
      setValue('recaptchaToken', token || '', { shouldValidate: true });
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<ContactFormValues> = useCallback(
    async (data) => {
      // useCallback agar fungsi ini tidak dibuat ulang setiap render jika dependensi tidak berubah
      setIsSubmitting(true);
      setSubmitStatus(null);
      console.log('Form Data:', data);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus({
            success: true,
            message:
              'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.',
          });
          reset();
          setRecaptchaToken('');
        } else {
          setSubmitStatus({
            success: false,
            message:
              result.error ||
              'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
          });        }
      } catch {
        setSubmitStatus({
          success: false,
          message:
            'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset]
  ); // reset adalah dependensi useCallback

  return (
    <section className='bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 py-20 md:py-32'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='mx-auto mb-12 max-w-2xl text-center md:mb-16'
        >
          {/* ... (Judul section tetap sama) ... */}
          <h2 className='font-heading mb-5 text-4xl font-extrabold text-[#001A4D] md:text-5xl'>
            Kirimkan Pesan Anda
          </h2>
          <p className='text-lg leading-relaxed text-slate-600'>
            Punya pertanyaan atau butuh bantuan lebih lanjut? Jangan ragu untuk
            mengisi formulir di bawah ini.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit(onSubmit)}
          className='relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-2xl md:p-10'
        >
          {/* Elemen dekoratif di latar form */}
          <div className='absolute -top-10 -left-10 h-32 w-32 rounded-full bg-red-500/10 opacity-70 blur-2xl'></div>
          <div className='absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-[#001A4D]/10 opacity-60 blur-3xl'></div>

          <div className='relative z-10'>
            {' '}
            {/* Konten form di atas dekorasi */}
            <InputField
              name='name'
              label='Nama Lengkap'
              placeholder='John Doe'
              register={register}
              error={errors.name}
              icon={User}
            />
            <InputField
              name='email'
              label='Alamat Email'
              type='email'
              placeholder='anda@domain.com'
              register={register}
              error={errors.email}
              icon={MailIcon}
            />
            <InputField
              name='phone'
              label='Nomor Telepon (Opsional)'
              type='tel'
              placeholder='08123xxxx'
              register={register}
              error={errors.phone}
              icon={Phone}
            />
            <InputField
              name='subject'
              label='Subjek Pesan'
              placeholder='Mis: Pertanyaan Layanan X'
              register={register}
              error={errors.subject}
              icon={Type}
            />
            <InputField
              name='message'
              label='Isi Pesan Anda'
              placeholder='Tuliskan pesan detail Anda...'
              isTextarea
              register={register}
              error={errors.message}
              icon={MessageSquare}
            />
            {/* Tambahan reCAPTCHA */}
            <div className='mb-6'>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={onRecaptchaChange}
                theme='light'
              />
              {errors.recaptchaToken && (
                <p className='mt-1 flex items-center text-xs text-red-600'>
                  <AlertCircle size={14} className='mr-1' />{' '}
                  {errors.recaptchaToken.message}
                </p>
              )}
            </div>
            {submitStatus && (
              <div
                className={`mb-6 flex items-center gap-2.5 rounded-lg p-3.5 text-sm ${submitStatus.success ? 'border border-green-300 bg-green-50 text-green-700' : 'border border-red-300 bg-red-50 text-red-700'}`}
              >
                {submitStatus.success ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {submitStatus.message}
              </div>
            )}
            <motion.button
              type='submit'
              disabled={isSubmitting || !isDirty || !isValid || !recaptchaToken}
              className='font-heading flex w-full transform items-center justify-center gap-2.5 rounded-lg bg-[#002A70] px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#00398D] hover:shadow-xl focus:ring-4 focus:ring-[#00398D]/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#002A70]'
              whileTap={
                !isSubmitting && isDirty && isValid
                  ? { scale: 0.98, transition: { duration: 0.1 } }
                  : {}
              }
            >
              {isSubmitting /* ... (animasi loading tetap sama) ... */ ? (
                <>
                  <motion.div
                    className='h-5 w-5 rounded-full border-2 border-white border-t-transparent'
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
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
