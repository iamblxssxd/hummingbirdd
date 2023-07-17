"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

interface WordTooltipProps {
  isActive?: boolean
  word: string
  definition: string | undefined
  className?: string
}

const WordWithSideTip = ({
  children,
  isActive,
}: {
  children: React.ReactNode
  isActive?: boolean
}) => (
  <div className="relative inline-block">
    <span className="-mx-0.5 inline-block h-7 bg-yellow-200 px-0.5 dark:bg-yellow-700">
      {children}
    </span>
    <div
      className={cn(
        "absolute bottom-[1px] h-[2px] w-full translate-x-[-2px] rounded-lg bg-red-600 dark:bg-red-500",
        "transition-all group-hover:scale-100",
        isActive ? "scale-100" : "scale-0"
      )}
      style={{ width: `calc(100% + 4px)` }}
    ></div>
  </div>
)

const WordTooltip = ({ isActive, word, definition }: WordTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="group relative">
          <WordWithSideTip isActive={isActive}>{word}</WordWithSideTip>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={5}
          sticky="always"
          className="text-xl leading-7 text-primary-foreground"
        >
          {/* TODO add a button for adding a word to the user's list of words */}
          {definition}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default WordTooltip
