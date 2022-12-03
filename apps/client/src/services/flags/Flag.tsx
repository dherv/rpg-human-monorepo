import { FC, ReactElement } from 'react'
import { useFlags } from './useFlags'

type Props = {
  features: string[]
  renderOn?: () => ReactElement
  renderOff?: () => ReactElement
  children?: ReactElement
}
export const Flag: FC<Props> = ({ children, features, renderOn, renderOff }) => {
  const context = useFlags()
  const flags = context?.flags

  if (!flags) {
    return null
  }

  const shouldShowFeature = flags.find((flag) => features.includes(flag.name) && flag.active)

  if (shouldShowFeature) {
    if (renderOn) {
      return renderOn()
    }
    if (children) {
      return children
    }
    return null
  } else {
    if (renderOff) {
      return renderOff()
    }
    return null
  }
}
