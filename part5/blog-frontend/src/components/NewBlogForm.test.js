import React from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Testing new blog form', () => {
    let container = null
    const handleNewBlogMockHandler = jest.fn(e => e.preventDefault())

    beforeEach(async () => {
        container = document.createElement('div')
        container.setAttribute('id', 'root')
        document.body.appendChild(container)

        await act(async () => {
            const root = createRoot(document.getElementById('root'))
            root.render(<NewBlogForm handleNewBlog={handleNewBlogMockHandler} />)
        })
    })

    afterEach(() => {
        container.remove()
        container = null
    })

    test('form calls the event handler received as props with the right details when a new blog ic created', async () => {
        const user = userEvent.setup()

        const titleInput = container.querySelector('#title-input')
        const authorInput = container.querySelector('#author-input')
        const urlInput = container.querySelector('#url-input')

        await user.type(titleInput, 'this is a test title')
        await user.type(authorInput, 'this is a test author input')
        await user.type(urlInput, 'this is a test url input')

        const createButton = screen.getByText('create')
        await user.click(createButton)

        expect(handleNewBlogMockHandler.mock.calls).toHaveLength(1)
        expect(handleNewBlogMockHandler.mock.calls[0]).toContain('this is a test title')
        expect(handleNewBlogMockHandler.mock.calls[0]).toContain('this is a test author input')
        expect(handleNewBlogMockHandler.mock.calls[0]).toContain('this is a test url input')
    })
})