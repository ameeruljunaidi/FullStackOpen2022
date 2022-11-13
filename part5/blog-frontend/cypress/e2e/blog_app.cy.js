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
            cy.addBlog(blog)

            cy.get('.success')
                .should('contain', `Successfully added ${blog.title} by ${blog.author}`)
                .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.contains(blog.title)
            cy.contains(blog.author)
            cy.contains('view')
        })

        describe('When there is a blog', () => {
            beforeEach(() => {
                cy.addBlog(blog)
                cy.contains('view').click()
            })
            it('Users can like a blog', () => {
                cy.contains('like').click()
                cy.contains('1 likes')
            })

            it('User can delete a blog', () => {
                cy.contains('delete blog').click()
                cy.get('.success')
                    .should('contain', 'Deletion successful')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')
            })

            it('Another user cannot delete a blog', () => {
                cy.contains('log out').click()

                cy.addUser({ name: 'test-name-2', username: 'test-username-2', password: 'test-password-2' })
                cy.get('#username-input').type('test-username-2')
                cy.get('#password-input').type('test-password-2')
                cy.get('#login-button').click()

                cy.get('#view-toggle-button').click()
                cy.contains('delete blog').should('not.exist')
            })
        })

        describe('When there are blogs', () => {
            beforeEach(() => {
                const blogs = [
                    blog,
                    {
                        title: 'test-title-2',
                        author: 'test-author-2',
                        url: 'test-url-2'
                    }
                ]

                blogs.forEach(blog => {
                    cy.addBlog(blog)
                    cy.get('#view-toggle-button').click()
                })
            })

            it.only('Blogs would be sorted based on the number of likes', () => {
                cy.contains('test-title-2').parent().find('#like-button').as('likeButton')
                cy.get('@likeButton').click()
                cy.wait(1000)

                cy.get('.blog').eq(0).should('contain', 'test-title-2')
                cy.get('.blog').eq(1).should('contain', 'test-title')
            })
        })
    })
})