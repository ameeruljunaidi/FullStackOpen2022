import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { EDIT_BORN } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const Authors = props => {
    const [selectedAuthor, setSelectedAuthor] = useState(null)
    const [born, setBorn] = useState('')

    const allAuthors = useQuery(ALL_AUTHORS)
    const [setBornTo, editBorn] = useMutation(EDIT_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: error => console.error(error),
        onCompleted: data => console.log('Author updated ', data),
    })

    if (!props.show) return null
    if (allAuthors.loading || editBorn.loading) return <div>Loading...</div>
    if (allAuthors.error) return <div>Error! {allAuthors.error.message}</div>
    if (editBorn.error) return <div>Error! {editBorn.error.message}</div>

    const authors = allAuthors.data.allAuthors
    const authorOptions = authors.map(author => ({ value: author.name, label: author.name }))

    const submit = () => {
        setBornTo({ variables: { name: selectedAuthor.value, setBornTo: parseInt(born) } })
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map(a => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <Select defaultValue={selectedAuthor} onChange={setSelectedAuthor} options={authorOptions} />
                <div>
                    born
                    <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default Authors
