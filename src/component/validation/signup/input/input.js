import React from 'react';
import './input.css';

class Input extends React.Component {

    render() {
       let htmlblock;
       switch (this.props.element) {
            case 'input':
                htmlblock = 
                    (<input  
                        type={this.props.type} 
                        id={this.props.id} 
                        className={"form-control "+this.props.validityClass} 
                        placeholder={this.props.placeholder}
                        onChange={this.props.onchange}
                    />);
                break;

            case 'textarea':
                htmlblock = 
                    (<textarea  
                        rows={this.props.rows||"10"}
                        cols={this.props.cols||"20"}
                        type={this.props.type} 
                        id={this.props.id} 
                        className={"form-control "+this.props.validityClass} 
                        placeholder={this.props.placeholder}
                        onChange={this.props.onchange}
                    />);        
                break;

            case 'select':
                htmlblock = (
                    <select name={this.props.name}
                            multiple={this.props.multiple}
                            onhange={this.props.onchange}
                            className="form-control">
                            {(this.props.options||[]).map((obj) => {
                                    return <option value={obj.value}>{obj.name}</option>  
                            })}
                    </select>
                );
                break;

            default:
                return null;

       }; 

       return (
            <div className="form-group">
                <label  htmlFor={this.props.id}>{this.props.label+':'}</label>
                {htmlblock}
                {
                  this.props.validityClass && 
                  this.props.validityClass !== 'res-valid' ? 
                    <p style={{'color' : 'red' }}>{this.props.validityMessage}</p>: null}
            </div>
        )
    }
};

export default Input;