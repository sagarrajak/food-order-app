import React from 'react';
import './login.css';
import { withRouter } from 'react-router-dom';
class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="res-login">
                <form>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label for='email'>Email address:</label>
                        <input type='email' id='email' className="form-control" placeholder="Email:" />
                    </div>
                    <div className="form-group">
                        <label for='email'>Password:</label>
                        <input type='email' id='password' className="form-control" placeholder="password:" />
                    </div>
                    <div className="btn btn-primary" type='submit'>Submit</div>
                </form>
            </div>
        )
    }
}
export default withRouter(Login);