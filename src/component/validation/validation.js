import React from 'react';
import './validation.css';
import Login from './login/login';
import Signup from './signup/signup';
import { Route, NavLink, Switch, withRouter } from 'react-router-dom';

class Validation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="res_link">
                    <ul>
                        <li><NavLink to='/auth/login' active >Login</NavLink></li>
                        <li><NavLink to='/auth/signup' >Signup</NavLink></li>
                    </ul> 
                </div>
                <div className="rs_container">
                    <Switch>
                        <Route path={this.props.match.url+'/signup'} render={() => <Signup /> } />
                        <Route path={this.props.match.url+'/login'} render={() => <Login /> } />
                        <Route path={this.props.match.url} render={() => <Login /> } /> 
                    </Switch>     
                </div>
            </div>
        );
    }
}
export default withRouter(Validation);
