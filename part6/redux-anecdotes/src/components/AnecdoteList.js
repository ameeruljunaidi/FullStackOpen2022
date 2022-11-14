import { useSelector, useDispatch } from 'react-redux'
import { setAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import anecdoteService from '../services/anecdoteService'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)

    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch])

    const anecdotes = useSelector(state => {
        const anecdotes = state.anecdotes
        if (filter === '') return anecdotes
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    const voteHandler = (anecdote) => {
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
                        <button onClick={() => voteHandler(anecdote)}>vote</button>
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