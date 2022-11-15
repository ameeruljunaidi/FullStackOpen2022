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

        prop.setNotification(`you added ${anecdote}`)
        setTimeout(() => {
            prop.setNotification('')
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)