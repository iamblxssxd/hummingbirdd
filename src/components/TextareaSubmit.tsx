'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/Textarea'
import { Button, buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CreateTextPayload } from '@/lib/validators/text'

interface TextareaSubmitProps {}

const TextareaSubmit = () => {
  const [input, setInput] = useState<string>('')
  // const router = useRouter()

  const { mutate: createText, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTextPayload = {
        text: input,
      }

      const { data } = await axios.post('/api/text', payload)
      return data as string
    },
  })

  return (
    <div className='container flex flex-col  h-full max-w-3xl mx-auto space-y-6'>
      <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl font-santa'>
        Your text:
      </h1>
      <Textarea
        placeholder='Paste your text here'
        className='resize-none'
        onChange={(e) => setInput(e.target.value)}
      />
      <div className='flex justify-end'>
        <Button
          isLoading={isLoading}
          disabled={input.length === 0}
          onClick={() => createText()}>
          Submit Text
        </Button>
        {/* <Link href='/reader' className={buttonVariants()}>
          Submit text
        </Link> */}
      </div>
    </div>
  )
}

export default TextareaSubmit
