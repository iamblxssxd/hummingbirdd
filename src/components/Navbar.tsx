import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from '@/components/UserAccountNav'

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <div className='fixed top-0 inset-x-0 h-fit z-[10] py-8'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-9' />
          <p className='hidden text-lg font-semibold font md:block'>
            Hummingbird
          </p>
        </Link>

        <div className='md:hidden'>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href='/sign-in' className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>

        <div className='hidden md:flex gap-4 items-center'>
          <ThemeToggle />

          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href='/sign-in' className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
