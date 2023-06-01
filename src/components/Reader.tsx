'use client'

import React from 'react'
import { FC } from 'react'
import axios from 'axios'
import { useMutation, useQueries } from '@tanstack/react-query'
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
      }
    }),
  })

  // TODO error handling
  const { mutate: addWord } = useMutation({
    mutationFn: async (word: CreateWordPayload) => {
      const payload = {
        word: word.word,
        definition: word.definition,
        shortDefinition: word.shortDefinition,
        favorite: word.favorite,
      }

      const { data } = await axios.post('/api/word/add', payload)
      return data as string
    },
  })

  // console.log('defintions are', definitions)

  return (
    <div className='max-w-4xl mx-auto space-y-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-irvin'>
        {title}
      </h1>
      {text && (
        <p className=' tracking-normal [&:not(:first-child)]:mt-6 font-acaslonpro text-2xl'>
          <Balancer>
            {/* <div className='text-4xl font-acaslonpro'> */}
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
                      onAddWord={() =>
                        addWord({
                          word: word,
                          definition: definition.data.wordWise.fullDefinition,
                          shortDefinition:
                            definition.data.wordWise.shortDefinition,
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
        </p>
        // </div>
      )}
      <ReaderActions readerText={text} title={title} />
    </div>
  )
}

export default Reader
