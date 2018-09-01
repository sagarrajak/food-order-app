import axios from '../../axios.config';
import {
    CART_ACTION_PROGRESS,
    CART_ADD_ITEM,
    CART_DELETE_ITEM
}  from '../actions';

const cartAddItem = (itemId, count) => {
    return {
        type: CART_ADD_ITEM,
        itemId,
        count
    }
};

const cartDeleteItem = (itemId) => {
    return {
        type: CART_DELETE_ITEM,
        itemId
    }
};

const cartActionProgress = (flag) => {
    return {
        type: CART_ACTION_PROGRESS,
        flag
    }
};

export  {
    cartAddItem,
    cartDeleteItem,
    cartActionProgress
}


