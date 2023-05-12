import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Text {
  text: string
  updateText: (text: string) => void
}

export const useText = create<Text>()(
  persist(
    (set) => ({
      text: '',
      updateText: (text) => set({ text: text }),
    }),
    { name: 'text' }
  )
)
