import * as Actions from '../actions';

//props to see if sidenav is open or not default is close
let initState = { nav: true, drop: true } ;

export default (state = initState, action) => {
    console.log('coming');
    switch(action) {
        case Actions.TOGGLE_SIDENAV:
            return {...state, nav: !state.nav, drop: !state.drop};
        default: 
            return {...state};
    } 
}