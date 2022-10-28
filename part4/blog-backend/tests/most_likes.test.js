const mostLikes = require('../utils/list_helper').mostLikes
const { listWithOneBlog, listWithManyBlogs } = require('./test_data')

describe('Most active blogger', () => {
    test('of empty list is undefined', () => {
        const result = mostLikes([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog with one author, equals the author', () => {
        const result = mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of a bigger list is right', () => {
        const result = mostLikes(listWithManyBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})
