import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if (anecdote === '') return
        dispatch(addAnecdote(anecdote))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <form onSubmit={addNewAnecdote}>
                <input name='anecdote' />
                <button type='submit'>add anecdote</button>
            </form>
        </div>
    )
}

export default AnecdoteForm