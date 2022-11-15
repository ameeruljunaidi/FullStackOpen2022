import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (prop) => {
    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        if (anecdote === '') return

        prop.createAnecdote(anecdote)
        event.target.anecdote.value = ''

        const notification = prop.notification
        prop.setNotification({ ...notification, message: `you added ${anecdote}` })
    }

    return (
        <div>
            <form onSubmit={addNewAnecdote}>
                <input name="anecdote" />
                <button type="submit">add anecdote</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        notification: state.notification
    }
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)