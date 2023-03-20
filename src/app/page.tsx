import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Home
      <Link href='/test' className={buttonVariants()}>
        test
      </Link>
    </div>
  )
}
