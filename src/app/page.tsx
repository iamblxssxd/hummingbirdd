import { TextareaForm } from '@/components/TextareaForm'
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      {session?.user ? (
        <div className='flex flex-col justify-start max-w-4xl mx-auto pt-12'>
          <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl font-santa'>
            Try it out:
          </h1>
          <div className='pt-12'>
            <TextareaForm />
          </div>
        </div>
      ) : (
        <div className='max-w-2xl mx-auto pt-12'>
          <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl font-santa'>
            This is a non logged in state
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            labore unde mollitia culpa perferendis doloribus? Nihil, vero.
            Numquam rem vitae, cupiditate animi facere, ea architecto,
            accusantium sequi at veritatis aliquid tenetur quisquam ipsum
            consectetur pariatur porro quas illum eligendi cumque?
          </p>
        </div>
      )}
    </>
  )
}
