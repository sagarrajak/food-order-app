import { 
    AUTH_SET_TOKEN, 
    AUTH_DISCARD_TOKEN
} from '../actions';

export default (state = {}, actions) => {
    switch (actions.type) {
        case AUTH_SET_TOKEN:
            localStorage.setItem('token', actions.token);
            return {
               ...state, 
               isAuthenticated: true,
               token: actions.token
            }

        case AUTH_DISCARD_TOKEN:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                token: null
            }
    }
    return {...state};
}