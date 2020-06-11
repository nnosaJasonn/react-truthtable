import React from 'react';
import Button from './Button'
import Names from './Names';
class Board extends React.Component 
{
    state = { proposition: '', names: [], errors: [] }
    handleClick = (event) => 
    {
        if(event.target.value === '~')
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

    handleChange = (event) => 
    {
        this.setState({proposition: event.target.value})
    }

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

    del = () => 
    {
        let proposition = this.state.proposition.trim();
        proposition = proposition.substring(0, proposition.length - 1);
        this.setState({proposition})
        this.setState({errors: []})
    }


    validate = () => 
    {
        const connectives = ['&', 'V', '->', '<->']
        const names = this.state.names;
        const propArr = this.state.proposition.split(' ');
        let err = [];
        console.log(propArr);
        let val = this.state.proposition.replace(/\W/g, '');
        val = val.replace('V', '');
        if(val.length === 0)
        {
            err.push({
                type: 'no names',
                msg: 'Not a proposition'
            })
        }
        var flag = false;
        var conErr = false;
        var nameErr = false
        for(let i = 0; i<propArr.length; i++)
        {
           
            if(connectives.includes(propArr[i]) && flag === true && conErr === false)
            {
                err.push({
                    type: 'ambiguity',
                    msg:'Please add parentheses to prevent ambiguity'
                })
                conErr = true;
            }
            if(connectives.includes(propArr[i]) && flag === false)
            {
                flag = true;
            }

            if(flag === true && (propArr[i] === '(' || propArr[i] === ')'))
            {
                flag = false
            }

            if(names.includes(propArr[i]) && names.includes(propArr[i+1]) && nameErr === false)
            {
                err.push({
                    type: 'invalid',
                    msg: 'Names must be joined by a connective'});
                nameErr = true;
            }
        }
        
        if(err.length > 0)
        {
            const errors = err.map(str => <li key={str.type}>{str.msg}</li>);
            this.setState({errors});
        }
        else
        {
            this.props.onTruth(this.state.proposition.split(' '), this.state.names);
        }
    }

    render() 
    {
        return (

            <div style={{height: '50%', width:'50%', margin:'0 auto', textAlign:'center'}} >

                    <div style={{display:'flex', margin:'13px'}}>

                        <div className="ui input">
                            <input onChange={this.handleChange} value={this.state.proposition} type="text"/>
                            <button onClick={this.del}>del</button>
                            
                        </div>
                        <ul style={{display:'flex', margin:'10px'}}>
                            {this.state.errors}
                        </ul>

                    </div>
                    
                    <div style={{display:'flex', margin:'13px'}}>

                        <Names onClick={this.handleClick} onSelectChange={this.onSelectChange} names={this.state.names}/>

                    </div>
                    <div style={{display:'flex', margin:'13px'}}>
                        
                            <Button onClick={this.handleClick}  value="~" name="~" />
                            <Button onClick={this.handleClick}  value="&" name="&" />
                            <Button onClick={this.handleClick}  value="V" name="V" />
                            <Button onClick={this.handleClick}  value="->" name="->" />

                    </div>
                    <div style={{display:'flex', margin:'13px'}}>

                            <Button onClick={this.handleClick}  value="<->" name="<->" />
                            <Button onClick={this.handleClick} value="(" name="(" />
                            <Button onClick={this.handleClick}  value=")" name=")" />
                            <Button onClick={this.handleClick} disabled={true} value="⊨" name="⊨" />

                    </div>
                    <div style={{display:'flex', margin:'13px'}}>

                            <Button onClick={()=>this.setState({proposition: '', names: 0})}  value="clear" name="Clear All" />
                            <Button onClick={this.validate} value="submit" name=" Truthify it !!" />

                    </div>

            </div>

        )
    }
}

export default Board;