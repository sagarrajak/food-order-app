import React from 'react';
import './signup.css';
import { withRouter } from 'react-router-dom';
import Input from './input/input';
import Spinner from '../../dashboard/menuSpinner/menuSpinner';
import { connect } from 'react-redux';
import validator from 'validator';

import {
    LABEL_SIGNUP_RESET,
    LABEL_SIGNUP_ERROR,
    LABEL_SIGNUP_SUCCESS,
    LABEL_SIGNUP_LOADING,
    LABEL_LODING,
    LABEL_LOGIN_SUCCESS
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
                 passowrd: '',
                 retypePassword: ''
            }
        }
    }   

    submitHandle = (event) => {
        event.preventDefault();
        let fromValues = this.state.form.map((obj, index) => {
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
                    item[index].validityClass = 'res-invalid'
                } else {
                    item[index].validityClass = 'res-valid'
                }
            }
            this.setState({form: item});
        }
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
                        <div className="btn btn-primary" 
                             type='submit' 
                             onClick={(event)=>this.submitHandle(event)}>
                             Submit
                        </div>
                    </form> 
                    {/* { <div><Spinner /></div> } */}
                    {/* { <div className='alert alert-primary'>this is alert message</div> } */}
                    {/* { <div className='alert alert-danger'>this is alert message</div> } */}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupLoadingFlag: (isLoading) => dispatch({type: LABEL_SIGNUP_LOADING, isLoading}),
        signupErrorFlag: (message) => dispatch({type: LABEL_SIGNUP_ERROR, message}),
        signupSuccessFlag: (message) => dispatch({dispatch: LABEL_SIGNUP_SUCCESS, message}),
        signupResetFlag: (message) => dispatch({dispatch: LABEL_SIGNUP_RESET})
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