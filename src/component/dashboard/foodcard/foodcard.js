import React from 'react';
import './foodcard.css';
import foodItem from '../../../images/food_item.jpeg';
import { withRouter } from 'react-router-dom';
import axios from 'axios'; 

class Foodcard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: 0,
			name: 'Egg butter masala',
			unit: 'Unit'
		}
	}

	addItemToCard = () => {
		this.setState(preState => ({items: ++preState.items}));
	}

	removeItemFromCard = () => {
		this.setState(preState => {
			if(preState.items > 0) 
				return {items: --preState.items};
			else 
				return {...preState};
		})
	}
	
	showItemDetails = () => {
		this.props.history.push('/app/about/id');
	}

	render() {
		return (
			<div className="res_food_block" >
				<div className='res_card'>
					 <img src={foodItem} onClick={this.showItemDetails} />
					 <div className='alert'><h4>{this.state.name}</h4></div>
					 <div className='res_footer'>
						<button type="button" className="btn btn-secondary"><i className='fa fa-plus'></i></button>
						<div><h4>10 unit</h4></div>
						<button type="button" className="btn btn-secondary"><i className='fa fa-minus'></i></button> 
					 </div>
				</div>
			</div>
		)
	}

}

export default withRouter(Foodcard);