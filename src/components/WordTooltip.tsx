import { FC } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { Button } from '@/components/ui/Button'

interface WordTooltipProps {
  word: string
  definition: string
}

const WordTooltip: FC<WordTooltipProps> = ({ word, definition }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='text-pink-300'>{word}</TooltipTrigger>
        <TooltipContent className='text-2xl'>
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default WordTooltip
