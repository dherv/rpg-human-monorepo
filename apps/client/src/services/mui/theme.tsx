import { deepmerge } from '@mui/utils'
import { joyTheme } from './joyTheme'
import { muiTheme } from './muiTheme'

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
export const theme = deepmerge(muiTheme, joyTheme)
