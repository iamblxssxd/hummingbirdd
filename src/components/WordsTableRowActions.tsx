import React, { useState } from 'react'
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { Switch } from './ui/Switch'
import { Separator } from './ui/Separator'

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
  const [word, setWord] = useState(row.original.word)
  const [definition, setDefinition] = useState(row.original.definition)
  const [favorite, setFavorite] = useState(row.original.favorite)
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
    // TODO extract to DropdownWidhDialogItems
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Icons.moreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DialogTrigger className='w-full'>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          {/* TODO onClick handlers for edit and delete */}
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
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Word</DialogTitle>
          <DialogDescription>
            Make changes to the saved word here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='word' className='text-right'>
              Word
            </Label>
            <Input
              id='word'
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='definition' className='text-right'>
              Definition
            </Label>
            <Input
              id='definition'
              value={definition}
              onChange={(e) => e.target.value}
              className='col-span-3'
            />
          </div>

          <Separator className='w-auto' />
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='favorite' className='text-right'>
              Favorite
            </Label>
            <Switch
              className='col-span-1'
              checked={favorite}
              onCheckedChange={() => setFavorite((prev) => !prev)}
            />
            <p className='text-sm text-muted-foreground col-span-2 text-right'>
              Favorite can be toggled later.
            </p>
          </div>
        </div>
        <DialogFooter>
          {/* TODO handleSubmit */}
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
