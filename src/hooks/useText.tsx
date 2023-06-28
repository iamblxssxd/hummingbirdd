import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Text {
  title?: string;
  text: string;
  updateText: (text: string, title: string) => void;
}

export const useText = create<Text>()(
  persist(
    (set) => ({
      title: "",
      text: "",
      updateText: (text, title) => set({ text: text, title: title }),
    }),
    { name: "text" },
  ),
);
