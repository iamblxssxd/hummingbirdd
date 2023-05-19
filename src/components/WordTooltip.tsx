'use client'

import { FC, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'

interface WordTooltipProps {
  word: string
  definition: string
  onAddWord: () => void
}

const WordTooltip: FC<WordTooltipProps> = ({ word, definition, onAddWord }) => {
  // TODO check if the user has a word saved
  const [isWordAdded, setIsWordAdded] = useState<boolean>(false)

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className='text-green-600 dark:text-pink-300'>
          {word}{' '}
        </TooltipTrigger>
        <TooltipContent className='text-2xl font-inter flex gap-1 items-center justify-center'>
          <p className='pr-2'>{definition}</p>
          <Button
            onClick={onAddWord}
            variant='secondary'
            size='sm'
            className='p-1'>
            <Icons.add
              className={`h-6 w-6 rotate-${isWordAdded ? '0' : '45'} scale-${
                isWordAdded ? '100' : '0'
              } transition-all`}
            />
            <Icons.remove
              className={`absolute h-6 w-6 rotate-${
                isWordAdded ? '-45' : '0'
              } scale-${isWordAdded ? '0' : '100'} transition-all`}
            />
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default WordTooltip
