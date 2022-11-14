import { initialState, asObject } from '../utils/initialData'

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'INCREASE_VOTE':
            return state
                .map(anecdote => (anecdote.id !== action.id) ? anecdote : { ...anecdote, votes: anecdote.votes + 1 })
                .sort((a, b) => b.votes - a.votes)
        case 'ADD_ANECDOTE':
            return [...state, asObject(action.anecdote)]
        default:
            return state
    }
}

export default reducer