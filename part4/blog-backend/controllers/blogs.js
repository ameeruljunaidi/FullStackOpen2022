const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });

    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
    const blogFound = await Blog.findById(request.params.id).populate("user", {
        username: 1,
        name: 1,
    });

    if (blogFound) response.json(blogFound);
    else response.status(404).end();
});

blogsRouter.post("/", userExtractor, async (request, response) => {
    const body = request.body;
    const user = request.user;

    const blog = user
        ? new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
            user: user,
        })
        : new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
        });

    const result = await blog.save();

    if (user) {
        const blogs = user.blogs.concat(blog._id);
        await User.findByIdAndUpdate(user._id, { blogs: blogs });
    }

    response.status(201).json(result);
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user,
    };

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    if (result) response.status(200).json(result);
    else response.status(404).end();
});

blogsRouter.delete("/", async (request, response) => {
    await Blog.deleteMany({});
    await User.updateMany({}, { blogs: [] });

    response.status(200).end();
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
        return response.status(404).end();
    }

    const user = await User.findById(blog.user);

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(400).end();
    }

    const blogs = user.blogs
        .map((blog) => blog.toString())
        .filter((blog) => blog !== request.params.id);

    const removeBlog = await Blog.findByIdAndRemove(request.params.id);
    const updateUser = await User.findByIdAndUpdate(blog.user, {
        blogs: blogs,
    });

    if (!(removeBlog && updateUser)) response.status(404).end();
    else response.status(200).end();
});

module.exports = blogsRouter;
