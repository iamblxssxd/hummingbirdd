import '@/styles/globals.css'

import { fontInter, fontSantaCatarina } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

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
        fontSantaCatarina.variable
      )}>
      <body className='min-h-screen pt-12 antialiased font-inter'>
        <Providers>
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
