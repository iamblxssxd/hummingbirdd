'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Icons } from '@/components/Icons'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Checkbox } from '@/components/ui/Checkbox'

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
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'word',
    header: 'Word',
    // TODO filter words
  },
  {
    accessorKey: 'definition',
    header: 'Definition',
  },
  {
    accessorKey: 'favorite',
    header: 'Favorite',
    // TODO handle favorite logic
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      console.log(row)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <Icons.moreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {/* TODO onClick handlers */}
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
