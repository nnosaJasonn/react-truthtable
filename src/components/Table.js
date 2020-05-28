import React from 'react';

const Table = (props) => 
{

    console.log('props type ' + typeof(props.proposition))
    if(props.proposition === [])
    {
        return <div>Hi!</div>
    }

    return ( 
        <div>
            Proposition: {props.proposition} <br/>
            names: {props.names}
        </div>
        )

    
}

export default Table;