'use client'

import { FC } from 'react'
import { useSearchParams } from 'next/navigation'

interface ReaderProps {}

const Reader: FC<ReaderProps> = ({}) => {
  const searchParams = useSearchParams()

  const text = searchParams.get('text')

  return <div>I am a reader {text}</div>
}

export default Reader
