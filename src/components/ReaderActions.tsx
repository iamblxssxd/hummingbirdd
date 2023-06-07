'use client'

import { useCustomToast } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useText } from '@/hooks/useText'
import { CreateTextPayload } from '@/lib/validators/text'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'

interface ReaderActionsProps {
  readerText: string
  title: string
  definitions: {
    data: {
      wordWise: {
        word: string
        fullDefinition: string
        shortDefinition: string
        favorite: boolean
      }
    }
  }[]
}

const ReaderActions: FC<ReaderActionsProps> = ({
  readerText,
  title,
  definitions,
}) => {
  const { loginToast } = useCustomToast()

  const { mutate: submitText, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTextPayload = {
        title: title,
        text: readerText,
        wordDefinitions: definitions
          .filter((definition) => definition.data?.wordWise !== null)
          .map((definition) => {
            const wordWiseData = definition.data.wordWise
            return {
              word: wordWiseData.word,
              definition: wordWiseData.fullDefinition,
              shortDefinition: wordWiseData.shortDefinition,
              favorite: false,
            }
          }),
      }

      console.log(definitions)
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
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Text has been saved.',
        variant: 'default',
      })
    },
  })

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex-1 text-sm text-muted-foreground'>
        {title ? (
          title
        ) : (
          <Button className='h-8' variant='ghost'>
            <span className='sr-only'>Add title</span>
            Add title
          </Button>
        )}
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'></div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' className='h-8'>
            <span className='sr-only'>Go to previous word</span>
            <Icons.leftArrow className='h-4 w-4' />
            Previous word
          </Button>
          <Button variant='outline' className='h-8'>
            <span className='sr-only'>Go to next word</span>
            Next word
            <Icons.rightArrow className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0 lg:flex'
            disabled={isLoading}
            onClick={() => submitText()}>
            <span className='sr-only'>Save text</span>
            {isLoading ? (
              <Icons.spinner className='h-4 w-4 animate-spin' />
            ) : (
              <Icons.bookmark className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReaderActions
