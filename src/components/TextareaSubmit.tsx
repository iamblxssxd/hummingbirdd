'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/Textarea'
import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface TextareaSubmitProps {}

const TextareaSubmit = () => {
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const {} = useMutation({
    mutationFn: async () => {
      const payload = () => {}

      const { data } = await axios.post('/api/text', payload)
    },
  })

  return (
    <div className='container flex flex-col  h-full max-w-3xl mx-auto space-y-6'>
      <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl font-santa'>
        Your text:
      </h1>
      <Textarea placeholder='Paste your text here' className='resize-none' />
      <div className='flex justify-end'>
        <Link href='/submit' className={buttonVariants()}>
          Submit text
        </Link>
      </div>
    </div>
  )
}

export default TextareaSubmit
