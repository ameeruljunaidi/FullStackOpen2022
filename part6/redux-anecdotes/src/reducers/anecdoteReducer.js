import { asObject, sortedState } from '../utils/initialData'
import { createSlice } from '@reduxjs/toolkit'


// const reducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)
//
//
//     switch (action.type) {
//         case 'INCREASE_VOTE':
//             return sortedState(
//                 state.map(anecdote => (anecdote.id !== action.id) ? anecdote : {
//                     ...anecdote,
//                     votes: anecdote.votes + 1
//                 })
//             )
//         case 'ADD_ANECDOTE':
//             return sortedState([...state, asObject(action.anecdote)])
//         default:
//             return sortedState(state)
//     }
// }

// const voteAnecdote = (id) => ({ type: 'INCREASE_VOTE', id: id })

const voteAnecdoteAction = (state, action) => {
    return sortedState(
        state.map(anecdote => (anecdote.id !== action.payload) ? anecdote : {
            ...anecdote,
            votes: anecdote.votes + 1
        })
    )
}

// const addAnecdote = (anecdote) => ({ type: 'ADD_ANECDOTE', anecdote: anecdote })

const addAnecdoteAction = (state, action) => {
    const anecdote = asObject(action.payload)
    state.push(anecdote)
}

const setAnecdotesAction = (state, action) => action.payload

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote: voteAnecdoteAction,
        addAnecdote: addAnecdoteAction,
        setAnecdotes: setAnecdotesAction
    }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer