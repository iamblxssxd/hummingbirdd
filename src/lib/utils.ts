import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { commonWords } from "@/lib/commonWords"

interface WordWise {
  id: string
  word: string
  fullDefinition: string
  shortDefinition: string
  exampleSentence: string
  hintLevel: string
}

export interface ApiResponse {
  success: boolean
  word: string
  wordWise: WordWise | null
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterWords(text: string): string[] | [] {
  if (!text) {
    return []
  }

  // split the text into individual words
  const words: string[] = text.toLowerCase().match(/\b\w+\b/g) || []

  const filteredWords: string[] = words.filter(
    (word) => !commonWords.includes(word)
  )

  const uniqueWords: string[] = Array.from(new Set(filteredWords))

  return uniqueWords
}

export async function fetchDefinition(word: string): Promise<ApiResponse> {
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
    const response = await fetch(
      `http://localhost:3000/api/v1/wordwise`,
      requestOptions
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    return data
  } catch (error) {
    console.error("Error:", error)
    return { success: false, word: "", wordWise: null }
  }
}
