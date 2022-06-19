/// <reference types="cypress-xpath" />

describe('Start here', () => {

  beforeEach(() => {
    cy.login(Cypress.env('AUTH_USERNAME'), Cypress.env('AUTH_PASSWORD'))
  });

  it('go to showroom page', () => {
    cy.visit('/CYPRESS/showroom/');
    cy.get('[class^=Headersc__StyledHeaderTitle-sc]').should('contain', 'The Digital Showroom');
  });
  
  it('filtering all presentation', () => {
    cy.get('[data-testid="presentationDropdownListFilters"] > :nth-child(1)').click();
    cy.xpath("(//button[@type='button'][normalize-space()='All'])[1]").click();
  });

  it('filtering presentation name and verify response', () => {
    cy.get('[class^=AnimatedInputsc__StyledIconButton-sc]').click();
    cy.get('[data-testid="catalogSearchInput"]').type('bot');
    cy.intercept('POST', '/v9/presentation').as('presentationList');
    cy.wait('@presentationList').its('response.body.data.presentations.list.length').as('responseLength');
    cy.get('@responseLength').then((length) => {
      cy.get('[data-testid="presentationList"] > div').its('length').should('eq', length);
    });
  });

})