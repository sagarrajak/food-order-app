import React from 'react';
import { connect } from 'react-redux';
import classes from  './menubutton.css';
import Container from './../../../../hoc/container';

class menuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cls : 'menu_button_parent'
        }
    }

    toggleClass = () => {
       if(this.state.cls ==='') this.setState({cls: 'animate'});
       else this.setState({cls: ''});
       setTimeout(() => {
           this.setState({cls: ''});
       }, 800)
       this.props.toggleSideNav();
    }

    render() {
        return (
            <Container>
                <div id='menubutton' className={'menu_button_parent '+this.state.cls} onClick={this.toggleClass} >
                    <div className='menu_button1'></div>
                    <div className='menu_button2'></div>
                    <div className='menu_button3'></div>
                </div>
            </Container>
        );
    }
}  

export default menuButton;