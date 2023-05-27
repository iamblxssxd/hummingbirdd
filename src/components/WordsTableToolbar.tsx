'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface WordsTableToolbarProps<TData> {
  table: Table<TData>
}

export function WordsTableToolbar<TData>({
  table,
}: WordsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // console.log('table', table)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search words...'
          value={(table.getColumn('word')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('word')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
