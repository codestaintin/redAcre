describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://airmalta.com/')
    Cypress.on('uncaught:exception', (error, runnable) => {
      return false;
    });
  });

  it('should assert change in URL', () => {
    cy.url().should('equal', 'https://airmalta.com/en');
  });

  it('should book the next available flight date', () => {
    cy.acceptCookie();
    cy.get('#flight-search-widget > div > div > form > div.topbar > div:nth-child(1) > div > i')
      .click();
    cy.get('#flight-search-widget > div > div > form > div.topbar > div:nth-child(1) > div.input-drop-container.select-option-container > div:nth-child(2)')
        .click();
    cy.get('#flight-search-widget > div > div > form > div.topbar > div:nth-child(2) > div > i')
        .click();
    cy.get('#flight-search-widget > div > div > form > div.topbar > div:nth-child(2) > div.input-drop-container.select-option-container > div.select-option.ellipsis.selected')
        .click();
    cy.get('#flight-search-widget > div > div > form > div.input-group > div.route-selection.input-group.col-lg-6.col-md-12 > div.route-selection-origin > div > div > div.ellipsis')
        .type('Vienna International')
    cy.get('.airport-option')
        .click();
    cy.get('#flight-search-widget > div > div > form > div.input-group > div.route-selection.input-group.col-lg-6.col-md-12 > div.route-selection-destination > div > div > div.ellipsis')
        .type('Malta International Airport');
    cy.get('#flight-search-widget > div > div > form > div.input-group > div.route-selection.input-group.col-lg-6.col-md-12 > div.route-selection-destination > div > div > div.mobile-container-content.p-sm-0 > div > div.airport-option')
        .click();
    cy.get('input[placeholder="dd/mm"]').click();
    cy.get('div.DayPicker-Day.DayPicker-Day--today')
        .click({ force: true });
    cy.get('.buttons > .d-none').contains('Find flights')
        .click();
    cy.wait(30000);
    cy.get('div').contains(/\d+\.\d+/).click();
    cy.get('button').contains('Continue to flights').click();
    cy.url().should('equal', 'https://book.airmalta.com/flights/oneway');
  });
})