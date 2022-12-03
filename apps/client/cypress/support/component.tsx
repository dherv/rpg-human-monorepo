/// <reference types="cypress" />
import './component.d'
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import '@fontsource/public-sans'
import { CssVarsProvider } from '@mui/joy/styles'
import { mount } from 'cypress/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../src/app/store'

import '../../src/index.css'

// import React from 'react'
import { worker } from '../../src/mocks/browser'
import { theme } from '../../src/services/material.themes'
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       /**
//        * Mounts a React node
//        * @param component React Node to mount
//        * @param options Additional options to pass into mount
//        */
//       mount(
//         component: React.ReactNode,
//         options?: MountOptions & { reduxStore?: EnhancedStore<RootState> },
//       ): Cypress.Chainable<MountReturn>
//     }
//   }
// }

global.process = global.process || {}
global.process.env = global.process.env || {}

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

Cypress.Commands.add('mount', (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = store, ...mountOptions } = options

  const wrapped = (
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <Provider store={reduxStore}>
          <div style={{ padding: '1rem' }}>{component}</div>
        </Provider>
      </CssVarsProvider>
    </BrowserRouter>
  )

  return mount(wrapped, mountOptions)
})

// Example use:
// cy.mount(<MyComponent />)
