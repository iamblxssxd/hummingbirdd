import TextareaSubmit from '@/components/TextareaSubmit'
import WordTooltip from '@/components/WordTooltip'
import { getAuthSession } from '@/lib/auth'
import Balancer from 'react-wrap-balancer'

export default async function Home() {
  const session = await getAuthSession()

  return (
    <>
      {session?.user ? (
        <div className='flex flex-col justify-start max-w-4xl mx-auto pt-12'>
          <TextareaSubmit />
        </div>
      ) : (
        <div className='container max-w-4xl mx-auto pt-12'>
          <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl font-irvin'>
            <Balancer>Read any article with confidence</Balancer>
          </h1>
          <p className=' tracking-normal [&:not(:first-child)]:mt-6 font-acaslonpro text-2xl'>
            <Balancer>
              In a world where information{' '}
              <WordTooltip
                word='overload'
                definition='to give too much work to'
              />{' '}
              is a constant challenge, Hummingbird with its word definition
              feature emerges as a game-changer in enhancing the reading
              experience. By{' '}
              <WordTooltip
                word='broadening'
                definition=' an increase in size'
              />{' '}
              vocabulary, improving comprehension, saving time and effort,
              supporting language learners, and encouraging active reading,
              Hummingbird revolutionizes the way we consume written content.
            </Balancer>
          </p>
        </div>
      )}
    </>
  )
}
