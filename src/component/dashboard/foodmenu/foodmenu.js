import React from 'react';
import FoodCard from '../foodcard/foodcard';
import  './foodmenu.css';
import Spinner from '../../spinner/spinner'
import axios from '../../../axios.config';
import { withRouter } from 'react-router-dom';
import * as Api from '../../../api';
import Container from '../../../hoc/container';
import WhiteSpinner from '../../spinner/whiteSpinner';
import { connect } from 'react-redux';
import Label from '../../label/label';

class FoodMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            loading: 'true',
        }
    }

    render() {
        let headerStyle = {
            'color' : 'black',
        }
        let foodItems = this.state.foods.map((obj) => {
            return < FoodCard  {...obj} key={obj._id} foodCart={obj.cart} />
        });

        let inProgressSpinner = ( <div className='res_backdrop'>
                                    <WhiteSpinner></WhiteSpinner>
                                </div> ); 
        return (
            <Container>
                { this.props.actionsInProgess ? inProgressSpinner: 
                 null}
                <div>
                    <h4>Title</h4>
                    { this.state.loading ? <Spinner /> : null }
                    <div className='res_foodmenu'>
                        { foodItems }
                    </div>
                </div>
                <Label type="warning" message="dksdjksdjsdjhsdjh"/>
            </Container>
        );
    }

    componentDidMount() {
        axios.get(Api.FoodItemsWithCart)
        .then((response) => {
            if (response.status === 200) {
                console.log(response);
                this.setState({foods: response.data})
            }
            this.setState({loading: false})
        })
        .catch((e) => {
            this.setState({ loading: false });
        }); 
    }

}

const mapStateToProps = state => {
    return  {
        actionsInProgess: state.cart.actionsInProgress,
        cartItems: state.cart.cartItems||[]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //todo 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FoodMenu));