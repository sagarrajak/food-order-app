import React from 'react';
import { withRouter } from 'react-router-dom';
import Backdrop from '../backdrop/backdrop';
import './modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cls: ''
        }
    }

    onBackdropTouch = (outSideModel) => {
        if(outSideModel) {
            this.setState({cls: 'res_modalclose'});
            setTimeout(() => {
                this.props.history.push(this.props.navroute)
            }, 700); 
        }
    }

    onEscapeHandel = (e) => {
        if (e.keyCode === 27) {
            this.setState({cls: 'res_modalclose'});
            setTimeout(() => {
                this.props.history.push(this.props.navroute)
            }, 700); 
        }
    }

    render() {
        return (
            <div>
                <div onClick={() => this.onBackdropTouch(true)}>
                    <Backdrop>
                    </Backdrop>
                </div>
                <div className='res_flex_container'>
                    <div className={'res_modal '+this.state.cls} 
                            onClick={() => this.onBackdropTouch(false)}>
                            {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onEscapeHandel, false);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this.onEscapeHandel, false);
    }
}

export default withRouter(Modal);