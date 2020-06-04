import React from 'react';
import Button from './Button'
import Names from './Names';
class Board extends React.Component 
{
    state = { proposition: [], names: [], errors: [], text: '' }
    connectives = ['&', 'V', '->', '<->']
    /**
     * @param event
     * @description onclick for button component to build the proposition 
     */
    handleClick = (event) => 
    {
        let obj;
        let arr = this.state.proposition;
        let text = this.state.text + event.target.value + ' ';
        if(event.target.value === '~')
        {
            obj = 
            {
                value: event.target.value,
                type: 'negation'
            };
        }
        else if(this.connectives.includes(event.target.value))
        {
            obj = 
            {
                value: event.target.value,
                type: 'connective'
            };
            
        }
        else if(event.target.value === '(')
        {
            obj = 
            {
                value: event.target.value,
                type: 'open'
            }
        }
        else if(event.target.value === ')')
        {
            obj = 
            {
                value: event.target.value,
                type: 'close'
            }
        }
        else 
        {
            obj = 
            {
                value: event.target.value,
                type: 'name'
            };
        }
        arr.push(obj);
        this.setState({proposition: arr, text});
        console.log(this.state.proposition);
        
    }

    /**
     * @param event
     * @description add name options on select change (currently four available)
     */
    onSelectChange = (event) => 
    {
        let char = '@'
        let names = [];
        for(let i = 0; i<event.target.value; i++)
        {
            char = String.fromCharCode(char.charCodeAt() + 1);
            names.push(char);
        }
        this.setState({names})
    }

    /**
     * @description delete elements from proposition as well as text
     */
    del = () => 
    {
        const text = this.state.text.trim();
        const proposition = this.state.proposition.length > 1 ? this.state.proposition.pop : []; 
        this.setState({proposition, text: text.substring(0, text.lastIndexOf(' '))})
        this.setState({errors: []})
    }

    /**
     * @description check for errors before evaluating expression
     */
    validate = () => 
    {
        const propArr = this.state.proposition;
        let err = [];
        console.log(propArr);
        var names = false;
        var flag = false;
        var conErr = false;
        var nameErr = false
        for(let i = 0; i<propArr.length; i++)
        {
           if(propArr[i].type === 'name')
           {
               names = true;
           }
            if(this.connectives.includes(propArr[i]) && flag === true && conErr === false)
            {
                err.push({
                    type: 'ambiguity',
                    msg:'Please add parentheses to prevent ambiguity'
                })
                conErr = true;
            }
            if(propArr[i].type === 'connective' && flag === false)
            {
                flag = true;
            }
            if(flag === true && (propArr[i].value === '(' || propArr[i].value === ')'))
            {
                flag = false
            }
            if(nameErr === false && i + 1 < propArr.length && propArr[i].type === 'name' && propArr[i + 1].type === 'name' )
            {
                err.push({
                    type: 'invalid',
                    msg: 'Names must be joined by a connective'});
                nameErr = true;
            }
        }
        if(!names)
        {
            err.push({
                type: 'no names',
                msg: 'Not a proposition'
            })
        }
        if(err.length > 0)
        {
            const errors = err.map(str => <li key={str.type}>{str.msg}</li>);
            this.setState({errors});
        }
        else
        {
            this.props.onTruth(this.state.proposition, this.state.names);
        }
    }

    render() 
    {
        return (
            <div className="ui two column centered grid">
                <div className="row centered">
                    <div className="column ">
                    <div className="ui input">
                        <input onChange={() => console.log('hi')} value={this.state.text} type="text"/>
                        <button onClick={this.del}>del</button>
                    </div>
                    <ul style={{margin: '0px', color:'red'}}>
                        {this.state.errors}
                    </ul>
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
                        <Button onClick={this.handleClick} disabled={true} value="⊨" name="⊨" />
                    </div>
                </div>
                <div className="row ">
                    <div className="column ">
                        <Button onClick={()=>this.setState({proposition: [], names: 0, errors: [], text:''})}  value="clear" name="Clear All" />
                        <Button onClick={this.validate} value="submit" name=" Truthify it !!" />
                    </div>
                </div>
                </div>
        )
    }
}

export default Board;