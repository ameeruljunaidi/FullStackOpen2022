const favoriteBlog = require('../utils/list_helper').favoriteBlog
const { listWithOneBlog, listWithManyBlogs } = require('./test_data')

describe('Favorite blog', () => {
    test('of empty list is undefined', () => {
        const result = favoriteBlog([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog, equals the blog', () => {
        const result = favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of a bigger list is right', () => {
        const result = favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
})
