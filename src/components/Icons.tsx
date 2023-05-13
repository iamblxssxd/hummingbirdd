import { Sun, Moon, User2, Bookmark, type LucideProps } from 'lucide-react'
type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  sun: Sun,
  moon: Moon,
  user: User2,
  bookmark: Bookmark,
  logo: (props: LucideProps) => (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'>
      <path d='M16 7h.01' />
      <path d='M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20' />
      <path d='m20 7 2 .5-2 .5' />
      <path d='M10 18v3' />
      <path d='M14 17.75V21' />
      <path d='M7 18a6 6 0 0 0 3.84-10.61' />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg role='img' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
      />
    </svg>
  ),
  mouse: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='1em'
      viewBox='0 0 320 512'
      fill='currentColor'
      {...props}>
      <path d='M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z' />
    </svg>
  ),
}
