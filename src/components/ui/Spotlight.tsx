"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useMousePosition } from "@/hooks/useMousePosition"

type SpotlightProps = {
  children: React.ReactNode
  className?: string
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([])

  useEffect(() => {
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map((el) => el as HTMLElement)
      )
  }, [])

  useEffect(() => {
    initContainer()
    window.addEventListener("resize", initContainer)

    return () => {
      window.removeEventListener("resize", initContainer)
    }
  }, [boxes])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition])

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth
      containerSize.current.h = containerRef.current.offsetHeight
    }
  }

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const { w, h } = containerSize.current
      const x = mousePosition.x - rect.left
      const y = mousePosition.y - rect.top
      const inside = x < w && x > 0 && y < h && y > 0
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
        boxes.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y
          box.style.setProperty("--mouse-x", `${boxX}px`)
          box.style.setProperty("--mouse-y", `${boxY}px`)
        })
      }
    }
  }

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  )
}

type SpotlightCardProps = {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "after:bg-gradient-conic-tr-tl relative h-full overflow-hidden rounded-md bg-transparent p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-foreground before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-96 after:w-96 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:opacity-0 after:blur-[100px] after:transition-opacity after:duration-500 after:hover:opacity-60 before:group-hover:opacity-100 dark:before:bg-foreground dark:after:hover:opacity-40",
        className
      )}
    >
      {children}
    </div>
  )
}
