describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.addUser({ name: 'test-name', username: 'test-username', password: 'test-password' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', () => {
        cy.contains('blogs')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        cy.contains('log in to view blogs')
    })

    describe('Login', () => {
        it('succeeds with the correct credentials', () => {
            cy.get('#username-input').type('test-username')
            cy.get('#password-input').type('test-password')
            cy.get('#login-button').click()
            cy.get('.success')
                .should('contain', 'Successfully logged in')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('fails with the wrong password', () => {
            cy.get('#username-input').type('test-username')
            cy.get('#password-input').type('wrong-password')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    // describe('when logged in', () => {
    //     beforeEach(() => {
    //         cy.get('#username-input').type('initial-username')
    //         cy.get('#password-input').type('this-is-a-password')
    //         cy.get('#login-button').click()
    //     })
    // })
})