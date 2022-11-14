import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        if (anecdote === '') return

        dispatch(setNotification(`you added ${anecdote}`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)

        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(addAnecdote(newAnecdote))
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