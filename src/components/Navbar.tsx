import Link from "next/link"

import { getAuthSession } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"
import ThemeToggle from "@/components/ThemeToggle"
import UserAccountNav from "@/components/UserAccountNav"

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <div className="sticky inset-x-0 top-0 z-[10] h-fit bg-background py-4">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-9" />
          <p className="hidden text-lg font-semibold md:block">Hummingbird</p>
        </Link>

        <div className="md:hidden">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
