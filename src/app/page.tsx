import { Textarea } from '@/components/ui/Textarea'

export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-start max-w-4xl mx-auto'>
        <h1 className='font-bold text-3xl md:text-4xl'>Your text:</h1>
        <div className='pt-12'>
          <Textarea />
        </div>
      </div>
    </>
  )
}
