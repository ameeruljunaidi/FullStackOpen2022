describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', () => {
        cy.contains('blogs')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        cy.contains('log in to view blogs')
    })

    // it('can log in the user', () => {
    //     cy.get('#username-input').type('initial-username')
    //     cy.get('#password-input').type('this-is-a-password')
    //     cy.get('#login-button').click()
    //     cy.contains('initial-name logged in')
    // })
    //
    // describe('when logged in', () => {
    //     beforeEach(() => {
    //         cy.get('#username-input').type('initial-username')
    //         cy.get('#password-input').type('this-is-a-password')
    //         cy.get('#login-button').click()
    //     })
    // })
})