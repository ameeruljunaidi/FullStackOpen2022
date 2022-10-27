const Blog = ({ blog, handleDeleteBlog }) => (
    <>
        <div>
            <br></br>
        </div>
        <div className='inline'>
            {blog.title} {blog.author}
            <button onClick={handleDeleteBlog}>delete</button>
        </div>
    </>
)

export default Blog
