import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../modal/modal';

class AboutItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Modal navroute='/app'><h1>This is about item coponent</h1></Modal>
        );
    }
 }
 export default withRouter(AboutItem);