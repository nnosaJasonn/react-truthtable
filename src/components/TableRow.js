import React from 'react';

const TableRow = ({td, color}) => 
{

    
    return (
        <tr style={{backgroundColor: color}}>
            {td}
        </tr>
    )
}

export default TableRow;