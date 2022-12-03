import { format } from 'date-fns'
import { SessionLogsPage } from '../../src/components/pages/SessionLogsPage'

const today = format(new Date(), 'MM/dd/yyyy')
const currentMonth = format(Date.now(), 'MMMM')
const currentYear = format(Date.now(), 'yyyy')

describe('SessionLogsPage.cy.ts', () => {
  beforeEach(() => {
    cy.mount(<SessionLogsPage />)
    cy.findByText('Filters').click()
    cy.get('[data-cy="session-log"]').as('logs')
  })

  it('should open filters with default values', () => {
    cy.findByText(currentMonth).should('exist')
    cy.findByText(currentYear).should('exist')
  })

  it('should display the logs for default month and year', () => {
    cy.get('@logs').eq(0).contains('skateboard')
    cy.get('@logs').eq(0).contains(today)
    cy.get('@logs').eq(1).contains('surf')
    cy.get('@logs').eq(1).contains(today)
  })

  it('should filter by month', () => {
    cy.get('#month-button').as('month').click()
    cy.findByRole('option', { name: 'March' }).click()

    cy.get('[data-cy="session-log"]').as('logs')
    cy.get('@logs').eq(0).contains('surf')
    cy.get('@logs').eq(0).contains('03/02/2022')
    cy.get('@logs').eq(1).contains('skateboard')
    cy.get('@logs').eq(1).contains('03/02/2022')
  })

  // TODO: add mock and update test to filter data by year
  it('should filter by year', () => {
    cy.get('#year-button').as('year').click()
    cy.findByRole('option', { name: '2021' }).click()

    cy.get('[data-cy="session-log"]').should('have.length', 0)
  })

  it('should filter by activity', () => {
    cy.get('#activity-button').as('activity').click()
    cy.findByRole('option', { name: 'surf' }).click()

    cy.get('#month-button').as('month').click()
    cy.findByRole('option', { name: 'all' }).click()

    cy.get('[data-cy="session-log"]').as('logs')
    cy.get('@logs').eq(0).contains('surf')
    cy.get('@logs').eq(0).contains('03/02/2022')
    cy.get('@logs').eq(1).contains('surf')
    cy.get('@logs').eq(1).contains(today)
  })

  // TODO: add mock and test for filter by month/year/activity set
})
