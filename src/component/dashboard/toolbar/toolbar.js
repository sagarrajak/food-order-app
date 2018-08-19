import React from 'react';
import './toolbar.css'
import MenuButton from './navbarbutton/menubutton';
import { NavLink, Switch } from 'react-router-dom';
 
const toolbar = (props) => {

    let notification = {
        'color' : 'red'
    }

    return (
        <div className='res_toolbar'>
            <div className='bar_button'><MenuButton  toggleSideNav={props.toggleSideNav}/></div>
            <ul className='nav-items'>
                <li className='item-to-hide'>
                    <NavLink to='/app/checkout'>Checkout <sup className='badge'>10</sup></NavLink>
                </li>
                <li className='item-to-hide'>
                    <NavLink to='/app/clear'>Clear</NavLink>
                </li>
                <li className='item-to-hide'>
                    <NavLink to='/app/history'>History</NavLink>
                </li>
            </ul>
        </div>
    )
};

export default toolbar;