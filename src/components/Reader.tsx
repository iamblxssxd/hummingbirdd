'use client'

import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import axios, { AxiosError } from 'axios'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useText } from '@/hooks/useText'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { filterWords, fetchDefinition } from '@/lib/utils'
import { CreateWordPayload } from '@/lib/validators/word'
import { CreateTextPayload } from '@/lib/validators/text'
import WordTooltip from '@/components/WordTooltip'
import ReaderActions from '@/components/ReaderActions'
import { Balancer } from 'react-wrap-balancer'
import { Text } from '@prisma/client'

interface ReaderProps {
  userText?: Text
}

// TODO refactor this component (split it into smaller components/hooks)
const Reader: FC<ReaderProps> = ({ userText }) => {
  const { text, title } = useText()
  // const [currentText, setCurrentText] = useState(userText?.content || text)
  // const [currentTitle, setCurrentTitle] = useState(userText?.title || title)

  const router = useRouter()
  const { loginToast } = useCustomToast()

  const currentText = userText?.content || text
  const currentTitle = userText?.title || title

  // TODO reduce the number of API calls by filtering out the words that are not in the db
  let words
  if (currentText !== undefined) {
    words = filterWords(currentText)
  }

  const definitions = useQueries({
    queries: (words ?? []).map((word) => {
      return {
        queryKey: ['definitions', word],
        queryFn: () => fetchDefinition(word),
        staleTime: Infinity,
      }
    }),
  })

  // convert to a map
  const mappedDefinitions = definitions.reduce((acc: any, def) => {
    const word = def.data?.wordWise?.word || ''
    const fullDefinition = def.data?.wordWise?.fullDefinition || ''
    const shortDefinition = def.data?.wordWise?.shortDefinition || ''

    // add more properties as needed
    acc[word] = {
      word: word,
      fullDefinition: fullDefinition,
      shortDefinition: shortDefinition,
    }

    return acc
  }, {})

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

  const { mutate: createText, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTextPayload = {
        text: currentText,
        title: currentTitle,
        wordDefinitions: mappedDefinitions,
      }

      const { data } = await axios.post('/api/text', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Text has been already added.',
            description: 'Please add a differente text.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid text length',
            description: 'Your text must have at least 3 characters',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: 'An error occured',
        description: 'Could not save text.',
        variant: 'destructive',
      })
    },
    // TODO fix redirect (should be /read/textId)
    onSuccess: (data) => {
      router.push(`/reader`)
    },
  })

  console.log('defintions are', definitions)
  console.log('mapped definitions are', mappedDefinitions)

  return (
    <div className='max-w-4xl mx-auto space-y-4 pt-16'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-irvin mb-4'>
        {currentTitle}
      </h1>
      {currentText && (
        <div className=' tracking-normal [&:not(:first-child)]:mt-6 font-acaslonpro text-2xl'>
          <Balancer>
            {/* <div className='text-4xl font-acaslonpro'> */}
            {currentText.split(' ').map((word, index) => {
              const definition = mappedDefinitions[word]

              if (definition) {
                const { fullDefinition, shortDefinition } = definition

                return (
                  <React.Fragment key={index}>
                    <WordTooltip
                      word={word}
                      definition={shortDefinition}
                      // onAddWord={() =>
                      //   addWord({
                      //     word: word,
                      //     definition: fullDefinition,
                      //     shortDefinition: shortDefinition,
                      //     favorite: false,
                      //   })
                      // }
                    />{' '}
                  </React.Fragment>
                )
              } else {
                return (
                  <React.Fragment key={index}>
                    <span>{word} </span>
                  </React.Fragment>
                )
              }
            })}
          </Balancer>
        </div>
      )}
      <ReaderActions
        readerText={currentText}
        title={currentTitle}
        definitions={mappedDefinitions}
      />
    </div>
  )
}

export default Reader
