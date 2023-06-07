'use client'

import React from 'react'
import { FC } from 'react'
import axios from 'axios'
import { UseQueryOptions, useMutation, useQueries } from '@tanstack/react-query'
import { useText } from '@/hooks/useText'
import { filterWords, fetchDefinition } from '@/lib/utils'
import { CreateWordPayload } from '@/lib/validators/word'
import WordTooltip from '@/components/WordTooltip'
import ReaderActions from './ReaderActions'
import { Balancer } from 'react-wrap-balancer'

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
  const { text, title } = useText()
  console.log(title)
  const words = filterWords(text)

  const definitions = useQueries({
    queries: (words ?? []).map((word) => {
      return {
        queryKey: ['words', word],
        queryFn: () => fetchDefinition(word),
        staleTime: Infinity,
      }
    }),
  })

  // TODO utility function
  const mappedDefinitions = definitions.map((def) => ({
    data: {
      wordWise: {
        word: def.data?.wordWise?.word || '',
        fullDefinition: def.data?.wordWise?.fullDefinition || '',
        shortDefinition: def.data?.wordWise?.shortDefinition || '',
        favorite: false, // might need to adjust this based on the logic
      },
    },
  }))

  console.log('definitions are', definitions)

  // TODO error handling
  const { mutate: addWord } = useMutation({
    mutationFn: async ({
      word,
      definition,
      shortDefinition,
      favorite,
    }: CreateWordPayload) => {
      const payload: CreateWordPayload = {
        word: word,
        definition: definition,
        shortDefinition: shortDefinition,
        favorite: favorite,
      }

      const { data } = await axios.post('/api/word/add', payload)
      return data as string
    },
  })

  console.log('defintions are', definitions)
  console.log('mapped definitions are', mappedDefinitions)

  return (
    <div className='max-w-4xl mx-auto space-y-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-irvin'>
        {title}
      </h1>
      {text && (
        <div className=' tracking-normal [&:not(:first-child)]:mt-6 font-acaslonpro text-2xl'>
          <Balancer>
            {/* <div className='text-4xl font-acaslonpro'> */}
            {text.split(' ').map((word, index) => {
              const definition = mappedDefinitions.find(
                (def) => def?.data?.wordWise?.word === word
              )

              const { wordWise } = definition?.data || {}
              const fullDefinition = wordWise?.fullDefinition ?? ''
              const shortDefinition = wordWise?.shortDefinition ?? ''

              const hasDefinition = !!definition

              return (
                <React.Fragment key={word}>
                  {hasDefinition ? (
                    <WordTooltip
                      word={word}
                      definition={shortDefinition}
                      onAddWord={() =>
                        addWord({
                          word: word,
                          definition: fullDefinition,
                          shortDefinition: shortDefinition,
                          favorite: false,
                        })
                      }
                    />
                  ) : (
                    <span>{word} </span>
                  )}{' '}
                </React.Fragment>
              )
            })}
          </Balancer>
        </div>
      )}
      <ReaderActions
        readerText={text}
        title={title}
        definitions={mappedDefinitions}
      />
    </div>
  )
}

export default Reader
