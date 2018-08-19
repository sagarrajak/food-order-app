import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../modal/modal';
import './checkout.css';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout: [
                {
                    name: 'item1',
                    count: 10,
                    maxValue: 21
                },
                {
                    name: 'item2',
                    count: 5,
                    maxValue: 12
                },
                {
                    name: 'item3',
                    count: 10,
                    maxValue: 23
                },
                {
                    name: 'item4',
                    count: 15,
                    maxValue: 18
                },
                {
                    name: 'item5',
                    count: 16,
                    maxValue: 20
                }
            ],
            sum: 0,
            toggleClass: '',
            icon: 'fa-chevron-right',
            showItem: true
        }
    }

    componentDidMount() {
        this.setSum();
    }

    setSum() {
        this.setState({sum: this.state.checkout.reduce((accum, currv) => accum + currv.count, 0)})
    }

    increaseItem = (item) => {
       const itemIndex = this.state.checkout.findIndex(val => val.name === item.name);
       if(itemIndex >= 0) {
           let temArr = [...this.state.checkout];
           if(temArr[itemIndex].count+1 <= temArr[itemIndex].maxValue) {
                temArr[itemIndex].count++;
                this.setState({checkout: temArr});
                this.setSum();
           }
       }
    }

    decreaseItem = (item) => {
         const itemIndex = this.state.checkout.findIndex(val => val.name === item.name);
         if(itemIndex >= 0) {
           let temArr = [...this.state.checkout];
           if(temArr[itemIndex].count - 1 >= 0) {
                temArr[itemIndex].count--;
                this.setState({checkout: temArr});
                this.setSum();
           }
         }
    }

    deleteItem = (item) => {
        const itemIndex = this.state.checkout.findIndex(val => val.name === item.name);
         if(itemIndex >= 0) {
           let temArr = [...this.state.checkout];
           temArr.splice(itemIndex, 1);
           this.setState({checkout: temArr});
           this.setState({sum: temArr.reduce((accum, currv) => accum + currv.count, 0)});
         }
    }

    togglePanel = () => {
        if(this.state.toggleClass === '') {
            this.setState({
                            toggleClass: 'res-expanded',
                            icon: 'fa-chevron-down'
                        });
            setTimeout(() => {
                this.setState({showItem: false})
            }, 80);
        }
        else {
            this.setState({showItem: true});
            setTimeout(() => {
                this.setState({
                    toggleClass: '',
                    icon: 'fa-chevron-right',
                });
            }, 80);
        }
    }

    render() {
        
        return (
            <Modal navroute='/app'>
                <div className='res-checkout'>
                    <div className='res-table'>
                        <div className='res-header'>
                            <div className='res-header-title'>Checkout items</div>
                        </div>
                        <div className={'res-value '+this.state.toggleClass}>
                            <div className="res-value-container">
                                <div className='res-value-title'>Soem crap i want to put</div>
                                <div className='res-value-item'><i className={"fa "+this.state.icon}
                                                                   aria-hidden="true" onClick={this.togglePanel}></i></div>
                            </div>
                            <div className="res-value-item" hidden={this.state.showItem}>10 plate</div>
                            <div className="res-value-item" hidden={this.state.showItem}>500 ruppes</div>
                            <div className="res-button-container" hidden={this.state.showItem}>
                                <div><i className='fa fa-plus'></i></div>
                                <div><i className='fa fa-minus'></i></div>
                                <div><i className='fa fa-trash'></i></div>
                            </div>
                        </div>
                        <div className="res-checkout-footer">
                             <div className="res-footer-title">Checkout</div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(Checkout);