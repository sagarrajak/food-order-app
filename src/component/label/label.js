import React from 'react';
import './label.css';

const Label = (props) => {
    let info;
    switch (props.type) {
        case 'error':
            info = <div className='label label-danger'>{props.message}</div>
            break;
        case 'info' :
            info = <div className="label label-primary">{props.message}</div>
            break;
        case 'success':
            info = <div className="label label-success">{props.message}</div>
            break;
        case 'warning': 
            info = <div className="label label-warning">{props.message}</div>
            break;
        default:
            info = <div className="label label-primary">{props.message}</div>
            break;
    }
    return <div>{info}</div>;
}
export default Label;