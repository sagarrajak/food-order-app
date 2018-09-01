import React from 'react';
import './toolbar.css'
import MenuButton from './navbarbutton/menubutton';
import { NavLink, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

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
    
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems||[]
    }
};

export default connect(mapStateToProps, null)(withRouter(Toolbar));