import React from 'react';
import './label.css';

class Label extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        }
    }

    render() {
        let info;
        switch (this.props.type) {
            case 'error':
                info = <div className='res-label alert alert-danger'>{this.props.message}</div>
                break;
            case 'info' :
                info = <div className="res-label alert alert-primary">{this.props.message}</div>
                break;
            case 'success':
                info = <div className="res-label alert alert-success">{this.props.message}</div>
                break;
            case 'warning': 
                info = <div className="res-label alert alert-warning">{this.props.message}</div>
                break;
            default:
                info = <div className="res-label alert alert-primary">{this.props.message}</div>
                break;
        }

        let outputObject = <div className="res-label">{info}</div>; 
        setTimeout(() => {
            this.setState({isVisible: false})
        }, 2000)
        return this.state.isVisible ? outputObject : null;
    }
  
}
export default Label;
