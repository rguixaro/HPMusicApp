import { normalizeClass } from 'vue'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to merge Tailwind CSS classes.
 * @param inputs
 */
export function cn(...inputs: Parameters<typeof normalizeClass>) {
  return twMerge(normalizeClass(inputs))
}

type ClassDictionary = Record<string, any>
type ClassArray = ClassValue[]
type ClassValue = ClassArray | ClassDictionary | string | number | boolean | null | undefined

declare module 'vue' {
  function normalizeClass(...inputs: ClassValue[]): string
}
