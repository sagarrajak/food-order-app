import React from 'react';
import './whiteSpinner.css'


const Spinner = (props) => { 
 return ( 
    <div className='lds-container'><div className="lds-ring" ><div></div><div></div><div></div><div></div></div></div>
 );
}

export default Spinner;