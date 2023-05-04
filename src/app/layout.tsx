import '@/styles/globals.css'

import { fontInter, fontSantaCatarina, fontAcaslonpro } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'

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
        'antialiased',
        fontInter.variable,
        fontSantaCatarina.variable,
        fontAcaslonpro.variable
      )}>
      <body className='min-h-screen pt-12 antialiased font-inter'>
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
