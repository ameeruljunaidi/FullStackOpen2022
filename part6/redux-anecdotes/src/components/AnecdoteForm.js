import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        if (anecdote === '') return

        dispatch(createAnecdote(anecdote))
        event.target.anecdote.value = ''

        dispatch(setNotification(`you added ${anecdote}`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
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