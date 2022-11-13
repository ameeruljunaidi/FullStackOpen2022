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

    describe('When logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'test-username', password: 'test-password' })
        })

        const blog = {
            title: 'test-title',
            author: 'test-author',
            url: 'test-url'
        }

        it('A blog can be created', () => {
            cy.get('#new-blog-button').click()

            cy.get('#title-input').type(blog.title)
            cy.get('#author-input').type(blog.author)
            cy.get('#url-input').type(blog.url)

            cy.get('#create-blog-button').click()

            cy.get('.success')
                .should('contain', `Successfully added ${blog.title} by ${blog.author}`)
                .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.contains(blog.title)
            cy.contains(blog.author)
            cy.contains('view')
        })

        it('Users can like a blog', () => {
            cy.get('#new-blog-button').click()

            cy.get('#title-input').type(blog.title)
            cy.get('#author-input').type(blog.author)
            cy.get('#url-input').type(blog.url)

            cy.get('#create-blog-button').click()

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1 likes')
        })
    })
})