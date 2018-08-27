import { 
    LABEL_SIGNUP_LOADING,
    LABEL_SIGNUP_SUCCESS,
    LABEL_SIGNUP_ERROR,
    LABEL_SIGNUP_RESET,
} from '../actions';

let defaultState = {
    loading: false,
    signupError: {
        message: '',
        error: false
    },
    signupSuccess: {
        success: false,
        message: ''
    }
}

export default (state = defaultState, actions) => {
    switch (actions.type) {
        case LABEL_SIGNUP_LOADING: 
            return {
                ...state,
                loading: actions.isLoading
            }
        case LABEL_SIGNUP_ERROR: 
            return {
                ...state,
                signupError: {
                    ...state.signupError,
                    message: actions.message,
                    error: true
                }
            }
        case LABEL_SIGNUP_SUCCESS: 
            return {
                ...state,
                signupSuccess: {
                    ...state.signupSuccess,
                    success: true,
                    message: actions.message
                }
            }
        case LABEL_SIGNUP_RESET:
            return {
                ...state,
                signupError: {
                    message: '',
                    error: false
                },
                signupSuccess: {
                    success: false,
                    message: ''
                },
                loading: false
            }
        default:
            return state;
    }
}