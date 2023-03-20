import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from '@/components/ui/Button'

const Navbar = () => {
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-neutral-800 border-b border-neutral-700 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-neutral-50 text-sm font-medium md:block'>
            Hummingbird
          </p>
        </Link>

        <Link href='/sign-in' className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Navbar
