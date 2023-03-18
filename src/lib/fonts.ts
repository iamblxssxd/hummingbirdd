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
