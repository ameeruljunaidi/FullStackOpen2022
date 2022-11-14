import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(setNotification(`you voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(setNotification(''))

        }, 5000)
        dispatch(voteAnecdote(anecdote.id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form>
                <div><input /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteList