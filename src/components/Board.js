import React from 'react';
import Button from './Button'
import Names from './Names';
// var truthify = require('../js/truthify');
class Board extends React.Component {


    state = { proposition: '', names: 0 }
    handleClick = (event) => {
        if(event.target.value === 'submit')
        {
            if(this.checkForErrors(this.state.proposition))
            {

            }
            else
            {
                this.props.onTruth(this.state.proposition, this.state.names);
            }
            
        }
        else if(event.target.value === 'clear')
        {
            this.setState({proposition: '', names: 0})
            
        }
        else if(event.target.value === '~')
        {
            const jim = this.state.proposition

            this.setState({proposition: jim + event.target.value});
            
        }
        else 
        {
            const jim = this.state.proposition
            this.setState({proposition: jim + event.target.value + ' '});
        }
    }

    handleChange = (event) => {
        this.setState({proposition: event.target.value})
    }

    onSelectChange = (event) => {
        console.log(parseInt(event.target.value));
        
        this.setState({names: parseInt(event.target.value)})
    }

    del = () => {
        const jim = this.state.proposition.trim();
        this.setState({proposition: jim.substring(0, jim.lastIndexOf(' '))})
    }

    checkForErrors = (proposition) => {
        
    }

    render() {
        return (
            <div className="ui two column centered grid">
                <div className="row centered">
                    <div className="column ">
                    <div className="ui input">
                        <input onChange={this.handleChange} value={this.state.proposition} type="text"/>
                        <button onClick={this.del}>del</button>
                    </div>
                    </div>
                </div>
                <div className="row centered">
                    
                    <Names onClick={this.handleClick} onSelectChange={this.onSelectChange} names={this.state.names}/>

                </div>
                <div className="row centered">
                    <div className="column ">
                        <Button onClick={this.handleClick}  value="~" name="~" />
                        <Button onClick={this.handleClick}  value="&" name="&" />
                        <Button onClick={this.handleClick}  value="V" name="V" />
                        <Button onClick={this.handleClick}  value="->" name="->" />
                    </div>
                </div>
                 <div className="row centered">
                    <div className="column ">
                        <Button onClick={this.handleClick}  value="<->" name="<->" />
                        <Button onClick={this.handleClick} value="(" name="(" />
                        <Button onClick={this.handleClick}  value=")" name=")" />
                        <Button onClick={this.handleClick}  value="⊨" name="⊨" />
                    </div>
                </div>
                <div className="row ">
                    <div className="column ">
                        <Button onClick={this.handleClick}  value="clear" name="Clear All" />
                        <Button onClick={this.handleClick} value="submit" name=" Truthify it !!" />
                    </div>
                </div>
                </div>
        )
    }
}

export default Board;