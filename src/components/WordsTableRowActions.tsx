import React from 'react'
import { Row } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type Word = {
  id: string
  word: string
  definition: string
  favorite: boolean
}

interface WordsTableRowActionsProps {
  row: Row<Word>
}

export function WordsTableRowActions<TData, Word>({
  row,
}: WordsTableRowActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  // TODO error handling
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async (wordId: string) => {
      const payload = {
        wordId,
      }

      await axios.patch('/api/word/favorite', payload)

      // TODO optimistic updates
      router.refresh()
    },
    onSuccess: () => {
      toast({
        title: 'Sucess!',
        description: 'Favorite was toggled!',
        variant: 'default',
      })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <Icons.moreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {/* TODO onClick handlers for edit and delete */}
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toggleFavorite(row.original.id)}>
          Favorite
        </DropdownMenuItem>
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
