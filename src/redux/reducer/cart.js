import {
    CART_ADD_ITEM,
    CART_DELETE_ITEM,
    CART_ACTION_PROGRESS,
    CART_ACTION_INIT //Initalized cart after app first time started
} from '../actions';

export default (state = { cartItems: [], actionsInProgress: false }, actions) => {
    switch (actions.type) {
        // case CART_DELETE_ITEM:
        //      return cartDeleteItem(state, actions);   
        case CART_ADD_ITEM:
             return cartAddItem(state, actions);
        case CART_ACTION_PROGRESS:
             return setCartActionProgess(state, actions.inProgress)
        case CART_ACTION_INIT:
             return cartInit(state, actions);
        default:
             return {...state};
    }
}

function cartAddItem (state, actions) {
        const  index = state.cartItems.findIndex((obj) => obj.id === actions.id);
        if (index>=0) {
            let items = [...state.cartItems];
            items[index].count = actions.count;
            return {...state, cartItems: items};
        } else {
            let cartItems = [...state.cartItems];
            cartItems.push({
                id: actions.id,
                count: actions.count
            })
            return {
                ...state,
                cartItems
            }
        }
}

// function cartDeleteItem (state, actions) {
//         const index = state.cartItems.findIndex((obj) => obj.id === actions.id);
//         console.log(index);
//         if (index>=0) {
//             let items = [...state.cartItems];
//             items.splice(index, 1);
//             return {...state, cartItems: items};
//         }
//         else {
//             return {...state};
//         }
// }

function setCartActionProgess(state, inProgress) {
    return {
        ...state,
        actionsInProgress: inProgress
    }
}

function cartInit(state, actions) {
    return {
        ...state,
        cartItems: actions.cartItems
    }
}