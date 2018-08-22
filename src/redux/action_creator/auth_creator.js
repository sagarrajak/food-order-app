import {AUTH_GET_TOKEN, AUTH_DISCARD_TOKEN, AUTH_SET_TOKEN} from '../actions';

const setAuthToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token
    }
}

const discardAuthToken = () => {
    return {
        type: AUTH_DISCARD_TOKEN
    }
}

export {
    setAuthToken,
    discardAuthToken
}