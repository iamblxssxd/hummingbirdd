import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { commonWords } from "@/lib/commonWords"

interface WordDefinition {
  id: string
  wordWise: {
    word: string
    fullDefinition: string
    shortDefinition: string
    favorite: boolean
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterWords(text: string): string[] | undefined {
  if (!text) {
    return undefined
  }

  // Use a regular expression to split the text into words
  const words: string[] = text.toLowerCase().match(/\b\w+\b/g) || []

  const filteredWords: string[] = words.filter(
    (word) => !commonWords.includes(word)
  )

  const uniqueWords: string[] = Array.from(new Set(filteredWords))

  return uniqueWords
}

export async function fetchDefinition(
  word: string
): Promise<WordDefinition | undefined> {
  const requestOptions = {
    method: "POST",
    headers: {
      // TODO - move to env
      Authorization: `Vi2frjcdeyIyEUydliMQ3`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: word }),
  }

  try {
    const response = await fetch(`/api/v1/wordwise`, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error:", error)
  }
}
