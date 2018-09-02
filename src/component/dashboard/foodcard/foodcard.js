import React from 'react';
import './foodcard.css';
import defaultFoodImage from '../../../images/food_item.jpeg';
import Label from '../../label/label';
import { withRouter } from 'react-router-dom';
import Container from '../../../hoc/container';
import { connect } from 'react-redux';
import axios from '../../../axios.config';
import Lable from '../../label/label';

import {
	CART_ADD_ITEM,
	CART_ACTION_PROGRESS
} from '../../../redux/actions';

class Foodcard extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			items: 0,
			errorMessage: null,
			cartItemId: null
		}
	}

	addItemToCard = () => {
		let count = this.state.items;
		if (count+1 <= this.props.maxOrder) 
			this.postAddItemToCart(count+1);
		else 
			console.log('Items existing max count');
	}

	removeItemFromCard = () => {
		let count = this.state.items;
		if (count-1 >= 0) {
			if (count-1 === 0) {
				this.postDeleteItemFromCart();
			}
			else 
				this.postAddItemToCart(count-1);
		} 
	}

	/**
	 * A function will return cartId
	 * when initial value of items is == 0 then this.props.cart = [] 
	 * when initial value of items is > 0 then this.props.cart = [{...}] items 
	 * in that case api will return cartItemId  
	 */
	getCartItemId = () => {
		if(this.props.cart.length > 0) 
			return this.props.cart[0]._id; 
		else 
			return this.state.cartItemId;  //This is only set when user call to increase cart item
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
				this.setState({
					items: count,
					cartItemId: response.data.cartItemId
				});
			} else {
				// TODO show error flag
				console.log('error during process');
			}
		})
		.catch(err => {
			this.props.actionInProgrss(false);
			//TODO show error flag
			throw err;
		})
	}

	postDeleteItemFromCart = () => {
		console.log(this.getCartItemId());
		this.props.actionInProgrss(true);
		axios.post('http://localhost:8080/api/cart/del-item', {
			id: this.getCartItemId()
		})
		.then((response) => {
			this.props.actionInProgrss(false);
			if (response.status === 200) {
				this.props.addItems(0, this.props.id);
				this.setState(preState => ({ items: 0})); 
				console.log('Item deleted');
			} else {
				// TODO show error flag
				console.log('Error during deletion of items');
			}
		})
		.catch(err => {
			this.props.actionInProgrss(false);
			//TODO show error flag
			console.log('error during deletion of items');
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

	componentDidMount() {
		if (this.props.cart.length > 0) {
			let cart = this.props.cart[0];
			console.log(cart.count);
			/**
			 * 	"cart" : [{
					"_id" : ObjectId("5b89cc5703336b6a373f4deb"),
					"cartId" : ObjectId("5b876e2683bbc02e2513eb96"),
					"itemId" : ObjectId("5b7743396a9f06739fffaeb2"),
					"count" : 3,
					"userid" : ObjectId("5b75e29afbab5a51a9fe34ce"),
					"__v" : 0
				}]
			 */
			this.setState({items: +cart.count});
		}
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
		cartItems: state.cart.cartItems,
		inProgress: state.cart.actionsInprogress
	}
};

const mapDispatchToProps = dispatch => {
	return {
		addItems: (count, id) => dispatch({type: CART_ADD_ITEM, count,  id}),
		actionInProgrss: (inProgress) => dispatch({type: CART_ACTION_PROGRESS, inProgress})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Foodcard));