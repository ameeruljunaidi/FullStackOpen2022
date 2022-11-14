import { initialState, asObject } from '../utils/initialData'

export const voteAnecdote = (id) => ({ type: 'INCREASE_VOTE', id: id })

export const addAnecdote = (anecdote) => ({ type: 'ADD_ANECDOTE', anecdote: anecdote })

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    const sortedState = (state) => state.sort((a, b) => b.votes - a.votes)

    switch (action.type) {
        case 'INCREASE_VOTE':
            return sortedState(
                state.map(anecdote => (anecdote.id !== action.id) ? anecdote : {
                    ...anecdote,
                    votes: anecdote.votes + 1
                })
            )
        case 'ADD_ANECDOTE':
            return sortedState([...state, asObject(action.anecdote)])
        default:
            return sortedState(state)
    }
}

export default reducer