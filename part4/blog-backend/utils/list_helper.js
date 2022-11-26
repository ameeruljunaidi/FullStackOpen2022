const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (_) => 1;

const totalLikes = (blogs) =>
    blogs.length === 0
        ? 0
        : blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined;

    const maxLikes = blogs.reduce(
        (max, current) => (current.likes > max.likes ? current : max),
        { likes: 0 }
    );

    return {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes,
    };
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined;

    const groupedByAuthor = Object.entries(_.countBy(blogs, "author")).map(
        ([author, count]) => ({
            author: author,
            blogs: count,
        })
    );

    return groupedByAuthor.reduce(
        (max, current) => {
            return current.blogs > max.blogs ? current : max;
        },
        { blogs: 0 }
    );
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined;

    const groupedByAuthor = _(blogs)
        .groupBy("author")
        .map((blog, author) => ({
            author: author,
            likes: _.sumBy(blog, "likes"),
        }));

    return groupedByAuthor.reduce(
        (max, current) => {
            return current.likes > max.likes ? current : max;
        },
        { likes: 0 }
    );
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
