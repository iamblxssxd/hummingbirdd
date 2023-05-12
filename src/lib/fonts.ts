import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const fontSantaCatarina = localFont({
  src: '../../public/fonts/santa_catarina-webfont.woff2',
  variable: '--font-santa-catarina',
})

export const fontAcaslonpro = localFont({
  src: '../../public/fonts/acaslonpro-regular-webfont.woff2',
  variable: '--font-acaslonpro',
})

export const fontIrvin = localFont({
  src: '../../public/fonts/irvin-heading-webfont.woff2',
  variable: '--font-irvin',
})
