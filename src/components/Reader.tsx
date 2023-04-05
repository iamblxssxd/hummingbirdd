'use client'

import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { filterWords, fetchDefinition } from '@/lib/utils'

interface ReaderProps {}

interface Definition {
  id: string
  word: string
  wordWise: {
    fullDefinition: string
    shortDefinition: string
    exampleSentence: string
    hintLevel: number
  }
}

const Reader: FC<ReaderProps> = ({}) => {
  const [text, setText] = useState<String | null>('')
  const [words, setWords] = useState<String[] | undefined>([])
  const [definitions, setDefinitions] = useState<Definition[] | undefined>([])

  const searchParams = useSearchParams()
  const userInput = searchParams.get('text')

  useEffect(() => {
    if (userInput) {
      const words = filterWords(userInput)
      setWords(words)
      setText(userInput)

      /* city : {
        definition: String;
        isDefinition: boolean;
      }
      */

      const fetchDefinitions = async () => {
        // make so the word is added if only wordWise !== null
        // @ts-ignore
        const definitionPromises = words.map((word) => fetchDefinition(word))
        const fetchedDefinitions: Definition[] = await Promise.all(
          definitionPromises
        )
        setDefinitions(
          fetchedDefinitions.filter((word) => word.wordWise !== null)
        )
      }

      fetchDefinitions()
    }
  }, [userInput])

  console.log(text)
  console.log(words)
  console.log(definitions)

  return (
    <div>
      {text && (
        <p className='text-4xl'>
          {/* TODO create tooltip for word */}
          {/* <WordTooltip word='hey' definition='this is a definition for hey' /> */}
          {text.split(' ').map((word, index) => {
            const hasDefinition = definitions?.some(
              (definition) => definition.word === word
            )
            const wordStyle = hasDefinition ? { color: 'red' } : {}

            return (
              <span key={index} style={wordStyle}>
                {word}{' '}
              </span>
            )
          })}
        </p>
      )}
      {definitions && (
        <ul>
          {definitions.map((definition, index) => (
            <li key={index}>
              <p>Word: {definition.word}</p>
              {definition.wordWise && (
                <>
                  <p>Definition: {definition.wordWise.shortDefinition}</p>
                  <p>Example: {definition.wordWise.exampleSentence}</p>
                  <p>Hint Level: {definition.wordWise.hintLevel}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Reader
