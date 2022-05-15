// eslint-disable-next-line no-unused-vars
const dummy = (_) => 1

const totalLikes = (blogs) =>
    blogs.length === 0
        ? 0
        : blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.length === 0
        ? undefined
        : blogs.reduce((max, current) => current.likes > max.likes ? current : max, {likes: 0})

    if (!maxLikes) return undefined

    return {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}