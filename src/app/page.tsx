import { TextareaForm } from '@/components/TextareaForm'

export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-start max-w-4xl mx-auto'>
        <h1 className='font-bold text-3xl md:text-4xl'>Try it out:</h1>
        <div className='pt-6'>
          <TextareaForm />
        </div>
      </div>
    </>
  )
}
