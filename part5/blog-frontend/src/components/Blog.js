const Blog = ({ blog, handleDeleteBlog }) => (
    <>
        <div className='inline'>
            {blog.title} {blog.author}
            <button onClick={handleDeleteBlog}>delete</button>
        </div>
        <br></br>
    </>
)

export default Blog
