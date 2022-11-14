import { initialState } from '../utils/initialData'

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'INCREASE_VOTE':
            return state.map(anecdote => (anecdote.id !== action.id)
                ? anecdote
                : { ...anecdote, votes: anecdote.votes + 1 }
            )
        default:
            return state
    }
}

export default reducer