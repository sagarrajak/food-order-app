import React from 'react';
import './foodcard.css';
import defaultFoodImage from '../../../images/food_item.jpeg';
import Label from '../../label/label';
import { withRouter } from 'react-router-dom';
import Container from '../../../hoc/container';
import { connect } from 'react-redux';
import axios from '../../../axios.config';

import {
	CART_ADD_ITEM,
	CART_DELETE_ITEM,
	CART_ACTION_PROGRESS
} from '../../../redux/actions';

class Foodcard extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			items: 0,
			errorMessage: null
		}
	}

	addItemToCard = () => {
		let count = this.state.items;
		if (count+1 <= this.props.maxOrder) {
			 this.setState({items: ++count});
			//  this.props.addItems(count, this.props.id);	
			this.postAddItemToCart(count);
		} else {
			console.log('Items existing max count');
		}
	}

	removeItemFromCard = () => {
		let count = this.state.items;
		if (count-1 >= 0) {
			count--;
			this.setState({items: count});
		} 
		if (count === 0)
			this.postDeleteItemFromCart();
		else 
			this.postAddItemToCart(count);
	}

	postAddItemToCart = (count) => {
		this.props.actionInProgrss(true);
		axios.post('http://localhost:8080/api/cart/add-item', {
			id: this.props._id,
			count: count
		})
		.then((response) => {
			this.props.actionInProgrss(false);
			if (response.status === 200) {
				this.props.addItems(count, this.props.id);
			} else {
				// TODO show error flag
			}
		})
		.catch(err => {
			//TODO show error flag
			throw err;
		})
	}

	postDeleteItemFromCart = () => {
		this.props.actionInProgrss(true);
		axios.post('http://localhost:8080/api/cart/del-item', {
			id: this.props._id,
		})
		.then((response) => {
			this.props.actionInProgrss(false);
			if (response.status === 200) {
				this.props.deleteItems(this.props.id);
			} else {
				// TODO show error flag
			}
		})
		.catch(err => {
			//TODO show error flag
			throw err;
		})
	}

	showItemDetails = () => {
		this.props.history.push('/app/about/id');
	}

	splitInTwoWords = (str) => {
		if (str)
		 	return 	str.split(' ').length 
					>= 2 ? str.split(' ').length  === 2 ? 
					(str.split(' ')[0]+' '+str.split(' ')[1]) : (str.split(' ')[0]+' '+str.split(' ')[1]+'...'): str;
	}

	render() {
		return (
			<Container>
				<div className="res_food_block" >
					<div className='res_card'>
						<img src={this.props.image||defaultFoodImage} onClick={this.showItemDetails} />
						<div className='alert'><h4>{this.splitInTwoWords(this.props.name)}</h4></div>
						<div className='res_footer'>
							<button type="button" className="btn btn-secondary" onClick={this.addItemToCard}>
									<i className='fa fa-plus'></i>
							</button>
							<div>
								<h4>{this.state.items+' '+this.props.unit}</h4>
							</div>
							<button type="button" className="btn btn-secondary" onClick={this.removeItemFromCard} >
								<i className='fa fa-minus'></i>
							</button> 
						</div>
					</div>
				</div>
			</Container>
		)
	}
}
const mapStateToProps = state => {
	return {
		cartItems: state.cart.cartItems
	}
};

const mapDispatchToProps = dispatch => {
	return {
		addItems: (count, id) => dispatch({type: CART_ADD_ITEM, count,  id}),
		deleteItems: (id) => dispatch({type: CART_DELETE_ITEM, id}),
		actionInProgrss: (inProgress) => dispatch({type: CART_ACTION_PROGRESS, inProgress})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Foodcard));