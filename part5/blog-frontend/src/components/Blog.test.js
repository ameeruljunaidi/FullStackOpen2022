import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog\'s title and author, but does not render its url or number of likes by default', () => {
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

    const user = {
        token: 'test-token',
        username: 'test-username',
        name: 'test-name'
    }

    const { container } = render(<Blog blog={blog} user={user}/> )
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('this is a test title')
    expect(div).not.toHaveTextContent('https://test-url.com')
    expect(div).not.toHaveTextContent('likes')
})