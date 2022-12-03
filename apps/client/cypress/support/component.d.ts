// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { EnhancedStore } from '@reduxjs/toolkit'
import { MountOptions, MountReturn } from 'cypress/react'
import { RootState } from '../../src/app/store'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & { reduxStore?: EnhancedStore<RootState> },
      ): Cypress.Chainable<MountReturn>
    }
  }
}
