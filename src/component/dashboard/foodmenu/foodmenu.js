import React from 'react';
import FoodCard from '../foodcard/foodcard';
import  './foodmenu.css';
import Spinner from '../../spinner/spinner'

class FoodMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let headerStyle = {
            'color' : 'black',
        }

        return (
            <div>
                <h4>Title</h4>
                <Spinner />
                {/* <div className='res_foodmenu'>
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                </div> */}
            </div>
        )
    }

}

export default FoodMenu;