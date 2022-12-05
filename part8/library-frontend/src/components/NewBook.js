import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_BOOK } from '../mutations'
import { ALL_BOOKS } from '../queries'

const NewBook = props => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
        onError: error => console.error(error),
        onCompleted: data => console.log('Book added', data.addBook),
    })

    if (!props.show) return null
    if (loading) return <div>Adding book...</div>
    if (error) return <div>Error! {error.message}</div>

    const submit = async event => {
        event.preventDefault()

        createBook({ variables: { title, author, genres, published } })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres => genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author
                    <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    published
                    <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
                </div>
                <div>
                    <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                    <button onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook
