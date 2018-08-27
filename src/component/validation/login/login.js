import React from 'react';
import './login.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner  from './../../dashboard/menuSpinner/menuSpinner';
import axios from 'axios';
import validator from 'validator';
import { setAuthToken }from '../../../redux/action_creator/auth_creator';
import { 
  LABEL_LODING,
  LABEL_LOGIN_ERROR,
  LABEL_LOGIN_SUCCESS,
  LABEL_LOGIN_RESET
} from '../../../redux/actions';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
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

    loginHandle = (event) => {
        event.preventDefault();
        this.props.loginLoadingFlag(true);
        this.props.loginResetFlag();
        axios.post('http://localhost:8080/api/login', {
                username: this.state.form.email.field,
                password: this.state.form.password.field
         })
        .then((response) => {
            this.props.loginLoadingFlag(false);
            if(response.status === 200 && response.data && response.data.success) {
                this.props.loginSuccessFlag('Successfully login!');
                this.props.signInUser(response.data.token);
                setTimeout(() => {
                    this.props.history.replace('/app'); // Add delay to show success message
                }, 200);
            } 
            else if (response.data && response.data.message) {
                this.props.loginErrorFlag(response.data.message);
            }
            else {
                this.props.loginErrorFlag('Error during connection');
            }
        })
        .catch((e) => {
            this.props.loginLoadingFlag(false);
            let defaultErrorMessage = 'Error during connection!';
            let message = e.response.data === undefined ?
                          defaultErrorMessage: e.response.data.message === undefined ?
                          defaultErrorMessage: e.response.data.message;
            this.props.loginErrorFlag(message);
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
        this.setState({formValid: state.form.email.validity&state.form.password.validity});
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
                              && !this.state.form.email.validity ? <p style={{'color':'red', 'marginLeft': '10px'}}>
                              Wrong email address</p> : null }
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
                              !this.state.form.password.validity ? <p style={{'color':'red', 'marginLeft': '10px'}}>
                              Password is minimum eight charector long</p> : null }
                    </div>
                    <button 
                        disabled={!this.state.formValid}
                        className="btn btn-primary" 
                        type='submit' 
                        onClick={(event) => this.loginHandle(event)}>
                    Submit</button>
                </form>
                {this.props.loginError.error ? <div className='alert alert-danger'>{this.props.loginError.message}</div> : null }
                {this.props.loginSuccess.success && !this.props.loginError.error ?
                     <div className='alert alert-primary'>{this.props.loginSuccess.message}</div> : null }
                {this.props.loading ? <div><Spinner /></div> : null } 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInUser : (token) => dispatch(setAuthToken(token)),
        loginLoadingFlag: (isLoading) => dispatch({type: LABEL_LODING, isLoading}),
        loginErrorFlag: (message) => dispatch({type: LABEL_LOGIN_ERROR, message}),
        loginSuccessFlag: (message) => dispatch({type: LABEL_LOGIN_SUCCESS, message}),
        loginResetFlag: () => dispatch({type: LABEL_LOGIN_RESET})
    }
};

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        loginError: state.login.loginError,
        loginSuccess: state.login.loginSuccess
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(Login)); 