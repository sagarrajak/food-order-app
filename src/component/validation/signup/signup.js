import React from 'react';
import './signup.css';
import { withRouter } from 'react-router-dom';
import Input from './input/input';
import Spinner from '../../dashboard/menuSpinner/menuSpinner';
import { connect } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import * as Api from '../../../api';

import {
    LABEL_SIGNUP_RESET,
    LABEL_SIGNUP_ERROR,
    LABEL_SIGNUP_SUCCESS,
    LABEL_SIGNUP_LOADING,
} from '../../../redux/actions';

class Signup extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            form: [
                {
                    id: 'name',
                    placeholder: 'Name: ',
                    type: 'text',
                    label: 'Name ',
                    validity: null,
                    element: 'input',
                    validator: function (name) {
                        return !validator.isEmpty(name);
                    },
                    validityMessage: 'Name must not be empty',
                    validityClass: '',
                    data: '',
                    touched: false
                },
                {
                    id: 'email',
                    placeholder: 'Email: ',
                    type: 'email',
                    label: 'Email ',
                    validity: null,
                    element: 'input',
                    validityClass: '',
                    validityMessage: 'Email is not valid',
                    validator: function (email) {
                        return validator.isEmail(email);
                    },
                    data: ''
                },
                {
                    id: 'phone_num',
                    placeholder: 'Phone number: ',
                    type: 'number',
                    label: 'Phone number',
                    validity: null,
                    element: 'input',
                    validityClass: '',
                    validator: function (phonenumber) {
                        return validator.isMobilePhone(phonenumber)
                    },
                    validityMessage: 'Mobile number is not valid',
                    data: ''
                },
                {
                    id: 'address',
                    placeholder: 'Address: ',
                    type: 'text',
                    label: 'address',
                    validity: null,
                    element: 'textarea',
                    validityClass: '',
                    rows: "5",
                    cols: "10",
                    data: ''
                },
                {
                    id: 'password',
                    placeholder: 'Password: ',
                    type: 'password',
                    label: 'Password ',
                    validity: null,
                    element: 'input',
                    validityClass: '',
                    validator: function (passowrd) {
                        return (String(passowrd).length >= 8);
                    },
                    data: '',
                    validityMessage: 'Password not valid',
                },
                {
                    id: 'retype-password',
                    placeholder: 'Password: ',
                    type: 'password',
                    label: 'Confirm password ',
                    validity: null,
                    element: 'input',
                    validityClass: '',
                    validator: function (passowrd) {
                        return (String(passowrd).length >= 8);
                    },
                    validityMessage: 'Password not valid',
                    data: ''
                }
            ],
            values: {
                 name: '',
                 username: '',
                 phonenumber: '',
                 address: '',
                 password: '',
                 retypePassword: ''
            },
            formValid: false
        }
    }   

    submitHandle = (event) => {
        event.preventDefault();
        this.props.signupResetFlag();
        let formValues = this.state.form.map((obj, index) => {
            let tem = {};
            let key = Object.keys(this.state.values)[index];
            tem[key] = obj.data;
            return tem;
        })
        .reduce( (acc, curValue) => { 
            let key = Object.keys(curValue)[0]; 
            acc[key] = curValue[key];
            return acc;
        }, {})
        if (formValues.password !== formValues.retypePassword) {
            this.props.signupErrorFlag('Password not match'); 
        } 
        else {
            this.props.signupLoadingFlag(true);
            axios.post('http://localhost:8080/api/signup', formValues)
            .then((response) => {
                console.log(response);
                this.props.signupLoadingFlag(false);
                if (response.status === 200 && response.data && response.data.success) {
                    this.props.signupSuccessFlag(response.data.message);
                    setTimeout(() => {
                        this.props.history.push('/auth/login'); // Set small timeout before going to login page 
                    }, 500); 
                } 
                else if (response.data && response.data.message) {
                    this.props.signupErrorFlag(response.data.message);
                } 
                else {
                    this.props.signupErrorFlag("Error during signup");
                }
            })
            .catch(err => {
                this.props.signupLoadingFlag(false);
                const defaultErrorMessage = 'Error during connection';
                let message = err.response.data === undefined ?  //If there is error message is response else set default error message
                              defaultErrorMessage: err.response.data.message ? 
                              err.response.data.message: defaultErrorMessage;
                this.props.signupErrorFlag(message); 
            });
        }
    }

    onChangeHandaler = (event, id) => {
        let index = this.state.form.findIndex((obj) => {
            return obj.id === id;
        });
        
        if (index+1) {
            const data = event.target.value;
            let item = [...this.state.form];
            item[index].data = data;
            if (item[index].validator) {
                if (!item[index].validator(data)) {
                    item[index].validityClass = 'res-invalid';
                } else {
                    item[index].validityClass = 'res-valid';
                }
            } else {
                item[index].validityClass = 'res-valid';
            }
            this.setState({form: item});
            this.checkFormValidity(item); // Check form validity each time  after updating form
        }
    }

    checkFormValidity = (form) => {
        let formValid = true;
        form.forEach((obj) => {
            if(obj.validator) // If validator is defined 
                formValid &= obj.validator(obj.data) //Check value is correct or not 
        });
        this.setState({formValid}); 
    }

    render() {
        return  (
            <div className='res-container'>
                <div className="res-signup">
                    <form>
                        <h1>Signup</h1>
                            {
                                this.state.form.map((obj, index) =>  
                                <Input
                                    key={obj.id}
                                   {...obj}
                                   onchange={(event) => this.onChangeHandaler(event, obj.id)}
                                /> 
                             )
                            }
                        <button className="btn btn-primary" 
                             type='submit' 
                             disabled={!this.state.formValid}
                             onClick={(event)=>this.submitHandle(event)}>
                             Submit
                        </button>
                    </form> 
                    {this.props.signupError.error ? 
                        <div className='alert alert-danger'>{this.props.signupError.message}</div>: null}
                    {this.props.signupSuccess.success && !this.props.signupSuccess.error?
                        <div className='alert alert-primary'>{this.props.signupSuccess.message}</div> : null}
                    {this.props.loading? <div><Spinner /></div>: null} 
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupLoadingFlag: (isLoading) => dispatch({type: LABEL_SIGNUP_LOADING, isLoading}),
        signupErrorFlag: (message) => dispatch({type: LABEL_SIGNUP_ERROR, message}),
        signupSuccessFlag: (message) => dispatch({type: LABEL_SIGNUP_SUCCESS, message}),
        signupResetFlag: () => dispatch({type: LABEL_SIGNUP_RESET})
    } 
}

const mapStateToProps = state => {
    return {
        loading: state.signup.loading,
        signupError: state.signup.signupError,
        signupSuccess: state.signup.signupSuccess
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));