'use client'

import { FC } from 'react'
import { filterWords, fetchDefinition } from '@/lib/utils'
import WordTooltip from '@/components/WordTooltip'
import React from 'react'
import { useQueries } from '@tanstack/react-query'
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
  console.log('render')
  const { text } = useText()
  const words = filterWords(text)

  const definitions = useQueries({
    queries: (words ?? []).map((word) => {
      return {
        queryKey: ['words', word],
        queryFn: () => fetchDefinition(word),
      }
    }),
  })

  console.log('defintions are', definitions)

  return (
    <div className='max-w-4xl mx-auto'>
      {text && (
        <div className='text-4xl font-acaslonpro'>
          {text.split(' ').map((word, index) => {
            const definition = definitions.find(
              (def) => def?.data?.wordWise?.word === word
            )

            const hasDefinition = !!definition

            return (
              <React.Fragment key={word}>
                {hasDefinition ? (
                  <WordTooltip
                    word={word}
                    definition={definition?.data?.wordWise.shortDefinition}
                  />
                ) : (
                  <span>{word} </span>
                )}{' '}
              </React.Fragment>
            )
          })}
        </div>
      )}
      <ReaderActions readerText={text} />
    </div>
  )
}

export default Reader
