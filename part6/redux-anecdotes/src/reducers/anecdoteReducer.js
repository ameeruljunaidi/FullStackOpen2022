import { sortedState } from '../utils/initialData'
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

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

const patchAnecdoteAction = (state, action) => sortedState(
    state.map(anecdote => (anecdote.id !== action.payload.id) ? anecdote : action.payload)
)

// const addAnecdote = (anecdote) => ({ type: 'ADD_ANECDOTE', anecdote: anecdote })

const addAnecdoteAction = (state, action) => {
    const anecdote = action.payload
    state.push(anecdote)
}

const setAnecdotesAction = (state, action) => action.payload

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        patchAnecdote: patchAnecdoteAction,
        addAnecdote: addAnecdoteAction,
        setAnecdotes: setAnecdotesAction
    }
})

export const { patchAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = anecdote => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(addAnecdote(newAnecdote))
    }
}

export const updateAnecdote = newAnecdote => {
    return async dispatch => {
        const returnedAnecdote = await anecdoteService.updateAnecdote(newAnecdote)
        dispatch(patchAnecdote(returnedAnecdote))
    }
}

export default anecdoteSlice.reducer