// eslint-disable-next-line no-unused-vars
const dummy = (_) => 1

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.reduce((total, blog) => total + blog.likes, 0)

module.exports = {
    dummy,
    totalLikes
}