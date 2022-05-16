const totalLikes = require('../utils/list_helper').totalLikes
const { listWithOneBlog, listWithManyBlogs } = require('./test_data')


describe('Total likes', () => {
    test('of empty list is zero', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(listWithManyBlogs)
        expect(result).toBe(36)
    })
})