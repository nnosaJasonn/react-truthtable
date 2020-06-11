import React from 'react';

class Button extends React.Component 
{
    render() 
    {
        return (
            <button style={{whiteSpace:'nowrap'}}
            onClick={this.props.onClick} 
            disabled={this.props.disabled} 
            value={this.props.value} 
            className="ui button">
            {this.props.name}
            </button>
        )
    }
}

export default Button;