import React from 'react';
import classes from './backdrop.css'

class Backdrop extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			open: true
		}
    }

	clickHandle = () => {
		setTimeout(() => {
			this.setState(preState => ({open: !preState.open}));
		}, 600);
	}

    render() {
        if(this.state.open) {
            return (
				<div className='res_backdrop' onClick={this.clickHandle}  >
                        {this.props.children}
				</div>
			); 
        }
       else return (<div></div>);
    }
};

export default Backdrop;