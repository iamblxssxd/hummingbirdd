'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { filterWords } from '@/lib/utils'

interface ReaderProps {}

const Reader: FC<ReaderProps> = ({}) => {
  const [text, setText] = useState<String | null>('')
  const [words, setWords] = useState<String[] | undefined>([])
  const [definitions, setDefinitions] = useState<String[]>([])

  const searchParams = useSearchParams()
  const userInput = searchParams.get('text')

  useEffect(() => {
    const words = filterWords(userInput)
    setWords(words)
    setText(userInput)
  }, [userInput])

  return <div>I am a reader {text}</div>
}

export default Reader
