import { createContext, FC } from 'react'
import { IFlag } from './IFlag'

export interface FlagsContextInterface {
  flags: IFlag[]
}

export const FlagsContext = createContext<FlagsContextInterface | null>(null)

export const FlagsProvider: FC<{ value: IFlag[] }> = ({ children, value: flags }) => {
  return <FlagsContext.Provider value={{ flags }}>{children}</FlagsContext.Provider>
}
