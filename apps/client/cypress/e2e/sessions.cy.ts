import { activitiesMock, sessionsMock } from '../../src/mocks/mocks'

describe('sessions list', () => {
  it.skip('should show the list of sessions', () => {
    cy.visit('http://localhost:8080')
    cy.intercept('http://localhost:5000/v1/activities', activitiesMock).as('activities')
    cy.intercept('http://localhost:5000/v1/sessions?month=6&year=2022', sessionsMock).as('sessions')

    cy.contains('sessions').click()
    cy.wait('@activities')
    cy.wait('@sessions')

    cy.get('[data-cy="session-log-list"]').as('session-list')
    cy.get('@session-list').children().should('have.length', 4)
    cy.get('@session-list').contains('skateboard')
    cy.get('@session-list').contains('surf')
  })
})

export {}
