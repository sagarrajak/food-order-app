import React from 'react';
import Toolbar from './toolbar/toolbar';
import Sidenav from './sidenav/sidenav';
import Container from './../../hoc/container';
import { withRouter, Switch, Route } from 'react-router-dom';
import Modal from '../../component/dashboard/modal/modal';
import FoodMenu from '../dashboard/foodmenu/foodmenu';
import AboutItem from './aboutitem/aboutitem';
import Checkout from './Checkout/checkout';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: false,
            drop: false
        }
    }

    toggleSideNav = () => {
        this.setState(preState => ({nav: !preState.nav}));
        setTimeout(() => {
            this.setState(preState => ({drop: !preState.drop}));
        }, 510);
    }

    render() {
        return  (
            <Container>
                <Toolbar {...this.state} toggleSideNav={this.toggleSideNav}/>
                <Sidenav {...this.state} toggleSideNav={this.toggleSideNav}/>
                <Route path='/app/checkout' render={() => <Checkout /> }/>
                <Route path='/app/about/:id' render={() =><AboutItem />} />
                <Switch>
                    <Route path='/app/' render={() => <FoodMenu /> } />
                </Switch>
            </Container>
        );
    }
}
export default withRouter(Dashboard);