import React from 'react';
import Button from './Button';
const Names = (props) => 
{
    if(props.names.length > 0)
    {
        let buttons = [];
        for(let i = 0; i<props.names.length; i++)
        {
            buttons.push(
                <Button onClick={props.onClick} key={i} value={props.names[i]} name={props.names[i]} />
            )
        }
        return (
            <div className="column ">
            {buttons}
            <select onChange={props.onSelectChange} className="ui dropdown">
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            </div>
        )
    }


    return (
        <div className="column ">
        <select onChange={props.onSelectChange} className="ui dropdown">
            <option value="">Select a Number of Names</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        </div>
    )
}



export default Names;