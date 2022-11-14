import deepFree from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'
import { initialState } from '../utils/initialData'

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

    test('adding a new anecdote will post to the store', () => {
        const newAnecdote = 'this anecdote will blow your mind hole'

        const action = {
            type: 'ADD_ANECDOTE',
            anecdote: newAnecdote
        }

        const state = initialState
        deepFree(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    content: newAnecdote
                })
            ])
        ) // source: https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
    })

    test('anecdotes will be sorted by the number of votes', () => {
        const secondAnecdoteId = initialState[1].id

        const action = {
            type: 'INCREASE_VOTE',
            id: secondAnecdoteId
        }

        const state = initialState
        deepFree(state)
        const newState = anecdoteReducer(state, action)
        expect(newState[0].id).toEqual(secondAnecdoteId)
    })
})