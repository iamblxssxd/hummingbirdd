import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { getAuthSession } from '@/lib/auth'

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <div className='fixed top-0 inset-x-0 h-fit  z-[10] py-2'>
      <div className='container max-w-7xl h-14 mx-auto flex items-center justify-between gap-2'>
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-6 w-6' />
          <p className='hidden text-md font-medium md:block'>Hummingbird</p>
        </Link>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden md:flex gap-4'>
          <ThemeToggle />

          {session ? (
            <p>logged in</p>
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
