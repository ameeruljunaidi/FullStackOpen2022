import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import mockAxios from 'axios'
import userService from '../services/user'
import blogService from '../services/blogs'

jest.mock('axios')

describe('Testing blog component', () => {
    const blog = {
        title: 'this is a test title',
        author: 'this is a test author',
        url: 'https://test-url.com',
        likes: 23,
        user: {
            username: 'test-username',
            name: 'test-name',
            id: 'test-id'
        }
    }

    const getAllBlogResponse = {
        data: [ blog ]
    }

    const user = {
        token: 'test-token',
        username: 'test-username',
        name: 'test-name'
    }

    const getUserResponse = {
        data: {
            username: 'test-username',
            name: 'test-name',
            id: 'test-id'
        }
    }

    let container = null

    beforeEach(() => {
        container = document.createElement('div')
        container.setAttribute('id', 'root')
        document.body.appendChild(container)
    })

    afterEach(() => {
        jest.clearAllMocks()
        container.remove()
        container = null
    })

    mockAxios.get.mockImplementation(url => {
        switch (url) {
        case `${userService.baseUrl}/${blog.user.id}`:
            return Promise.resolve(getUserResponse)
        case `${blogService.baseUrl}`:
            return Promise.resolve(getAllBlogResponse)
        case `${blogService.baseUrl}/${blog.id}`:
            return Promise.resolve({ data: blog })
        default:
            return Promise.reject(new Error('not found'))
        }
    })

    test('renders blog\'s title and author, but does not render its url or number of likes by default', async () => {
        await act(async () => {
            const root = createRoot(document.getElementById('root'))
            root.render(<Blog blog={blog} user={user} />)
        })

        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent('this is a test title')
        expect(div).not.toHaveTextContent('https://test-url.com')
        expect(div).not.toHaveTextContent('likes')
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    test('clicking view will show the blog\'s url and number of likes', async () => {
        await act(async () => {
            const root = createRoot(document.getElementById('root'))
            root.render(<Blog blog={blog} user={user} />)
        })

        const userForEvent = userEvent.setup()
        const button = screen.getByText('view')
        await userForEvent.click(button)

        const div = container.querySelector('.blog')

        expect(div).toHaveTextContent('https://test-url.com')
        expect(div).toHaveTextContent('likes')
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })
})