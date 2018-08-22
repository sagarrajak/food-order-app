import React from 'react';
import './login.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthToken } from '../../../redux/action_creator/auth_creator';
import Spinner  from './../../dashboard/menuSpinner/menuSpinner';
// import axios from '../../../axios.config';
import axios from 'axios';
import validator from 'validator';
import { stat } from 'fs';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loginError: {
                message: '',
                error: false
            },
            loginSuccess: {
                success: false,
                message: ''
            },
            form: {
                email: {
                    field: '',
                    validity: null
                },
                password: {
                    field: '',
                    validity: null
                }
            },
            formValid: false
        }
    }

    resetLoginState = () => {
        this.setState(preState => ({
            loginError: {
                message: '',
                error: false
            },
            loginSuccess: {
                success: false,
                message: ''
            }
        }));
    }

    loginHandle = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        this.resetLoginState();
        axios.post('http://localhost:8080/api/login', {
                username: this.state.form.email.field,
                password: this.state.form.password.field
         })
        .then((responce) => {
             this.setState({loading: false});
             this.setState(preState => ({
                ...preState,
                loginSuccess: {
                    ...preState.loginSuccess,
                    success: true,
                    message: 'Successfully login!'
                }
             }));       
        })
        .catch((e) => {
            let tem = {
                ...e,
                response: {
                    ...e.response,
                }
            };
            this.setState({loading: false});
            console.log(tem.response);
            let defaultErrorMessage = 'Error during connection!';
            this.setState(preState => ({
                ...preState,
                loginError: {
                    ...preState.loginError,
                    message: tem.response.data === undefined ? 
                            defaultErrorMessage : tem.response.data.message === undefined ? 
                            defaultErrorMessage : tem.response.data.message,
                    error: true
                }
            }));
        });
    }

    emailCheck = (event) => {
        let value = event.target.value;
        let validateOutput = validator.isEmail(value);
        if(value.trim()) {
            let preState = this.state;
            let newState = {
                ...preState,
                form: {
                    ...preState.form,
                    email: {
                        ...preState.form.email,
                        validity: validateOutput,
                        field: value
                    }
                }
            }
            this.setState(newState);
            this.checkFormValidity(newState);
        } 
    }
     
    passwordCheck = (event) => {
        let value = event.target.value;
        if(value.trim()) {
            let validateOutput = String(value).length >= 8 ? true: false;
            let preState = this.state;
            let newState = {
                ...preState,
                form: {
                    ...preState.form,
                    password: {
                        ...preState.form.password,
                        validity: validateOutput,
                        field: value
                    }
                }
            }
            this.setState(newState);
            this.checkFormValidity(newState);
        }
    }
    
    checkFormValidity = (state) => {
        this.setState({ formValid: state.form.email.validity&state.form.password.validity });
    }
   
    checkValidity = (fieldName) => {
        return fieldName === null? '': fieldName === true ? 'res-valid' : 'res-invalid';
    }

    render() {
        return (
            <div className="res-login">
                <form>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor='email'>Email address:</label>
                        <input 
                            type='email' 
                            id='email' 
                            className={"form-control "+this.checkValidity(this.state.form.email.validity)}
                            placeholder="Email:"
                            onChange={(event) => this.emailCheck(event)} 
                            />
                            { this.state.form.email.validity !== null 
                              && !this.state.form.email.validity ? <p style={{'color':'red', 'marginLeft': '10px'}}>Wrong email address</p> : null }
                    </div>
                    <div className="form-group">
                        <label htmlFor='email'>Password:</label>
                        <input 
                            type='password' 
                            id='password' 
                            className="form-control" 
                            placeholder="Password:"
                            onChange= {(event) => this.passwordCheck(event)}
                            className={"form-control "+this.checkValidity(this.state.form.password.validity)}
                            />
                            { this.state.form.password.validity !== null && 
                              !this.state.form.password.validity ? <p style={{'color':'red', 'marginLeft': '10px'}}>Password is minimum eight charector long</p> : null }
                    </div>
                    <button 
                        disabled={!this.state.formValid}
                        className="btn btn-primary" 
                        type='submit' 
                        onClick={(event) => this.loginHandle(event)}>
                    Submit</button>
                </form>
                {this.state.loginError.error ? <div className='alert alert-danger'>{this.state.loginError.message}</div> : null }
                {this.state.loginSuccess.success && !this.state.loginError.error ? <div className='alert alert-primary'>{this.state.loginSuccess.message}</div> : null }
                {this.state.loading ? <div><Spinner /></div> : null } 
            </div>
        )
    }
}

const mapDispatchToProps = state => {
    return {

    }
}

const mapStateToProps = dispatch => {
    return {

    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(Login)); 