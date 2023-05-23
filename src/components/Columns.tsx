'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Word = {
  id: string
  word: string
  definition: string
  favorite: boolean
}

export const columns: ColumnDef<Word>[] = [
  {
    accessorKey: 'word',
    header: 'Word',
  },
  {
    accessorKey: 'definition',
    header: 'Definition',
  },
  {
    accessorKey: 'Favorite',
    header: 'Favorite',
  },
]
