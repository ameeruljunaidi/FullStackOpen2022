// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { initializeAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = (prop) => {
    const filter = prop.filter

    useEffect(() => {
        prop.initializeAnecdotes()
    }, [prop])

    const anecdotes = () => {
        const anecdotes = prop.anecdotes
        if (filter === '') return anecdotes
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }

    const voteHandler = (anecdote) => {
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        prop.updateAnecdote(updatedAnecdote)

        const notification = prop.notification

        prop.setNotification({ ...notification, message: `you voted ${anecdote.content}` }, 5000)
    }

    return (
        <>
            {anecdotes().map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        anecdotes: state.anecdotes,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    initializeAnecdotes,
    updateAnecdote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)