import React from 'react';
import './toolbar.css'
import MenuButton from './navbarbutton/menubutton';
import { NavLink, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import axios  from '../../../axios.config';
import {
    CART_ACTION_INIT
} from '../../../redux/actions';
import cart from '../../../redux/reducer/cart';

class Toolbar extends React.Component {

    getItemCount() {
        let itemCount = this.props.cartItems.reduce((acc, curr) => {
            return acc+curr.count
        }, 0);
        return itemCount;
    }

    render() {
        let notification = {
            'color' : 'red'
        }

        return (
            <div className='res_toolbar'>
                <div className='bar_button'><MenuButton  toggleSideNav={this.props.toggleSideNav}/></div>
                <ul className='nav-items'>
                    <li className='item-to-hide'>
                        <NavLink to='/app/checkout'>Checkout <sup className='badge'>{this.getItemCount()}</sup></NavLink>
                    </li>
                    <li className='item-to-hide'>
                        <NavLink to='/app/clear'>Clear</NavLink>
                    </li>
                    <li className='item-to-hide'>
                        <NavLink to='/app/history'>History</NavLink>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/cart')
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                const cartItems = data.map((currentState) => {
                    /**
                     *   {
                            "_id": "5b89cc2903336b6a373f4de8",
                            "cartId": "5b876e2683bbc02e2513eb96",
                            "itemId": "5b7743396a9f06739fffaeae",
                            "count": 7,
                            "userid": "5b75e29afbab5a51a9fe34ce",
                            "__v": 0,
                            "fooditem": {
                                "_id": "5b7743396a9f06739fffaeae",
                                "id": "5b7743396a9f06739fffaeae",
                                "details": "These Tricolor Cottage Cheese Skewers are the perfect snack to celebrate the spirit of Republic day right at your home. Sweet, tangy and spicy all at once, Time Machine gives us the ultimate snack to relish on this holiday.",
                                "name": "Tricolor Cottage Cheese Skewers",
                                "image": "https://i.ndtvimg.com/i/2018-01/skewers_620x330_41516773493.jpg",
                                "price": "215",
                                "maxOrder": 8,
                                "unit": "plate",
                                "__v": 0
                            },
                            "cart": {
                                "_id": "5b876e2683bbc02e2513eb96",
                                "orderStatus": "Canceled",
                                "time": "2018-08-30T04:10:14.354Z",
                                "userid": "5b75e29afbab5a51a9fe34ce",
                                "__v": 0
                            }
                        },
                     */
                    if (currentState.cart.orderStatus === 'Cart') {
                        let obj = {};
                        obj.id = currentState.cart._id;
                        obj.count = currentState.count;
                        return obj
                    }
                }).reduce((acc, curvalue) => {
                    if (curvalue !== undefined) {
                        acc.push(curvalue);
                    }
                    return acc;
                }, []);
                this.props.initCart(cartItems);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems||[]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initCart : (cartItems) => dispatch({type: CART_ACTION_INIT, cartItems})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));