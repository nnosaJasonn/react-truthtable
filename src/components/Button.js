import React from 'react';

class Button extends React.Component {
    onClick =(event)=>{
        console.log(event.target.value);
    }
    render() {
        return (
            <button onClick={this.props.onClick} value={this.props.value} className="ui button">{this.props.name}</button>
        )
    }
}

export default Button;