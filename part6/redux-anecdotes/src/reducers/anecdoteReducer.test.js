import deepFree from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'
import { initialState} from '../utils/initialData'

describe('anecdote reducer', () => {
    test('return initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = anecdoteReducer(undefined, action)
        expect(newState[0]).toEqual(initialState[0])
    })

    test('increase the vote by one', () => {
        const firstAnecdoteId = initialState[0].id

        const action = {
            type: 'INCREASE_VOTE',
            id: firstAnecdoteId
        }

        const state = initialState
        deepFree(state)
        const newState = anecdoteReducer(state, action)
        expect(newState[0].votes).toEqual(1)
    })
})