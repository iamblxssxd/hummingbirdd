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

export async function fetchDefinition(word: String) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Vi2frjcdeyIyEUydliMQ3`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: word }),
  }

  try {
    const response = await fetch(`/api/v1/wordwise`, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    console.log(data)

    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
