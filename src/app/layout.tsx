import '@/styles/globals.css'

import { fontInter, fontSantaCatarina } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Hummingbird',
  description: 'Upload articles and get quick definitions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        fontInter.variable,
        fontSantaCatarina.variable
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased font-inter'>
        <Navbar />

        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
      </body>
    </html>
  )
}
