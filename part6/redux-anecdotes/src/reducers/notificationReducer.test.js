import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification reducer', () => {
    const initialState = ''
    test('return initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = notificationReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('notification can be updated', () => {
        const message = 'you are now notified'

        const action = {
            type: 'notification/setNotification',
            payload: message
        }

        const state = initialState
        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).not.toEqual(initialState)
        expect(newState).toEqual(message)
    })

    test('notification can be removed', () => {
        const action = {
            type: 'notification/removeNotification',
        }

        const state = initialState
        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toEqual('')
    })
})
