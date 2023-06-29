import "@/styles/globals.css"

import {
  fontAcaslonpro,
  fontInter,
  fontIrvin,
  fontSantaCatarina,
} from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/Toaster"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"

export const metadata = {
  title: "Hummingbird",
  description: "Upload articles and get quick definitions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // TODO delete inter variable from the config (variable is not working?)
    <html
      lang="en"
      className={cn(
        "antialiased",

        fontInter.className,
        fontSantaCatarina.variable,
        fontAcaslonpro.variable,
        fontIrvin.variable
      )}
    >
      <body className="min-h-screen font-inter antialiased">
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />

          <div className="container mx-auto h-full max-w-7xl">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
