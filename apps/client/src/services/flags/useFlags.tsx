import { useContext } from 'react'
import { FlagsContext } from './FlagsProvider'

export function useFlags() {
  const context = useContext(FlagsContext)
  if (context === undefined) {
    throw new Error('useFlags must be used within a FlagsProvider')
  }
  return context
}
