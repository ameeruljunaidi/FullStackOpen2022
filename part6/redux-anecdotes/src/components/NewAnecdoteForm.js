import { useDispatch } from 'react-redux'

const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        if (anecdote === '') return
        dispatch({ type: 'ADD_ANECDOTE', anecdote: anecdote })
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

export default NewAnecdoteForm