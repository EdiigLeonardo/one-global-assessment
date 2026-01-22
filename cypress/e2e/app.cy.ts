describe('App Smoke Test', () => {
  it('should navigate to the home page', () => {
    cy.visit('/')
    cy.get('h1').should('exist')
  })
})
