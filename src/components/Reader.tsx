'use client'

import { FC, useEffect, useState } from 'react'
import { filterWords, fetchDefinition } from '@/lib/utils'
import WordTooltip from '@/components/WordTooltip'
import React from 'react'
import { Icons } from './Icons'
import { QueryCache, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useText } from '@/hooks/useText'
import ReaderActions from './ReaderActions'

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
  const [userText, setUserText] = useState<String | null>('')
  const [words, setWords] = useState<String[] | undefined>([])
  const [definitions, setDefinitions] = useState<Definition[] | undefined>([])

  const { text } = useText()

  useEffect(() => {
    if (text) {
      setUserText(text)
      const words = filterWords(userText)
      setWords(words)

      const fetchDefinitions = async () => {
        if (words) {
          const definitionPromises = words.map((word) => fetchDefinition(word))
          const fetchedDefinitions: Definition[] = await Promise.all(
            definitionPromises
          )
          setDefinitions(
            fetchedDefinitions.filter((word) => word.wordWise !== null)
          )
        }
      }

      fetchDefinitions()
    }
  }, [text, userText])

  console.log(userText)
  console.log(words)
  console.log(definitions)

  return (
    <div className='max-w-4xl mx-auto'>
      {userText && (
        <p className='text-4xl font-acaslonpro'>
          {userText.split(' ').map((word, index) => {
            const definition = definitions?.find(
              (definition) => definition.word === word
            )
            const hasDefinition = !!definition

            return (
              <React.Fragment key={index}>
                {hasDefinition ? (
                  <WordTooltip
                    key={index}
                    word={word}
                    definition={definition?.wordWise.shortDefinition || ''}
                  />
                ) : (
                  <span key={index}>{word} </span>
                )}{' '}
              </React.Fragment>
            )
          })}
        </p>
      )}
      <ReaderActions readerText={text} />
    </div>
  )
}

export default Reader
