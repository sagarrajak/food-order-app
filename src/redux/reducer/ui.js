import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN, TOGGLE_SIDENAV } from '../actions';

let initState = { nav: true, drop: true } ;

export default (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_SIDENAV:
            return {...state, nav: !state.nav, drop: !state.drop};
            
        default: 
            return {...state};

    }
}