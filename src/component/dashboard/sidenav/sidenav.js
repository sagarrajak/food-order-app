import React from 'react';
import  './sidenav.css';
import { NavLink} from 'react-router-dom';
class Sidenav extends React.Component {
    render() {
        let openSidenav = {
            width: "240px",
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            backgroundColor: '#58B5B1',
            zIndex: '101',
            transition: '300ms ease-in'
        }, 
        closeSidenav = {
            ...openSidenav, left: '-250px'
        };

        let sidenav = ( <div  className='res_sidenav' style={this.props.nav ? openSidenav: closeSidenav} >
                            <ul>
                                <li><img src={require('../../../images/image.png')} /></li>
                                <li className="res-dynamic">
                                    <div className='res-sidenav-checkout'>
                                        <div className='res-sidenav-checkout-item'
                                             data-toggle="tooltip" title='Checkout' >
                                            <i class="fa fa-shopping-cart fa-2x" style={{ 'color': 'white' }} aria-hidden="true"></i>
                                        </div>
                                        <div className='res-sidenav-checkout-item'
                                             data-toggle="tooltip" title='Clear list'>
                                            <i class="fa fa-history fa-2x" style={{ 'color': 'white' }} aria-hidden="true"></i>
                                        </div>
                                        <div className='res-sidenav-checkout-item'
                                            data-toggle="tooltip" title='Order history'>
                                            <i class="fa fa-eraser fa-2x" style={{ 'color': 'white' }} aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </li>
                                <li className='nav-link'>
                                     <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                     </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>some shit
                                            <span><i class="fa fa-chevron-right" style={{'margin-left': '50px'}}></i></span>
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'>About us
                                        </NavLink>
                                </li>
                                <li className='nav-link'>
                                        <NavLink to='/app'> Sign out
                                        </NavLink>
                                </li>
                            </ul>
                        </div>
                    );
        if(!this.props.drop) 
            return null;
        else {
            return  (
                    <div className='res_backdrop' onClick={this.props.toggleSideNav} >
                        {sidenav}
                    </div>
            );
        } 
    }
}

export default Sidenav;