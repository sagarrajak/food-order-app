import React from 'react';
import './signup.css';
import { withRouter } from 'react-router-dom';
class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  (
            <div className='res-container'>
                <div className="res-signup">
                    <form>
                        <h1>Signup</h1>
                        <div className="form-group">
                            <label for='name'>Name: </label>
                            <input type='text' id='name' className="form-control" placeholder="Name:" />
                        </div>
                        <div className="form-group">
                            <label for='email'>Email:</label>
                            <input type='email' id='password' className="form-control" placeholder="Email:" />
                        </div>
                        <div className="form-group">
                            <label for='phone_num'>Phone number:</label>
                            <input type='number' id='phone_num' className="form-control" placeholder="Phone number:" />
                        </div>
                        <div className="form-group">
                            <label for='address'>Address:</label>
                            <input type='text' id='address' className="form-control" placeholder="Address:" />
                        </div>
                        <div className="form-group">
                            <label for='email'>Password:</label>
                            <input type='email' id='password' className="form-control" placeholder="password:" />
                        </div>
                        <div className="form-group">
                            <label></label>
                        </div>
                        <div className="btn btn-primary" type='submit'>Submit</div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Signup);