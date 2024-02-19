describe('글쓰기 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.intercept('POST', '**/auth/v1/token?grant_type=password').as('authRequest');
    cy.get('input[type="text"]').type(`${Cypress.env('ADMIN_ID')}`);
    cy.get('input[type="password"]').type(`${Cypress.env('ADMIN_PASSWORD')}`);
    cy.get('button[type="submit"]').click();
    cy.wait('@authRequest');
    cy.get('[data-cy="write"]').click();
    cy.url().should('include', '/write');
  });

  it('글 작성', () => {
    cy.get('input[placeholder="제목"]').type('테스트 글 제목');
    cy.get('input#category').type('Test{enter}');
    cy.get('textarea').type('# 테스트 글 내용');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/posts/');
  });

  afterEach(() => {
    cy.clearAllCookies();
  });
});
