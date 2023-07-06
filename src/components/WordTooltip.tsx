'use client'

import { FC, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { usePrevious } from '@mantine/hooks'

interface WordTooltipProps {
  word: string
  definition: string | undefined
}

const WordTooltip: FC<WordTooltipProps> = ({ word, definition }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className='text-green-600 dark:text-pink-300'>
          {word}{' '}
        </TooltipTrigger>
        <TooltipContent className='flex gap-1 items-center justify-center'>
          {/* TODO add a button for adding a word to the user's list of words */}
          <p className='leading-7 font-inter text-lg'>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default WordTooltip
