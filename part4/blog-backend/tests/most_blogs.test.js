const mostBlogs = require('../utils/list_helper').mostBlogs
const { listWithOneBlog, listWithManyBlogs } = require('./test_data')

describe('Most active blogger', () => {
    test('of empty list is undefined', () => {
        const result = mostBlogs([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog with one author, equals the author', () => {
        const result = mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })

    test('of a bigger list is right', () => {
        const result = mostBlogs(listWithManyBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})
