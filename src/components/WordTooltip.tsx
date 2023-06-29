"use client"

import { useEffect, useState, type FC } from "react"
import { usePrevious } from "@mantine/hooks"

import { Button } from "@/components/ui/Button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { Icons } from "@/components/Icons"

interface WordTooltipProps {
  word: string
  definition: string | undefined
}

const WordTooltip: FC<WordTooltipProps> = ({ word, definition }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className="text-green-600 dark:text-pink-300">
          {word}{" "}
        </TooltipTrigger>
        <TooltipContent className="flex items-center justify-center gap-1">
          {/* TODO add a button for adding a word to the user's list of words */}
          <p className="font-inter text-lg leading-7">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default WordTooltip
