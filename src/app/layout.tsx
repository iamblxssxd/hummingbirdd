import '@/styles/globals.css'

import {
  fontInter,
  fontSantaCatarina,
  fontAcaslonpro,
  fontIrvin,
} from '@/lib/fonts'
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
    // TODO delete inter variable from the config (variable is not working?)
    <html
      lang='en'
      className={cn(
        'antialiased',
        fontInter.className,
        fontSantaCatarina.variable,
        fontAcaslonpro.variable,
        fontIrvin.variable
      )}>
      <body className='min-h-screen antialiased font-inter'>
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />

          <div className='container max-w-7xl mx-auto h-full'>{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
