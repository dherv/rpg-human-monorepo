import { activitiesMock, sessionsMock } from '../../src/mocks/mocks'

describe('sessions list', () => {
  it('should show the list of sessions', () => {
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

  it('should add a session to the list of sessions', () => {
    cy.visit('http://localhost:8080')
    cy.intercept('http://localhost:5000/v1/activities', activitiesMock).as('activities')
    cy.intercept('http://localhost:5000/v1/activities/2', activitiesMock[1]).as('activities')
    cy.intercept('http://localhost:5000/v1/sessions?month=6&year=2022', sessionsMock).as('sessions')

    cy.contains('sessions').click()
    cy.wait('@activities')
    cy.wait('@sessions')
    cy.get('[data-cy="session-add"]').click()
    cy.contains('surf').click()

    cy.get('[name="date"]').type('07/01/2022')
    cy.get('[name="note"]').type('note')
    cy.get('[name="improvement"]').type('improvement')
    cy.get('[name="proud"]').type('proud')

    cy.get('button').click()
  })
})

export {}
