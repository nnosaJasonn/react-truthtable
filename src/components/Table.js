import React from 'react';
import TableRow from './TableRow';
import processProposition from '../js/truthify';
const Table = ({proposition, names}) => 
{
    var truthValues;
    var head = [];
    var body = [];
    console.log('props type ' + typeof(proposition))
    if(proposition.length === 0)
    {
        return <div></div>
    }
    else
    {
        truthValues = processProposition(proposition, names);
        
        for(const prop in truthValues)
        {
            head.push(<th key={prop}>{prop}</th>);
        }
        for(let i = 0; i < truthValues[names[0]].length; i++)
        {
            var td = []
            for(const prop in truthValues)
            {      
                td.push(<td key={prop + i}>{truthValues[prop][i] === true ? 'T' : 'F'}</td>)
            }
            let color;
           if(td[td.length-1].props.children === 'T')
           {

               color = 'green';
           }
           else
           {
               color = 'red'
           }
            
            
            body.push(<TableRow color={color} key={i} td={td} /> )
        }

    }


    return ( 
        <div>
        <div>
            Proposition: {proposition} <br/>
            names: {names}
        </div>
        <table className="ui celled black table unstackable">
            <thead>
                <tr>
                    {head}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
        </div>
        )

    
}




/**
 * 
 * 
 */
export default Table;