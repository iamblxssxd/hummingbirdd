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
}

const ReaderActions: FC<ReaderActionsProps> = ({ readerText }) => {
  const { loginToast } = useCustomToast()

  const { mutate: submitText, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateTextPayload = {
        text: readerText,
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
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Text has been saved.',
        variant: 'default',
      })
    },
  })

  return (
    <div className='pt-20'>
      <Button
        isLoading={isLoading}
        onClick={() => submitText()}
        variant='outline'
        className=''>
        <Icons.bookmark />
      </Button>
    </div>
  )
}

export default ReaderActions
