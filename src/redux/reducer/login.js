import { 
    LABEL_LODING,
    LABEL_LOGIN_ERROR,
    LABEL_LOGIN_SUCCESS,
    LABEL_LOGIN_RESET
} from '../actions';

let defaultState = {
    loading: false,
    loginError: {
        message: '',
        error: false
    },
    loginSuccess: {
        success: false,
        message: ''
    }
}

export default (state = defaultState, actions) => {
    switch (actions.type) {
        case LABEL_LODING: 
            return {
                ...state,
                loading: actions.isLoading
            }
        case LABEL_LOGIN_ERROR: 
            return {
                ...state,
                loginError: {
                    ...state.loginError,
                    message: actions.message,
                    error: true
                }
            }
        case LABEL_LOGIN_SUCCESS: 
            return {
                ...state,
                loginSuccess: {
                    ...state.loginSuccess,
                    success: true,
                    message: actions.message
                }
            }
        case LABEL_LOGIN_RESET:
            return {
                ...state,
                loginError: {
                    message: '',
                    error: false
                },
                loginSuccess: {
                    success: false,
                    message: ''
                },
                loading: false
            }
        default:
            return state;
    }
}