import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { commonWords } from '@/lib/commonWords'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterWords(text: String | null) {
  if (!text) {
    return
  }

  const words = text.toLowerCase().split(/\W+/)
  const filteredWords = words.filter((word) => !commonWords.includes(word))
  const uniqueWords = Array.from(new Set(filteredWords))

  return uniqueWords
}
