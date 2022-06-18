/// <reference types="cypress-xpath" />

describe('Start here', () => {
  beforeEach(() => {
    cy.login(Cypress.env('AUTH_USERNAME'), Cypress.env('AUTH_PASSWORD'));
  });

  it('go to showroom page', () => {
    cy.visit('/CYPRESS/showroom/');
    cy.get('[class^=Headersc__StyledHeaderTitle-sc]').should('contain', 'The Digital Showroom');
  });
  
  it('open create new presentation form', () => {
    cy.get('[data-testid="createNewPresentation"]').click();
    cy.get('[class^=Headersc__StyledHeaderTitle-sc]').should('contain', 'Create Presentation');
  });

  it('try create an empty presentation', () => {
    cy.get('[data-testid="icon-ArrowRight"]').click()
    cy.get('[for="presentationName"] > [class^=Textsc__StyledText-sc]').should('contain', 'Required');
  });

  it('filling presentation name', () => {
    const date = new Date();
    const time = date.toISOString();
    cy.get('#presentationName').invoke('attr', 'placeholder').should('contain', 'Type presentation name');
    cy.get('#presentationName').clear().type('My new Presentation ' + time);
    cy.get('#welcomeMessage').invoke('attr', 'placeholder').should('contain', 'Optional');
    cy.get('#welcomeMessage').clear().type('Welcome to MariLulu Collection');
    cy.get('[class^=CheckboxInputsc__StyledCheckboxLabel-sc]').click();
    cy.get('[data-testid="icon-Checkmark"]').should('not.exist');
    cy.get('[class^=CheckboxInputsc__StyledCheckboxLabel-sc]').click();
    cy.get('[data-testid="icon-Checkmark"]').should('exist');
  });

  it('filling presentation based on', () => {
    cy.get('[for="based-on-catalog"]').click();
  });

  it('filling products and assets catalog', () => {
    cy.get('[class^=PresentationFormCatalogSelectorsc__StyledBrandCatalogDropdown-sc] > :nth-child(3)').should('contain', 'Required');
    cy.get('[data-testid="presentationFormDropdowns"] > :nth-child(4)').should('contain', 'Required');
    cy.get('[data-testid="presentationFormDropdowns"] > :nth-child(7)').should('contain', 'Required');
    cy.get('[data-testid="presentationFormDropdowns"] > div > [data-testid="dropdown-menu"]').click();
    cy.xpath("//button[normalize-space()='Cypress 1976 Catalog']").click();
    cy.get('[data-testid="presentationFormDropdowns"] > [data-testid="dropdown-menu"]').first().click();
    cy.xpath("//button[normalize-space()='Division 3650']").click();
    cy.get('[data-testid="presentationFormDropdowns"] > [data-testid="dropdown-menu"]').eq(1).click();
    cy.xpath("//button[normalize-space()='Ss 2025 570']").click();
  });

  it('filling customer', () => {
    cy.get('[class^=CustomerSearchBoxsc__StyledCustomerSearchBoxTop-sc] > :nth-child(3)').should('contain', 'Required');
    cy.get('#search').type('lake');
    cy.get('[data-testid="customerSearchBoxList"] > div > div:nth-child(1)').should('exist').click();
  });

  it('submit the new presentation', () => {
    cy.get('[data-testid="icon-ArrowRight"]').click();
  });

  it('verify if presentation is created', () => {
    cy.get('[data-testid="presentationMenuButton"]').should('exist').click();
    cy.xpath("//button[normalize-space()='Exit Presentation']").should('exist').click();
    cy.get('[class^=Headersc__StyledHeaderTitle-sc]').should('contain', 'The Digital Showroom');
    cy.get('[class^=PresentationsTablesc__StyledInfiniteScroll-sc]').should('contain', 'My new Presentation');
  });

});